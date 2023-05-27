import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Card, CardContent, CardMedia, Container, TextField, Typography, InputLabel, Button, Stack, useMediaQuery, Paper } from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup
    .string()
    .email('Ingrese un email válido')
    .required('Usuario es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener un mínimo de 6 caracteres')
    .matches(/^[A-Z\d]+$/gi, 'La contraseña debe ser alfanumérica')
    .required('Contraseña es requerida'),
});


const FormLogin = () => {

  return (
    <>
      <style>
        {`
          @media(min-width: 1024px) {
            .card {
              max-width: 50%;
            }
            .box {
              width: 75%;
            }
          }
          @media(max-width: 1024px) {
            .container {
              padding: 0;
            }
          }
        `}
      </style>
      <Container className="container" sx={{ height: '100vh'}}>
        <Paper className="card" sx={{ margin: "auto", height: '100%' }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography align="center" gutterBottom variant="h5" component="div">
              Iniciar sesión
            </Typography>
            <Typography align="center" mb={2} variant="body2" color="text.secondary">
              Por favor, ingrese sus credenciales para acceder al sitio
            </Typography>
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={async (values, actions) => {
                try {
                  const { data } = await axios.post('http://demotest.silicon-access.com/fapi/auth/login/', values)
                  console.log(data)
                  const userSession = {
                    token: data.token,
                    user: {
                      first_name: data.user.first_name,
                      last_name: data.user.last_name
                    }
                  }

                  if (typeof window !== 'undefined') {
                    localStorage.setItem('auth', JSON.stringify(userSession))
                  }
                } catch (err) {
                  const { response: { data } } = err
                  console.log(data)
                }
              }}
              validationSchema={validationSchema}
            >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box className="box" margin="auto">
                  <Stack spacing={2}>
                    <InputLabel size="small" required>
                      Usuario
                    </InputLabel>
                    <TextField
                      placeholder="usuario@correo.com"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                    <InputLabel size="small" required>
                      Contraseña
                    </InputLabel>
                    <TextField
                      placeholder="abcde12345"
                      type="password"
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <Button type="submit" fullWidth size="sm" variant="contained">Ingresar</Button> 
                  </Stack>
                </Box>
              </Form>
            )}
            </Formik>
          </CardContent>
        </Paper>
      </Container>
    </>
  )
}

export default FormLogin;