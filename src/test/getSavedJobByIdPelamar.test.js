const request = require("supertest");
const app = require("../app"); 
const jwt = require("jsonwebtoken");

process.env.NODE_ENV = "test";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

jest.mock("../models/savedJobs", () => ({
  getSavedJobsByIdPelamar: jest.fn(),
}));

const savedJobsModel = require("../models/savedJobs");

const token = jwt.sign({ id: 1, role: "pelamar" }, JWT_SECRET, { expiresIn: "1h" });

describe("GET /saveJobs/getSavedJobs/:idPelamar", () => {
  it("should return 200 and list of saved jobs", async () => {
    const fakeData = [
      { id: 1, posisi: "Software Engineer" },
      { id: 2, posisi: "Frontend Developer" },
    ];

    savedJobsModel.getSavedJobsByIdPelamar.mockResolvedValueOnce([fakeData]);

    const res = await request(app)
      .get("/saveJobs/getSavedJobs/1") 
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("menampilkan pekerjaan yang disimpan oleh ID PELAMAR 1");
    expect(res.body.data).toEqual(fakeData);
    expect(savedJobsModel.getSavedJobsByIdPelamar).toHaveBeenCalledWith("1");
  });

  it("should return 500 on server error", async () => {
    savedJobsModel.getSavedJobsByIdPelamar.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app)
      .get("/saveJobs/getSavedJobs/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Server error");
    expect(res.body).toHaveProperty("error", "DB error");
  });
});
