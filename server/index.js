require("dotenv").config();

const { PORT = 5000 } = process.env;
const app = require("./app");
const { conn } = require("./db");
const seed = require("./db/seed");

const init = async () => {
  try {
    process.env.SEED === "true" ? await seed() : await conn.sync();
    app.listen(PORT, () => {
      console.log();
      console.log(`  App running in port ${PORT}`);
      console.log();
      console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
    });
  } catch (error) {
    console.error(error);
  }
};

init();
