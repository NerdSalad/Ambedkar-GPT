import client from './client';

// GET /news — paginated news list
export async function getNews({ limit = 100, skip = 0 } = {}) {
  const { data } = await client.get('/news', { params: { limit, skip } });
  return data;
}

// GET /news/:id
export async function getNewsById(id) {
  const { data } = await client.get(`/news/${id}`);
  return data;
}
