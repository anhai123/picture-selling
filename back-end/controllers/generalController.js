exports.setResHeader = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://picture-selling-ychv-oa8dwhtm2-anhai123.vercel.app/shopping");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // If needed
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  ); // If needed
  res.setHeader("Access-Control-Allow-Credentials", true); // If needed
  return res;
};
