export async function getCoach(API_URL, slug) {
  try {
    const response = await fetch(`${API_URL}/coaches/${slug}`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
