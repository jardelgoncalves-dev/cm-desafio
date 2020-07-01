/* eslint-disable */
process.env.NODE_ENV &&
  process.env.NODE_ENV !== 'prod' &&
    require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
/* eslint-enable */

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
