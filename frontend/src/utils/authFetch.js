export const createAuthFetch = (getToken) => async (url, options = {}) => {
  const token = await getToken();
  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};
