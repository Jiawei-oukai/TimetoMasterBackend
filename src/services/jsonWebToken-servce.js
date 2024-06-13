import jwt from "jsonwebtoken";

export const signjwt = async (obj, key) => {
  const token = jwt.sign(obj, key);
  return token;
};

export const verifyjwt = async (request, response, next) => {
  const token = request.header('x-auth-token');
  if (!token)
    return response.status(401).send("Access denied. No token provided");

  try {
    const decodedToken = jwt.verify(token, "jwtPrivateKey");
    request.user = decodedToken;
    next();
  } catch (error) {
    response.status(400).send("Invalid Token");
  }
};
