const pg = require('pg');
const config = {
  host: "192.168.15.100",
  user: "postgres",
  database: "postgres",
  password: "password",
  port: 54321,
  // 扩展属性
  max: 20, // 连接池最大连接数
  idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
}
const pool = new pg.Pool(config);

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.connect(function (err, client, done) {
      if (err) {
        console.error('数据库连接出错', err)
        resolve(err)
      } else {
        client.query(sql, [], function (err, result) {
          done();// 释放连接（将其返回给连接池）
          if (err) {
            console.error('查询出错', err);
            reject(null)
          } else {
            // console.log('查询结果', result);
            resolve(result)
          }
        });
      }
    });
  })

}


module.exports = {
  query
}