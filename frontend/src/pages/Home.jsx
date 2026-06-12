import { Box, Typography } from '@mui/material'
import React from 'react'
import MyMap from '../components/MyMap';

function Home() {
  const token = localStorage.getItem("token");
  return (
    <Box sx={{width:"100%",height:"100dvh"}}>
      {
        token ? <MyMap/> : <Typography component="div" style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}} variant='h3' component={"h1"}>Lütfen giriş yapınız</Typography>
      }        
    </Box>
  )
}

export default Home