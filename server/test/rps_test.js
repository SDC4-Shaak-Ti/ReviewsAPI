import http from 'k6/http';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

// export default function () {
//   var data = {
//     rating: 3,
//     summary: 'summary',
//     body: 'body',
//     recommend: true,
//     name: 'name',
//     email: 'email@email.com',
//     photos: ["url.com", "url2.com"],
//     characteristics: {
//       '1': 2,
//       '5': 3
//     }
//   }
//   http.post('http://localhost:3000/reviews/37311', JSON.stringify(data), {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
// }

// export default function() {
//   http.get('http://localhost:3000/reviews/37311/list?sort=relevant&page=1&count=4')
// }

// export default function() {
//   http.put('http://localhost:3000/reviews/37311/helpful')
// }

export default function() {
  http.put('http://localhost:3000/reviews/37311/report')
}