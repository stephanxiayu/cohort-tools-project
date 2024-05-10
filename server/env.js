// Load environment variables
require("dotenv").config();

// Import envalid to validate environment variables
const envalid = require("envalid");
const { str, port } = envalid;

// Validate and clean environment variables
const env = envalid.cleanEnv(process.env, {
  PORT: port(),
  MONGO_CONNECTION_STRING: str(),
  WEBSITE_URL: str(),
  SERVER_URL: str(),
});
