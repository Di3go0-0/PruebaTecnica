import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

app.use(morgan("dev")); //para ver las peticiones que llegan al servidor
app.use(express.json()); //para que el servidor entienda los json que llegan al servidor
app.use(cookieParser()); //para que el servidor entienda las cookies que llegan al servidor




app.use((req, res, next) => {
    res.status(404).json({ message: "Endpoint not found" });
  }); // para que cuando no encuentre la ruta, devuelva un mensaje de error
  
export default app;