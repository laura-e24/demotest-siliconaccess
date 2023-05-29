import { Box, CardContent, CardMedia, Container, TextField, Typography, InputLabel, Button, Stack, Paper } from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from 'yup';
import Alert from '@mui/material/Alert';
import Router from "next/router";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword)

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
        <Paper className="card" sx={{ margin: "auto", height: '100%', overflowY: 'auto' }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/banner.png"
            title="Delivery now banner"
          />
          <CardContent>
            <Typography align="center" gutterBottom variant="h5" component="div">
              Iniciar sesión
            </Typography>
            <Typography align="center" mb={2} variant="body2" color="text.secondary">
              Ingresá tus datos para acceder a Delivery now! y pedir tu comida
            </Typography>
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={async (values, actions) => {
                try {
                  setError(false)
                  setIsLoading(true)
                  const { data } = await axios.post('http://demotest.silicon-access.com/fapi/auth/login/', values)
                  setIsLoading(false) 
                  console.log(data)
                  const user = {
                    first_name: data.user.first_name,
                    last_name: data.user.last_name
                  }

                  if (typeof window !== 'undefined') {
                    localStorage.setItem('auth', JSON.stringify(user))
                  }
                  Router.push('/home')
                } catch (err) {
                  const { response: { data } } = err
                  setIsLoading(false)
                  console.log(data)
                  setError(data)
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
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    {!!values.password && (
                      <Box style={{marginTop: 0}} sx={{ justifyContent: 'end', display: 'flex' }}>
                        <Button onClick={handleShowPassword} size="small" variant="text" color="brand">
                          {showPassword ? "Ocultar" : "Mostrar"} contraseña
                        </Button>
                      </Box>
                    )}
                    <Button 
                      color="brand" 
                      type="submit" 
                      fullWidth 
                      size="sm" 
                      variant="contained"
                    >
                      Ingresar
                    </Button> 
                  </Stack>
                </Box>
              </Form>
            )}
            </Formik>
            {!isLoading && error && (
              <Box className="box" margin="auto">
                <Alert sx={{ marginTop: 4 }} severity="error">
                  <strong>ERROR:</strong> {error.non_field_errors[0]}
                </Alert>
              </Box>
            )}
            {isLoading && (
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
          </CardContent>
        </Paper>
      </Container>
    </>
  )
}

export default FormLogin;