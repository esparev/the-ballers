export async function getPlayer(API_URL, slug) {
  try {
    const response = await fetch(`${API_URL}/players/${slug}`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
