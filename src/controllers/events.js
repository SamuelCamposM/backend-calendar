import { EventoModel } from "../models/Event";

export const getEventos = async (req, res) => {
  const eventos = await EventoModel.find().populate("user", ["name"]);
  res.json({
    ok: true,
    eventos,
  });
};
export const crearEvento = async (req, res) => {
  const evento = new EventoModel(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    const eventoPoblado = await eventoGuardado.populate("user", ["name"]);
    res.json({
      ok: true,
      evento: eventoPoblado,
    });
  } catch (error) {  
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
export const editarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await EventoModel.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
      });
    }
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };
    const eventoActualizado = await EventoModel.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    const eventoPoblado = await eventoActualizado.populate("user", ["name"]);
    res.json({
      ok: true,
      evento: eventoPoblado,
    });
  } catch (error) { 
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
export const eliminarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await EventoModel.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por id",
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
      });
    }

    await EventoModel.findByIdAndDelete(eventoId);
    res.json({
      ok: false,
    });
  } catch (error) { 
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
