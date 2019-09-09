let db;
if (process.env.NODE_ENV !== "production") {
  if (process.env.NODE_ENV === "test") {
    db = process.env.MONGOURITEST;
  } else {
    db = process.env.MONGOURIDEV;
  }
} else {
  db = process.env.MONGOURIPROD;
}
module.exports = {
  mongoURI: db,
  secretOrKeys: process.env.MONGOSECRET
};
