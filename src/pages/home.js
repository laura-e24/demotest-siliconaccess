import HomeSkeleton from '@/components/HomeSkeleton';
import { Button, Container, Divider, Stack, Typography, CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Router from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import { AspectRatio, CardOverflow, Grid, IconButton } from '@mui/joy';
import Favorite from '@mui/icons-material/Favorite';
import {  Card } from "@mui/material";
import GradeIcon from '@mui/icons-material/Grade';
import Fab from '@mui/material/Fab';
import LogoutIcon from '@mui/icons-material/Logout';

const data = [
  {
    src: '/pizzeria.jpg',
    name: 'Pizzería El Trébol',
    distance: '2km',
    raiting: 5,
    delivery: 'Entrega en 30 - 60 minutos'
  },
  {
    src: '/heladeria.jpg',
    name: 'Heladería Invernalia',
    distance: '1km',
    raiting: 4,
    delivery: 'Entrega en 10 - 60 minutos'
  },
  {
    src: 'parrilla.jpg',
    name: 'Parrilla La Estación',
    distance: '3.5km',
    raiting: 3,
    delivery: 'Entrega en 45 - 90 minutos'
  },
];

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = JSON.parse(localStorage.getItem('auth'))
      setUser(auth)
    }
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  return (  
    <main style={{ height: '100vh' }}>
      <Box component="div"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          height: '100%',
          '@media(min-width: 768px)': {
            justifyContent: 'center',
            alignContent: 'center',
          }
        }}
      >
        <Paper elevation={3}>
          <CardMedia
            sx={{ height: 140 }}
            image="/banner.png"
            title="Delivery now banner"
          />
          <Box mt={10}>
            <Stack flexWrap="wrap" display="flex" height="100%" alignContent="center" justifyContent="center" sx={{ width: '100%'}}>
              {!isLoading ? (
                user ? (
                  <>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, marginLeft: 2, marginTop: 2 }}>
                    <Fab 
                      onClick={() => {
                        if (typeof window !== 'undefined') localStorage.removeItem('auth');
                        Router.push('/')
                      }} 
                      color="brand" aria-label="add"
                      sx={{ background: 'linear-gradient(to right bottom, #d5273e, #e0283c, #ea2a39, #f52d35, #ff3131)' }}
                    >
                      <LogoutIcon />
                    </Fab>
                  </Box>
                    <Typography align="center" gutterBottom variant="h5" component="div">
                      ¡Hola, {user?.first_name} {user?.last_name}!
                    </Typography>
                    <Typography align="center" mb={2} variant="body1" color="secondary">
                      Bienvenido a tu perfil
                    </Typography>
                    <Typography align="center" mb={2} variant="body1" color="secondary">
                      Estos son algunos de los restaurantes cerca tuyo
                    </Typography>
                    <Grid sx={{ 
                      gridColumn: 3
                     }} px={2} container wrap="wrap">
                      {data.map((item, index) => (
                        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5,
                          '&:hover': {
                            background: '#eeeee4',
                            cursor: 'pointer'
                          }}}
                        >
                          <img
                            style={{ width: 210, height: 118 }}
                            alt={item.name}
                            src={item.src}
                          />
                          <Box sx={{ px: 1 }}>
                            <Typography gutterBottom variant="body2">
                              {item.name}
                            </Typography>
                            <Box display="block" variant="caption">
                              {Array.from(new Array(item.raiting)).map((_, index) => {
                                return (
                                  <GradeIcon sx={{fontSize: '1rem'}} color="brand" key={index} />
                                )
                              })}
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {`${item.distance} • ${item.delivery}`}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Alert severity="error">
                      <AlertTitle>Error: No autorizado</AlertTitle>
                      Inicie sesión para visualizar esta página
                    </Alert>
                    <Box marginX="auto" alignContent="end">
                      <Button  
                        sx={{ marginTop: 2 }} 
                        variant='outlined'
                        onClick={() => Router.push('/')}
                      >
                        Iniciar sesión
                      </Button>
                    </Box>
                  </>
                )
              ) : <HomeSkeleton />}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </main>
  );
}
 
export default Home;