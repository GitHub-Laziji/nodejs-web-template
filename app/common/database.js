const Promise = require("bluebird");
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("../data.db");

function baseModel(tableName, columns) {
  const columnSet = new Set(columns);
  const handleQuery = (query = {}) => {
    let wheres = "";
    let params = [];
    for (let k in query) {
      if (!columnSet.has(k)) {
        return Promise.reject();
      }
      wheres += ` and ${k}`;
      if (query[k] === null) {
        wheres += " is null";
      } else {
        wheres += "=?";
        params.push(query[k]);
      }
    }
    return { wheres, params };
  }

  return {
    insert(row) {
      for (let k in row) {
        if (!columnSet.has(k)) {
          return Promise.reject();
        }
      }
      let ps = "";;
      for (let i = 0; i < columns.length; i++) {
        ps += ",?";
      }
      ps = ps.substring(1);
      let params = [];
      for (let k of columns) {
        params.push(row[k]);
      }
      return new Promise((resolve, reject) => {
        db.run.apply(db, [
          `insert into ${tableName}(${columns.join(",")}) values(${ps})`,
          ...params,
          (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          }
        ]);
      })
    },
    updateById(row) {
      let sets = "";
      let params = [];
      for (let k in row) {
        if (!columnSet.has(k)) {
          return Promise.reject();
        }
        sets += ` , ${k}=`;
        if (row[k] !== null) {
          sets += "?";
          params.push(row[k]);
        } else {
          sets += "null";
        }
      }
      sets = sets.substring(2);
      return new Promise((resolve, reject) => {
        db.all.apply(db, [
          `update ${tableName} set ${sets} where id=?`,
          ...params,
          row.id,
          (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          }
        ]);
      });
    },
    selectById(id) {
      return new Promise((resolve, reject) => {
        db.all.apply(db, [
          `select * from ${tableName} where id=?`,
          id,
          (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res[0]);
          }
        ]);
      });
    },
    selectAll(query) {
      let { wheres, params } = handleQuery(query);
      return new Promise((resolve, reject) => {
        db.all.apply(db, [
          `select * from ${tableName} ${wheres && "where "} ${wheres.substring(4)}`,
          ...params,
          (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          }
        ]);
      });
    },
    selectCount(query) {
      let { wheres, params } = handleQuery(query);
      return new Promise((resolve, reject) => {
        db.all.apply(db, [
          `select count(*) num from ${tableName} ${wheres && "where "} ${wheres.substring(4)}`,
          ...params,
          (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res[0]["num"]);
          }
        ]);
      });
    },
    deleteById(id) {
      return new Promise((resolve, reject) => {
        db.all.apply(db, [
          `delete from ${tableName} where id=?`,
          id,
          (err, _) => {
            if (err) {
              reject(err);
            }
            resolve();
          }
        ]);
      });
    }
  }
}

const User = baseModel("user", ["id", "name"]);

if (!module.parent) {
  console.log("Init...");
  db.run(`
      create table if not exists user(
        id text, name text
      )
    `, (err, _) => {
    if (err) {
      console.log(err);
      return;
    }
    (async function () {
      await User.insert({ id: "123", name: "xxx" });
      await User.insert({ id: "456", name: "bbb" });
      console.log(await User.selectCount());
      console.log(await User.selectAll());
      await User.deleteById("123");
      console.log(await User.selectCount());
      console.log(await User.selectAll());
      await User.deleteById("456");
    })();
  });
}

module.exports = {
  User
}