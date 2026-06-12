import { 
  Box, Button, ButtonGroup, Paper, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, Typography, Alert, Snackbar 
} from "@mui/material";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import React, { useEffect, useRef, useState } from "react";
import Draw from "ol/interaction/Draw.js";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON"; 
import Feature from "ol/Feature";

import Overlay from "ol/Overlay"; 

import { polygonRequests } from "../data/data"; 

function MyMap() {
  const mapElementRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const drawInteractionRef = useRef(null);
  const sourceRef = useRef(new VectorSource()); 
  
  const popupRef = useRef(null); 

  const [mode, setMode] = useState("navigate");
  const [location, setLocation] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [polygonName, setPolygonName] = useState("");
  const [periodId, setPeriodId] = useState("");
  
  const [hoverInfo, setHoverInfo] = useState(null); 
  
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (!mapElementRef.current || !popupRef.current) return;

    const vectorLayer = new VectorLayer({
      source: sourceRef.current,
    });

    const map = new Map({
      target: mapElementRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([35.2433, 38.9637]), 
        zoom: 6,
      }),
    });

    mapInstanceRef.current = map;

    const overlay = new Overlay({
      element: popupRef.current,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -10], 
    });
    map.addOverlay(overlay);

    map.on("pointermove", (evt) => {
      if (evt.dragging) {
        overlay.setPosition(undefined);
        return;
      }

      const pixel = map.getEventPixel(evt.originalEvent);
      let featureFound = false;

      map.forEachFeatureAtPixel(pixel, (feature) => {
        if (feature.get("polygonName")) {
          setHoverInfo({
            name: feature.get("polygonName"),
            periodId: feature.get("periodId"),
          });
          overlay.setPosition(evt.coordinate); 
          featureFound = true;
          return true; 
        }
      });

      if (featureFound) {
        map.getTargetElement().style.cursor = "pointer";
      } else {
        overlay.setPosition(undefined);
        map.getTargetElement().style.cursor = "";
      }
    });

    // --- VERİTABANINDAN VERİ ÇEKME ---
    const fetchPolygons = async () => {
      try {
        const response = await polygonRequests.getPolygons();
        const polygonsFromDb = response.data; 

        if (!polygonsFromDb || polygonsFromDb.length === 0) return;

        const format = new GeoJSON();
        const features = [];

        polygonsFromDb.forEach((poly) => {
          try {
            const locationData = poly.location || poly.Location;
            if (!locationData) return;

            const geometry = format.readGeometry(locationData, {
              dataProjection: "EPSG:4326",
              featureProjection: "EPSG:3857",
            });

            const feature = new Feature({
              geometry: geometry,
              polygonName: poly.polygonName || poly.PolygonName,
              periodId: poly.periodId || poly.PeriodId,
              dbId: poly.id || poly.Id 
            });

            features.push(feature);
          } catch (geomError) {
             console.error("Geometri hatası:", geomError);
          }
        });

        sourceRef.current.addFeatures(features);
      } catch (error) {
        console.error("Kayıtlar çekilirken hata:", error);
      }
    };

    fetchPolygons();

    return () => {
      map.setTarget(undefined);
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (drawInteractionRef.current) {
      map.removeInteraction(drawInteractionRef.current);
      drawInteractionRef.current = null;
    }

    if (mode === "draw") {
      const draw = new Draw({
        source: sourceRef.current,
        type: "Polygon",
      });

      draw.on("drawend", (event) => {
        const feature = event.feature;
        const geometry = feature.getGeometry();
        
        const transformedGeometry = geometry.clone().transform('EPSG:3857', 'EPSG:4326');
        const coordinates = transformedGeometry.getCoordinates()[0];
        
        setLocation(coordinates);
        setIsModalOpen(true); 
      });

      map.addInteraction(draw);
      drawInteractionRef.current = draw; 
    }
  }, [mode]);

  const handleSave = async () => {
    try {
      const payload = {
        polygonName: polygonName,
        periodId: Number(periodId),
        location: {
          type: "Polygon",
          coordinates: [location]
        }
      };
      
      await polygonRequests.addPolygon(payload);
      
      setToast({ open: true, message: "Poligon başarıyla kaydedildi!", severity: "success" });
      
      setIsModalOpen(false);
      setPolygonName("");
      setPeriodId("");
      setMode("navigate"); 
      
      const features = sourceRef.current.getFeatures();
      const newFeature = features[features.length - 1];
      newFeature.set("polygonName", payload.polygonName);
      newFeature.set("periodId", payload.periodId);
      newFeature.set("dbId", "temp"); 
      
    } catch (error) {
      console.error("Kayıt hatası:", error);
      setToast({ open: true, message: "Kayıt işlemi başarısız oldu.", severity: "error" });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPolygonName("");
    setPeriodId("");
    
    if (sourceRef.current) {
        const features = sourceRef.current.getFeatures();
        if (features.length > 0) {
            const lastFeature = features[features.length - 1];
            if (!lastFeature.get('dbId')) {
                sourceRef.current.removeFeature(lastFeature);
            }
        }
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", height: "600px",mt:3}}>
      
      <Box sx={{ width: "100%", height: "100%" }} ref={mapElementRef} />

      <Box ref={popupRef} sx={{ position: "absolute", zIndex: 1000, pointerEvents: "none" }}>
        {hoverInfo && (
          <Paper 
            elevation={6} 
            sx={{ 
              p: 1.5, 
              minWidth: "150px", 
              backgroundColor: "rgba(25, 118, 210, 0.95)", 
              color: "white",
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", borderBottom: "1px solid rgba(255,255,255,0.3)", mb: 0.5, pb: 0.5 }}>
              📍 {hoverInfo.name}
            </Typography>
            <Typography variant="body2">
              Periyot ID: <strong>{hoverInfo.periodId}</strong>
            </Typography>
          </Paper>
        )}
      </Box>

      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          top: 16,     
          right: 16,   
          zIndex: 1000,
          padding: 0.5,
          backgroundColor: "rgba(255, 255, 255, 0.9)", 
          borderRadius: 2,
        }}
      >
        <ButtonGroup variant="contained" disableElevation>
          <Button
            color={mode === "navigate" ? "primary" : "inherit"}
            onClick={() => setMode("navigate")}
            sx={{ color: mode === "navigate" ? "white" : "text.primary" }}
          >
            Gezin
          </Button>
          <Button
            color={mode === "draw" ? "secondary" : "inherit"}
            onClick={() => setMode("draw")}
            sx={{ color: mode === "draw" ? "white" : "text.primary" }}
          >
            Poligon Çiz
          </Button>
        </ButtonGroup>
      </Paper>

      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>Yeni Poligon Kaydı</DialogTitle>
        <DialogContent dividers>
          <TextField autoFocus margin="dense" label="Poligon İsmi" type="text" fullWidth variant="outlined" value={polygonName} onChange={(e) => setPolygonName(e.target.value)} sx={{ mb: 2 }} />
          <TextField margin="dense" label="Periyot ID" type="number" fullWidth variant="outlined" value={periodId} onChange={(e) => setPeriodId(e.target.value)} sx={{ mb: 2 }} />
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Periyot Bilgisi:</strong> Id 1: 2022, Id 2: 2023, Id 3: 2024, Id 4: 2025, Id 5: 2026, yıllarını işaret eder.
            </Typography>
          </Alert>
          <Typography variant="subtitle2" color="text.secondary">
            Yakalanan Koordinatlar (Köşe Sayısı: {location.length})
          </Typography>
          <Box sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: 1, mt: 1, maxHeight: "100px", overflowY: "auto" }}>
            <Typography variant="caption" component="pre" sx={{ margin: 0 }}>
              {JSON.stringify(location, null, 2)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="inherit">İptal</Button>
          <Button onClick={handleSave} variant="contained" color="primary" disabled={!polygonName || !periodId}>Kaydet</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={toast.severity} sx={{ width: '100%' }}>{toast.message}</Alert>
      </Snackbar>
      
    </Box>
  );
}

export default MyMap;