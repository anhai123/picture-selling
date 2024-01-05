exports.setResHeader = (res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // If needed
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  ); // If needed
  res.header("Access-Control-Allow-Credentials", true); // If needed
  return res;
};
