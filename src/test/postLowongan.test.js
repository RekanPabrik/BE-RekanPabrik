const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

// Pastikan NODE_ENV 'test' agar middleware bisa di-bypass (jika kamu mengatur begitu)
process.env.NODE_ENV = "test";

// Ambil secret dari environment (atau fallback 'secret')
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// mock model
jest.mock("../models/postingPekerjaan", () => ({
  addPostPekerjaan: jest.fn(),
}));

const postPekerjaanModel = require("../models/postingPekerjaan");

// buat token dummy
const token = jwt.sign(
  { id: 1, role: "perusahaan" },
  JWT_SECRET,
  { expiresIn: "1h" }
);

describe("Memposting pekerjaan oleh HRD/Pemilik Pabrik", () => {
  it("should return 200 when job posting is created", async () => {
    postPekerjaanModel.addPostPekerjaan.mockResolvedValueOnce();

    const response = await request(app)
      .post("/postPekerjaan/newPostPekerjaan")
      .set("Authorization", `Bearer ${token}`)
      .send({
        idPerusahaan: 1,
        posisi: "Frontend Developer",
        lokasi: "Bandung",
        jobDetails: "Membuat UI aplikasi mobile.",
        requirements: "Menguasai Flutter.",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Postingan pekerjaan berhasil dibuat.");
    expect(response.body).toHaveProperty("data");
    expect(postPekerjaanModel.addPostPekerjaan).toHaveBeenCalled();
  });

  it("should return 400 when required fields are missing", async () => {
    const response = await request(app)
      .post("/postPekerjaan/newPostPekerjaan")
      .set("Authorization", `Bearer ${token}`)
      .send({
        idPerusahaan: 1,
        posisi: "",
        lokasi: "",
        jobDetails: "",
        requirements: "",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should return 500 on internal server error", async () => {
    postPekerjaanModel.addPostPekerjaan.mockRejectedValueOnce(new Error("DB error"));

    const response = await request(app)
      .post("/postPekerjaan/newPostPekerjaan")
      .set("Authorization", `Bearer ${token}`)
      .send({
        idPerusahaan: 1,
        posisi: "Backend Developer",
        lokasi: "Jakarta",
        jobDetails: "Membuat REST API.",
        requirements: "Menguasai Node.js",
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("serverMessage", "DB error");
  });
});
