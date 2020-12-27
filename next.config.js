require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false,
  },
  env: {
    MONGODB_UREYE: process.env.MONGODB_UREYE,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    DB_NAME: process.env.DB_NAME,
    WEB_URI: process.env.WEB_URI,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    SESSION_SECRET: process.env.SESSION_SECRET,
  },
};
