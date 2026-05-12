/*
 * API.js
 *
 * Lightweight client for REST API.
 */

class API {
	constructor(baseUrl, bearerToken = null) {
		this.baseUrl = API.normalizeBaseUrl(baseUrl);
		this.bearerToken = bearerToken;
	}

	static normalizeBaseUrl(baseUrl) {
		if (typeof baseUrl !== 'string' || baseUrl.trim().length === 0) {
			throw new Error('API baseUrl must be a non-empty string');
		}
		return baseUrl.replace(/\/+$/, '');
	}

	setBaseUrl(baseUrl) {
		this.baseUrl = API.normalizeBaseUrl(baseUrl);
		return this;
	}

	setBearerToken(token) {
		this.bearerToken = token || null;
		return this;
	}

	clearBearerToken() {
		this.bearerToken = null;
		return this;
	}

	get(path, query = {}) {
		return this.request('GET', path, { query });
	}

	post(path, data = null, query = {}) {
		return this.request('POST', path, { data, query });
	}

	put(path, data = null, query = {}) {
		return this.request('PUT', path, { data, query });
	}

	patch(path, data = null, query = {}) {
		return this.request('PATCH', path, { data, query });
	}

	delete(path, query = {}) {
		return this.request('DELETE', path, { query });
	}

	async request(method, path, options = {}) {
		const url = this.buildUrl(path, options.query || {});
		const headers = {
			Accept: 'application/json',
			...(options.headers || {}),
		};

		if (this.bearerToken) {
			headers.Authorization = `Bearer ${this.bearerToken}`;
		}

		const fetchOptions = {
			method,
			headers,
		};

		const hasBody = options.data !== undefined && options.data !== null;
		if (hasBody) {
			const isJsonBody = API.isPlainObject(options.data) || Array.isArray(options.data);
			if (isJsonBody) {
				if (!('Content-Type' in headers)) {
					headers['Content-Type'] = 'application/json';
				}
				fetchOptions.body = JSON.stringify(options.data);
			} else {
				fetchOptions.body = options.data;
			}
		}

		let response;
		try {
			response = await fetch(url, fetchOptions);
		} catch (err) {
			throw new Error(`Network error while requesting ${method} ${url}: ${err.message}`);
		}

		const parsedBody = await API.parseResponseBody(response);

		if (!response.ok) {
			throw API.createHttpError(method, url, response.status, parsedBody);
		}

		return parsedBody;
	}

	buildUrl(path, query = {}) {
		if (typeof path !== 'string') {
			throw new Error('API path must be a string');
		}

		const normalizedPath = path.startsWith('/') ? path : `/${path}`;
		const url = new URL(`${this.baseUrl}${normalizedPath}`);

		const filteredQuery = API.filterEmpty(query);
		Object.entries(filteredQuery).forEach(([key, value]) => {
			url.searchParams.append(key, String(value));
		});

		return url.toString();
	}

	static filterEmpty(query) {
		if (!query || typeof query !== 'object' || Array.isArray(query)) {
			return {};
		}

		const out = {};
		Object.entries(query).forEach(([key, value]) => {
			if (value !== null && value !== undefined && value !== '') {
				out[key] = value;
			}
		});

		return out;
	}

	static isPlainObject(value) {
		return Object.prototype.toString.call(value) === '[object Object]';
	}

	static async parseResponseBody(response) {
		const raw = await response.text();
		if (!raw) {
			return null;
		}

		const contentType = (response.headers.get('content-type') || '').toLowerCase();
		const looksLikeJson = contentType.includes('application/json') || contentType.includes('+json');

		if (looksLikeJson) {
			try {
				return JSON.parse(raw);
			} catch {
				throw new Error('Invalid JSON response from API');
			}
		}

		return raw;
	}

	static createHttpError(method, url, status, responseBody) {
		const bodyText = typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody);
		const error = new Error(`API request failed (${method} ${url}) with status ${status}. Response: ${bodyText}`);
		error.name = 'ApiHttpError';
		error.status = status;
		error.responseBody = responseBody;
		return error;
	}
}

export default API;
