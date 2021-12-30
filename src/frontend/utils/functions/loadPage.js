/**
 * Redirects to the provided route 
 * and reloads the page
 * @param {string} location - URL route
 */
const loadPage = (location) => {
  window.location.href = location;
  setTimeout(window.location.reload(), 500);
};

export default loadPage;
