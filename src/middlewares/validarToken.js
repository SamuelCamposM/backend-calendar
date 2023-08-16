import { response } from "express";
import jwt from "jsonwebtoken";
export const validarToken = (req, res, next = response) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay un token",
    });
  }
  try {
    const { uid,name } = jwt.verify(token, SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
    
  } catch (error) {
    return res.status(401).json({ ok: false, msg: "Token no valido" });
  }
  next();
};
