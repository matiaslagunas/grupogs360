const express = require('express');
const path = require('path');
const app = express();
const port = 3333;

// Importar rutas
const indexRoute = require('./routes/indexRoute');
const contactoRoute = require('./routes/contactoRoute');
const nosotrosRoute = require('./routes/nosotrosRoute');
const serviciosRoute = require('./routes/serviciosRoute');
const productosRoute = require('./routes/productosRoute');

// Configura EJS como motor de plantillas
app.set('view engine', 'ejs');  // Establece EJS como motor de vista
app.set('views', path.join(__dirname, 'views'));  // Establece el directorio de vistas

// Sirve archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Sirve Bootstrap CSS y JS desde node_modules
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
// Middleware para establecer activePage
app.use((req, res, next) => {
  const path = req.path;
  if (path.startsWith('/nosotros')) res.locals.activePage = 'nosotros';
  else if (path.startsWith('/servicios')) res.locals.activePage = 'servicios';
  else if (path.startsWith('/productos')) res.locals.activePage = 'productos';
  else if (path.startsWith('/Contacto')) res.locals.activePage = 'contacto';
  else res.locals.activePage = 'inicio';
  next();
});
// Rutas
app.use('/', indexRoute);
app.use('/Contacto', contactoRoute);
app.use('/nosotros', nosotrosRoute);
app.use('/servicios', serviciosRoute);
app.use('/productos', productosRoute);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
