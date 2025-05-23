const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

// Pastikan NODE_ENV 'test' agar middleware bisa di-bypass (jika kamu mengatur begitu)
process.env.NODE_ENV = "test";

// Ambil secret dari environment (atau fallback 'secret')
const JWT_SECRET = process.env.JWT_SECRET || "secret";

jest.mock("../models/melamarPekerjaan", () => ({
  reqMelamarPekerjaan: jest.fn(),
}));

const melamarPekerjaanModel = require("../models/melamarPekerjaan");

// buat token dummy
const token = jwt.sign({ id: 1, role: "pelamar" }, JWT_SECRET, {
  expiresIn: "1h",
});

describe("POST /melamarPekerjaan/melamar - melamar pekerjaan", () => {
  it("should return 200 if application is successful", async () => {
    melamarPekerjaanModel.reqMelamarPekerjaan.mockResolvedValueOnce();

    const res = await request(app)
      .post("/melamarPekerjaan/melamar")
      .set("Authorization", `Bearer ${token}`)
      .send({
        idmelamarPekerjaan: 1,
        idPelamar: 2,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Lamaran terkirim");
    expect(melamarPekerjaanModel.reqMelamarPekerjaan).toHaveBeenCalled();
  });

  it("should return 500 if model throws error", async () => {
    melamarPekerjaanModel.reqMelamarPekerjaan.mockRejectedValueOnce(
      new Error("DB error")
    );

    const res = await request(app)
      .post("/melamarPekerjaan/melamar")
      .set("Authorization", `Bearer ${token}`)
      .send({
        idmelamarPekerjaan: 1,
        idPelamar: 2,
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Server error");
    expect(res.body).toHaveProperty("error", "DB error");
  });
});
