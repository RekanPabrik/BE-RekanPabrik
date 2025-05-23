const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

// Setup env
process.env.NODE_ENV = "test";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Mock model
jest.mock("../models/melamarPekerjaan", () => ({
  updateStatus: jest.fn(),
}));

const melamarPekerjaanModel = require("../models/melamarPekerjaan");

// Token dummy
const token = jwt.sign({ id: 1, role: "perusahaan" }, JWT_SECRET, { expiresIn: "1h" });

describe("PATCH /melamarPekerjaan/updateStatus/:idlamaranpekerjaan", () => {
  it("should return 200 when status is updated", async () => {
    melamarPekerjaanModel.updateStatus.mockResolvedValueOnce();

    const res = await request(app)
      .patch("/melamarPekerjaan/updateStatus/5") // ganti sesuai route asli
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "diterima" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("status di ubah");
    expect(res.body.Status).toBe("diterima");
    expect(melamarPekerjaanModel.updateStatus).toHaveBeenCalledWith("diterima", "5");
  });

  it("should return 500 on error", async () => {
    melamarPekerjaanModel.updateStatus.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app)
      .patch("/melamarPekerjaan/updateStatus/5")
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "ditolak" });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Server error");
    expect(res.body).toHaveProperty("error", "DB error");
  });
});
