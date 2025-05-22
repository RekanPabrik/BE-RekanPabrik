const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../index");

jest.mock("../models/savedJobs", () => ({
  simpanPekerjaan: jest.fn()
}));

const savedJobsModel = require("../models/savedJobs");

describe("melakukan simpan pekerjaan oleh user", () => {
  // buat token palsu
  const token = jwt.sign(
    { id: 1, role: "pelamar" }, // payload
    process.env.JWT_SECRET || "secret", // secret
    { expiresIn: "1h" }
  );

  it("should return 200 when job is saved successfully", async () => {
    savedJobsModel.simpanPekerjaan.mockResolvedValueOnce();

    const res = await request(app)
      .post("/saveJobs/addJobs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        idPelamar: 1,
        idPostPekerjaan: 3,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Pekerjaan berhasil di simpan.");
    expect(savedJobsModel.simpanPekerjaan).toHaveBeenCalledWith(1, 3);
  });

  it("should return 500 on error", async () => {
    savedJobsModel.simpanPekerjaan.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app)
      .post("/saveJobs/addJobs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        idPelamar: 1,
        idPostPekerjaan: 3,
      });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message", "Server error");
  });
});
