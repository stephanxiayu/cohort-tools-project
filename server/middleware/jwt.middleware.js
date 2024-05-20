require("dotenv").config();

console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET);
const jwt = require("jsonwebtoken");

// Instantiate the JWT token validation middleware
const isAuthenticated = (req, res, next) => {
  try {
    // Get the token string from the authorization header - "Bearer eyJh5kp9..."
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token. Returns payload if the token is valid, otherwise throws an error
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    // Add payload to the request object as req.payload for use in next middleware or route
    req.payload = payload;

    // Call next() to pass the request to the next middleware function or route
    next();
  } catch (error) {
    let errorMessage = "❌ Token not provided or not valid";
    if (error.message === "Token not provided") {
      errorMessage = "❌ Token not provided";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "❌ Token not valid";
    } else if (error.name === "TokenExpiredError") {
      errorMessage = "❌ Token expired";
    }
    res.status(401).json({ message: errorMessage });
  }
};

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
};
