const API_PATH = '/api';

type RequestOptions = {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
};

async function fetchApi<T>(url: string, options: RequestInit): Promise<T> {

    const {
        method = 'GET',
        body = {},
        headers = {
            'Content-Type': 'application/json',
        },
    } = options;

    const response = await fetch(`${API_PATH}${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
}

/**
 * A simple API client that wraps around the fetch API.
 */
export const api = {
    get<T>(url: string, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, {...options, method: 'GET'});
    },
    post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, {...options, method: 'POST', body});
    },
    put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, {...options, method: 'PUT', body});
    },
    patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, {...options, method: 'PATCH', body});
    },
    delete<T>(url: string, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, {...options, method: 'DELETE'});
    },
};