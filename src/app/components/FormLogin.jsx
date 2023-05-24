import { Box, Card, CardContent, CardMedia, Container, TextField, Typography, CardActions, Button } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string('Ingrese su email')
    .email('Ingrese un email válido')
    .required('Email es requerido'),
  password: yup
    .string('Ingrese su contraseña')
    .min(6, 'La contraseña debe tener un mínimo de 6 caracteres')
    .required('Contraseña es requerida'),
});

const FormLogin = () => {
  return (
    <Container maxWidth="lg">
    <Card sx={{ maxWidth: '50%' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Iniciar sesión
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Por favor, ingrese sus credenciales para acceder al sitio
        </Typography>
        <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Box component="span" sx={{ display: 'block' }}> 
              <TextField
                id="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box component="span" sx={{ display: 'block' }}> 
              <TextField
                type="password"
                id="password"
                name="password"
                label="Contraseña"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
          </Form>
        )}
      </Formik>
      </CardContent>
      <CardActions>
        <Button size="small">Ingresar</Button>
      </CardActions>
    </Card>
    </Container>
  )
}

export default FormLogin;