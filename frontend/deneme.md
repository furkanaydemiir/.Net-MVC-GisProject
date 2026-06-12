import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import React, { useEffect, useRef, useState } from "react";
import Draw from "ol/interaction/Draw";

function App() {
  const targetMap = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);
  
  
  useEffect(() => {
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source:vectorSource
    })
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
          vectorLayer
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      target: targetMap.current,
    });
    mapRef.current = map;

    const drawInteraction = new Draw({
      source:vectorSource,
      type:"Polygon",
      stopClick:{savePolygon}
    })
    drawRef.current = drawInteraction
    drawInteraction.on("drawend",(event)=>{
      console.log("Çizim başarılı poligon nesnesi: ",event.feature);
      map.removeInteraction(drawInteraction);
    })
    return () => {
      map.setTarget(null);
    };
  }, []);
  const handleStartDrawing = () =>{
    if(mapRef.current && drawRef.current){
      mapRef.current.addInteraction(drawRef.current);
    }
  }
  return (

    <div style={{ width: "100%", height: "100dvh", position: "relative" }}>

  <div ref={targetMap} style={{ width: "100%", height: "100%" }}></div>

  <div style={{ position: "absolute", top: "15px", left: "50%", transform: "translateX(-50%)", zIndex: 10,}}>
     <div style={{display:"flex",justifyContent:"space-between"}}>
      <button className="btn">Haraket Ettir</button>
      <button onClick={handleStartDrawing} className="btn">Alan İşaretle</button>
     </div>
  </div>

</div>
  );
}

export default App;
