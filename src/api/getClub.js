export async function getClub(API_URL, slug) {
  try {
    const response = await fetch(`${API_URL}/clubs/${slug}`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
