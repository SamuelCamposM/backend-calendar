import jwt from "jsonwebtoken";
export const generarJwt = (uid, name) => {
  return new Promise((res, rej) => { 
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log({ error });
          rej("No se pudo generar el token");
        }
        res(token);
      }
    );
  });
};
