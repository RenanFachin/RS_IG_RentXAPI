import dotenv from 'dotenv'
dotenv.config()

export default {
  secret_token: process.env.JSON_WEB_TOKEN_SECRET,
  secret_refresh_token: process.env.JSON_WEB_REFRESH_TOKEN_SECRET,
  expires_in_token: process.env.JSON_WEB_TOKEN_EXPIRES_IN,
  expires_in_refresh_token: process.env.JSON_WEB_REFRESH_TOKEN_EXPIRES_IN,
  expires_refresh_token_days: process.env.JSON_WEB_EXPIRES_REFRESH_TOKEN_DAYS,
}
