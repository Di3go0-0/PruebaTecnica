import express from "express";
import supertest from "supertest";
import cookieParser from "cookie-parser";


function testServer(route) {
  const app = express();
  app.use(express.json()); //para que el servidor entienda los json que llegan al servidor
  app.use(cookieParser()); //para que el servidor entienda las cookies que llegan al servidor
  route(app);
  return supertest(app);
}

export default testServer;
