import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 10 }, // ramp-up ke 10 VUs dalam 30 detik
    { duration: "1m", target: 50 }, // naik ke 50 VUs selama 1 menit
    { duration: "1m", target: 100 }, // naik ke 100 VUs selama 1 menit
    { duration: "30s", target: 0 }, // ramp-down ke 0 VUs selama 30 detik
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% response time harus di bawah 2 detik
  },
};

export default function () {
  const BASE_URL = __ENV.BASE_URL;
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      email: __ENV.K6_EMAIL,
      password: __ENV.K6_PASSWORD,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(loginRes, {
    "login success": (r) => r.status === 200 && r.json("token") !== undefined,
  });

  const token = loginRes.json("token");

  // 2. Panggil API yang butuh auth pakai token tadi
  const res = http.get(`${BASE_URL}/postPekerjaan/getPostAllPostingan`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 2s": (r) => r.timings.duration < 2000,
  });

  sleep(1);
}
