import { response } from "express";
import { UsuarioModel } from "../models/";
import bcryptjs from "bcryptjs";
import { generarJwt } from "../helpers";

export const createUser = async (req, res = response) => {
 
  const { email } = req.body;
  try {
    let usuario = await UsuarioModel.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }

    usuario = new UsuarioModel(req.body);

    // ENCRIPTAR password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(usuario.password, salt);
    await usuario.save();

    //TODO: GENERAR JWT
    const token = await generarJwt(usuario.id, usuario.name);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

export const loginUser = async (req, res = response) => { 
  const { email, password } = req.body;
  try {
    const usuario = await UsuarioModel.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese correo",
      });
    }
    // MATCH PASSWORD

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }
    //TODO: GENERAR JWT
    const token = await generarJwt(usuario.id, usuario.name);
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

export const renewToken = async (req, res = response) => {
  const { uid, name } = req; 
  //TODO: GENERAR JWT
  const token = await generarJwt(uid, name);
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};
