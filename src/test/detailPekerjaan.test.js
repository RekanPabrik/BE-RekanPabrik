const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

jest.mock("../models/postingPekerjaan", () => ({
  getPostByIDPostingan: jest.fn(),
}));

const postPekerjaanModel = require("../models/postingPekerjaan");

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const token = jwt.sign({ id: 1, role: "pelamar" }, JWT_SECRET, {
  expiresIn: "1h",
});

describe("GET /postPekerjaan/detailPost/:idPostingan", () => {
  it("should return 200 and postingan data if found", async () => {
    const mockData = [
      {
        id_post_pekerjaan: 1,
        id_perusahaan: 1,
        posisi: "Quality Assurance",
        lokasi: "Jakarta selatan, DKI JAKARTA",
        job_details: "menjadi quality assurance",
        requirements: "S1 Informatika atau setara",
        status: "ditutup",
        createdAt: "2024-11-30T00:00:00.000Z",
        nama_perusahaan: "PT Telekomunikasi Seluler",
        about_me: "perusahaan telkomsel adalahperushaan seluler",
        profile_pict:
          "https://firebasestorage.googleapis.com/v0/b/proyek-tingkat.appspot.com/o/foto-profile-perusahaan%2F1742915175030_portal%20home.png?alt=media&token=a3d81409-96c9-42b6-8032-c1a62d7e125a",
        alamat: "Jl. gatot subroto No.Kav 52, Jakarta Selatan",
      },
    ];

    postPekerjaanModel.getPostByIDPostingan.mockResolvedValueOnce([mockData]);

    const res = await request(app)
      .get("/postPekerjaan/detailPost/1") // sesuaikan dengan endpoint asli kamu
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("success");
    expect(res.body.data).toEqual(mockData);
    expect(postPekerjaanModel.getPostByIDPostingan).toHaveBeenCalledWith("1");
  });

  it("should return 500 if there is a server error", async () => {
    postPekerjaanModel.getPostByIDPostingan.mockRejectedValueOnce(
      new Error("DB error")
    );

    const res = await request(app)
      .get("/postPekerjaan/detailPost/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Error saat mengambil data");
    expect(res.body.serverMessage).toBe("DB error");
  });
});
