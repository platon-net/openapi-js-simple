import API from '../src/API.js';

async function run() {
  const api = new API('https://setup.platon.sk/api/');

  try {
    const result = await api.get('/this/endpoint/does-not-exist');
    console.log(result);
  } catch (err) {
    console.error('Handled API error');
    console.error('Message:', err.message);
    console.error('Status:', err.status);
    console.error('Response body:', err.responseBody);
  }
}

run();
