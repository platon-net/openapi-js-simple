# openapi-js-simple

A minimal vanilla JavaScript OpenAPI client for browser usage without build tools or external dependencies.

Main implementation: `src/API.js`

## Install / Add to Project

This project has no package dependencies.

1. Copy `src/API.js` into your project.
2. Import it as an ES module.

Alternative: include this repository as a source in your project and import `src/API.js` directly.

## ES Module Import

```js
import API from './src/API.js';
```

## Browser HTML Usage

```html
<!doctype html>
<html lang="en">
<body>
  <script type="module">
    import API from './src/API.js';

    const api = new API('https://setup.platon.sk/api/');
    api.setBearerToken('YOUR_TOKEN');

    const result = await api.get('/system/hello');
    console.log(result);
  </script>
</body>
</html>
```

Security warning:
- Do not embed real production Bearer tokens in public HTML or JavaScript.
- Any token exposed in browser code can be extracted and misused.
- For endpoints that modify API data, prefer a backend proxy or server-side token handling.

## Basic Usage

```js
import API from './src/API.js';

const api = new API('https://setup.platon.sk/api/');
api.setBearerToken('YOUR_TOKEN');

const result = await api.get('/system/hello');
console.log(result);
```

## GET Request Example

```js
import API from './src/API.js';

const api = new API('https://setup.platon.sk/api/');

const hello = await api.get('/system/hello');
console.log(hello);
```

## POST Request Example (JSON Payload)

```js
import API from './src/API.js';

const api = new API('https://setup.platon.sk/api/');

const payload = {
  name: 'John Doe',
  email: 'john@example.com',
};

const response = await api.post('/example/users', payload);
console.log(response);
```

## Authentication (Bearer Token)

```js
import API from './src/API.js';

const api = new API('https://setup.platon.sk/api/');
api.setBearerToken('YOUR_TOKEN');

const profile = await api.get('/system/hello');
console.log(profile);
```

Notes:
- Use `api.setBearerToken(token)` to set or update token.
- Use `api.clearBearerToken()` to remove token.

## Error Handling

The client throws an `Error` when:
- network request fails
- response contains invalid JSON while declared as JSON
- HTTP status is outside 2xx

For HTTP errors, the thrown error contains:
- `error.status` (HTTP status code)
- `error.responseBody` (parsed response body or plain text)

Example with `try/catch`:

```js
import API from './src/API.js';

const api = new API('https://setup.platon.sk/api/');

try {
  const data = await api.get('/this/endpoint/does-not-exist');
  console.log(data);
} catch (error) {
  console.error('Request failed:', error.message);
  console.error('Status:', error.status);
  console.error('Response body:', error.responseBody);
}
```

## tests/

Example scripts are in `tests/`:
- `tests/get-example.js`: basic GET request
- `tests/post-example.js`: POST request with JSON payload
- `tests/bearer-example.js`: Bearer token usage
- `tests/error-handling-example.js`: error handling with `try/catch`

Use these files as reference templates when implementing your own API calls.

## Compatibility

- Runtime: modern browsers with native `fetch`, `URL`, and ES modules support
- Build tools: not required
- External libraries: none

If you need to support older browsers, add polyfills for missing web APIs.

## API Surface

Available methods in `src/API.js`:
- `new API(baseUrl, bearerToken = null)`
- `setBaseUrl(baseUrl)`
- `setBearerToken(token)`
- `clearBearerToken()`
- `get(path, query = {})`
- `post(path, data = null, query = {})`
- `put(path, data = null, query = {})`
- `patch(path, data = null, query = {})`
- `delete(path, query = {})`
- `request(method, path, options = {})`
