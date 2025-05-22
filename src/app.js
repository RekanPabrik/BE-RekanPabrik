require("dotenv").config();
const PORT = process.env.PORT;
const app  = require('../src/index')

app.listen(PORT, () => {
  console.log(`
    ## MAIN ROUTE
    -listening at http://localhost:${PORT}
    
    ## SWEGGER ROUTE
    -Dokumentasi Swagger tersedia di http://localhost:${PORT}/api-docs
    `);
});