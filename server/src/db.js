const Promise = require("bluebird");
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("../data.db");

function baseModel(tableName, columns) {
  let columnSet = new Set(columns);
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
    selectAll(query = {}) {
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
    }
  }
}

const User = baseModel("user", ["id", "name"]);

if (!module.parent) {
  console.log("Init...");
  db.run(`
    create table user(
      id text, name text
    )
  `, (err, res) => {
    console.log(err, res);
  });
}

module.exports = {
  User
}