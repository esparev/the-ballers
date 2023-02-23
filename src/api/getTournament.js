export async function getTournament(API_URL, slug) {
  try {
    const response = await fetch(`${API_URL}/tournaments/${slug}`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
