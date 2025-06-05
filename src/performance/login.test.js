import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 },   // ramp-up ke 10 VUs dalam 30 detik
    { duration: '1m', target: 50 },    // naik ke 50 VUs selama 1 menit
    { duration: '1m', target: 100 },   // naik ke 100 VUs selama 1 menit
    { duration: '30s', target: 0 },    // ramp-down ke 0 VUs selama 30 detik
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% response time harus di bawah 2 detik
  },
};

export default function () {
  const baseUrl =  __ENV.BASE_URL; 
  const endpoint = '/auth/login'; 

  const url = baseUrl + endpoint;

  const payload = JSON.stringify({
    email: 'rafif.purnomo@gmail.com',
    password: 'rafif234',
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has token': (r) => r.json('token') !== undefined,
    'response time < 2s': (r) => r.timings.duration < 2000,  // durasi dalam ms
  });

  sleep(1);
}
