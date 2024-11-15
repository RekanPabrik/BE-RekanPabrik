require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const pelamarRoute = require("./routes/pelamarRoute");
const adminRoute = require("./routes/adminRoutes");
const perusahaanRoute = require("./routes/perusahaanRoute");
const postingPekerjaanRoute = require("./routes/postPekerjaanRoute");
const melamarRoute = require("./routes/melamarPekerjaanRoute");
const savedJobsRoute = require("./routes/savedJobsRoute");
const verifyJWT = require("./middleware/verififyJWT");
// const { specs, swaggerUi } = require('./config/swagger');
const swagger = require('./config/swagger');
const path = require('path');

app.use(cors());

// Laravel Config
app.use(
  cors({
    origin: "http://localhost:8000", // Laravel berjalan di port 8000
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// swagger
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs));


app.use(express.json());
app.use("/auth", authRoute);
app.use("/pelamar", verifyJWT, pelamarRoute);
app.use("/admin", verifyJWT, adminRoute);
app.use("/perusahaan", verifyJWT, perusahaanRoute);
app.use("/postPekerjaan", verifyJWT, postingPekerjaanRoute);
app.use("/melamarPekerjaan", verifyJWT, melamarRoute);
app.use("/saveJobs", verifyJWT, savedJobsRoute);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  console.log(`Dokumentasi Swagger tersedia di http://localhost:${PORT}/api-docs`);
});
