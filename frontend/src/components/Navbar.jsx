import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function DenseAppBar() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const handleExit = () => {
    localStorage.removeItem("token");
    toast.success("Çıkış işlemi başarılı");
    window.location.reload();
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.username);
      } catch (error) {
        console.error("Token decode edilemedi:", error);
        localStorage.removeItem("token");
      }
    } else {
      setUser("");
    }
  }, [token]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" variant="outlined">
        <Toolbar variant="dense">
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "inherit",
              }}
            >
              GIS PROJE
            </Typography>
            <Button
              variant="contained"
              sx={{ ml: 3 }}
              component={Link}
              to={"/"}
            >
              Ana Sayfa
            </Button>
            {token && (
              <Typography
                variant="h6"
                component={"h4"}
                sx={{ color: "inherit", ml: 3 }}
              >
                Hoşgeldin {user.toUpperCase()}
              </Typography>
            )}
          </Box>
          <IconButton to={"/login"} component={Link}>
            {!token && (
              <Button variant="contained" sx={{ backgroundColor: "inherit" }}>
                Giriş yap
              </Button>
            )}
          </IconButton>
          {token && (
            <IconButton sx={{ mr: 2 }}>
              <Button
                onClick={handleExit}
                variant="contained"
                sx={{ backgroundColor: "inherit" }}
              >
                Çıkış Yap
              </Button>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
