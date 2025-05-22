require("dotenv").config();
const PORT = process.env.PORT;
const app = require("../src/app");
const chalk = require('chalk');

app.listen(PORT, () => {
  console.log(chalk.green.bold("\n🚀 Server is running!\n"));
  console.log(
    chalk.cyan("📍 API Base URL: ") +
      chalk.whiteBright(`http://localhost:${PORT}`)
  );
  console.log(
    chalk.yellow("📘 Swagger Docs : ") +
      chalk.whiteBright(`http://localhost:${PORT}/api-docs\n`)
  );
});
