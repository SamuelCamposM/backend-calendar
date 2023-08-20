// RUTAS DE  USUARIOS
// HOST + "/events"
import express from "express";
import {
  crearEvento,
  editarEvento,
  eliminarEvento,
  getEventos,
} from "../controllers";
import { validarToken } from "../middlewares/validarToken";
import { check } from "express-validator";
import { validarCampos } from "../middlewares";
import { isDateF } from "../helpers/isDateF";
export const eventRouter = express.Router();

eventRouter.use(validarToken)
eventRouter.get(
  "/",

  getEventos
);
eventRouter.post(
  "/",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDateF),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDateF),
    validarCampos,
  ],
  crearEvento
);
eventRouter.put("/:id", editarEvento);
eventRouter.delete("/:id", eliminarEvento);
