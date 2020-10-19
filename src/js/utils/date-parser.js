const dateParser = () => {
  const timestamp = Date.now();
  const date = new Date(timestamp - 60 * 60 * 24 * 7 * 1000);
  const day = (date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate();
  const month = (date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1;
  const year = date.getFullYear();

  return year + '-' + month + '-' + day;
};

export default dateParser;