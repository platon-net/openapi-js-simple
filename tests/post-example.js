import API from '../src/API.js';

async function run() {
  const api = new API('https://setup.platon.sk/api/');

  const payload = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  const result = await api.post('/example/users', payload);
  console.log('POST /example/users:', result);
}

run().catch((err) => {
  console.error('Request failed:', err.message);
});
