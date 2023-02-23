export async function getSingleNews(API_URL, slug) {
  try {
    const response = await fetch(`${API_URL}/news/${slug}`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
