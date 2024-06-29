const { auth } = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
  audience: "sports news unique identifier",
  issuerBaseURL: "https://dev-yv1epui352cogjsx.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

module.exports = jwtCheck