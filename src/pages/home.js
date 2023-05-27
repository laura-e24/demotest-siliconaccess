import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Router from 'next/router';
import { useEffect, useState } from 'react';

const Home = () => {


  useEffect(() => {
    let auth
    if (typeof window !== 'undefined') {
      auth = JSON.parse(localStorage.getItem('auth'))
    }
    if (!auth) Router.push('/')
  }, [])

  return (  
    <main style={{ height: '100vh' }}>
      <Box component="div"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          height: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          '& > :not(style)': {
            m: 1,
            width: 500,
            height: 500,
          },
        }}
      >
        <Paper elevation={3}>
          <Box flexWrap="wrap" display="flex" height="100%" alignContent="center" justifyContent="center">
            <Stack flexWrap="wrap" display="flex" height="100%" alignContent="center" justifyContent="center" sx={{ width: '100%'}}>
              <Typography align="center" gutterBottom variant="h5" component="div">
                ¡Hola, "{"nombre"}"!
              </Typography>
              <Typography align="center" mb={2} variant="body1" color="secondary">
                Bienvenido a tu perfil
              </Typography>
              <Box marginX="auto" alignContent="end">
                <Button onClick={() => {
                 if (typeof window !== 'undefined') localStorage.removeItem('auth');
                }} sx={{ marginTop: 2 }} variant='outlined'>
                  Cerrar sesión
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </main>
  );
}
 
export default Home;