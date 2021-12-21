/**
 * Sorts the array of objects by recent date
 * @param {*} arr - array of objects
 */
const sortByDate = (arr) => {
  const sorter = (a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  };
  arr.sort(sorter);
};

export default sortByDate;
