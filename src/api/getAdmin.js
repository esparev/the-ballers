import { authConfig } from '@constants';

export async function getAdmin(API_URL, slug) {
  try {
    const response = await fetch(`${API_URL}/admins/${slug}`, authConfig);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
