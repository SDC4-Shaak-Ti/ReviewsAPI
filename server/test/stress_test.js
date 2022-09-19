import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '10s', target: 1},
    { duration: '10s', target: 10},
    { duration: '10s', target: 100},
    { duration: '30s', target: 300},
    { duration: '30s', target: 300}
  ]
}
export default () => {
  http.get('http://localhost:3000/reviews/37311/meta');
}