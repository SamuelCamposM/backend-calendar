import jwt from "jsonwebtoken";
export const generarJwt = (uid, name) => {
  return new Promise((res, rej) => {
    console.log({ uid, name });
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log({ err });
          rej("No se pudo generar el token");
        }
        res(token);
      }
    );
  });
};
