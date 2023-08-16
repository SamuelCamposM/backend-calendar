import { Schema, model } from "mongoose";

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});
EventoSchema.method("toJSON", function () {
  const { __v, __id, ...rest } = this.toObject();
  rest.id = __id;
  return rest;
});

export const EventoModel = model("Evento", EventoSchema);
