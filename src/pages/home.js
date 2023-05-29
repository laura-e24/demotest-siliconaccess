import HomeSkeleton from '@/components/HomeSkeleton';
import { Button, Stack, Typography, CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Grid } from '@mui/joy';
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
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (  
   <>
    <style>
      {`
        .img-size {
          width: 210px;
          height: 118px;
        }
        @media(max-width: 767px) {
          .img-size {
            width: 100%;
            height: 200px;
          }
        }
      `}
    </style>
    <main style={{ height: '100vh' }}>
      <Box 
        component="div"
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
        <Paper 
          sx={{ 
            overflowY: 'auto', 
            '@media(max-width: 767px)': {
              width: '100%'
            } 
          }} 
          elevation={3}
        >
          <CardMedia
            sx={{ height: 140 }}
            image="/banner.png"
            title="Delivery now banner"
          />
          <Box>
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
                    <Typography mt={4} align="center" gutterBottom variant="h5" component="div">
                      ¡Hola, {user?.first_name} {user?.last_name}!
                    </Typography>
                    <Typography align="center" mb={2} variant="body1" color="secondary">
                      Bienvenido a tu perfil
                    </Typography>
                    <Typography align="center" mb={2} variant="body1" color="secondary">
                      Estos son algunos de los restaurantes cerca tuyo
                    </Typography>
                    <Grid px={2} container wrap="wrap">
                      {data.map((item, index) => (
                        <Box 
                          key={index} 
                          sx={{  
                            marginRight: 0.5, 
                            my: 5,
                            '@media(max-width: 767px)': {
                              width: '100%',
                              height: 200,
                              my: 6
                            },
                            '&:hover': {
                              background: '#eeeee4',
                              cursor: 'pointer'
                            },
                            '&:last-child': {
                              marginRight: 0
                            },
                            width: 210
                          }}
                        >
                          <img
                            className='img-size'
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
                  <Box p={5}>
                    <Alert severity="error">
                      <AlertTitle>Error: No autorizado</AlertTitle>
                      Inicie sesión para visualizar esta página
                    </Alert>
                    <Button  
                      sx={{ marginX: 'auto', display: 'block', mt: 2 }} 
                      variant='outlined'
                      onClick={() => Router.push('/')}
                    >
                      Iniciar sesión
                    </Button>
                  </Box>
                )
              ) : <HomeSkeleton />}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </main>
   </>
  );
}
 
export default Home;