import dotenv from "dotenv";

dotenv.config({
  path: "./.env.development",
});

export default {
  // DataBase
  dbUsername: process.env.MONGODB_USERNAME,
  dbPassword: process.env.MONGODB_PASSWORD,
  dbName: process.env.MONGODB_DBNAME,
  // GitHub Login
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  // Cookies
  cookiesSecret: process.env.COOKIES_SECRET,
  // Session
  sessionSecret: process.env.SESSION_SECRET,
  // Admin
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  // Port
  port: process.env.PORT,
};
