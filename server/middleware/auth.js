// auth middleware denies/confirms a user to perform actions like edit/delete tickets
// only if they are allowed, by caling next() after our checks

import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    // check if the user token is valid
    const token = request.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500 ? true : false;

    var decodedData;
    // it isn't google auth
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET);
      request.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);
      request.userId = decodedData.sub; // sub is Google's id
    }

    next();
  } catch (error) {}
};

export default auth;
