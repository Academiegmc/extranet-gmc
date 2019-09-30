const redis = require("redis");
require("redis-streams")(redis);
const redisRStream = require("redis-rstream");
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient({
  port: REDIS_PORT,
  return_buffers: true,
  detect_buffers: true
});

const getRedisKey = (req, res, next) => {
  const { id } = req.params;
  client.exists(id, (err, data) => {
    if (err) return next(err);
    if (data) {
      console.log("Getting data from cache...");
      return redisRStream(client, id).pipe(res);
    } else {
      next();
    }
  });
};
const setRedisKey = (id, maxAge) => {
  console.log("Setting data in cache...");
  console.log({ id, maxAge });
  return client.writeThrough(id, maxAge);
};

module.exports = { getRedisKey, setRedisKey };
