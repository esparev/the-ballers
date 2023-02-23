export async function getTeam(API_URL, slug) {
  try {
    const response = await fetch(`${API_URL}/teams/${slug}`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
