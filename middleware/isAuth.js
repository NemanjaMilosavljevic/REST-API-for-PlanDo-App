const auth = require("../util/auth");

module.exports = (req, res, next) => {
  const userToken = req.get("Authorization").split(" ")[1];
  const userPayload = auth.decodeToken(userToken)?.data;

  auth.validateToken(userToken);

  if (!userToken) {
    throw new Error("Unauthorized user!");
  }
  if (req.path.includes("/admin") && userPayload.role !== "admin") {
    throw new Error("Unauthorized user!");
  }

  res.locals.userId = userPayload.id;
  res.locals.userEmail = userPayload.email;
  res.locals.role = userPayload.role;

  next();
};
