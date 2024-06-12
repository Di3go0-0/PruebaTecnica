import mongoos from "mongoose";
import { DB_MONGOURI } from "../config.js";

//conexion a la base de datos
export const connect = async () => {
  try {
    await mongoos.connect(DB_MONGOURI);
    console.log(">>>>>>>DB is connected<<<<<<<<<<");
  } catch (e) {
    console.log(e);
  }
};
