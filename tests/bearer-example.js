import API from '../src/API.js';

async function run() {
  const api = new API('https://setup.platon.sk/api/');
  api.setBearerToken('TOKEN');

  const result = await api.get('/system/hello');
  console.log('Authorized response:', result);
}

run().catch((err) => {
  console.error('Request failed:', err.message);
});
