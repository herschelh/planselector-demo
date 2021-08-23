require('dotenv').config();

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require("mysql");
const db = require("./db");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_DOMAIN);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/api/plan/create", (req, res) => {
  let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';

  db(mysql.format(insertQuery, [
    "plans", "name", "price", req.body.name, req.body.price
  ])).then((dbRes) => {
    let values = req.body.features.map(
      (feature) => [dbRes.insertId, feature]
    );
    return db(mysql.format(insertQuery,[
      "plan_features", "plan_id", "feature", values
    ]));
  }).then((dbRes) => {
    res.json({ message: 'Success' });
  }).catch((err) => {
    res.json({ message: 'Error' });
  });
});

app.get("/api/plan/list", (req, res) => {
  db(`
    SELECT plans.*, GROUP_CONCAT(plan_features.feature) as features 
    from plans, plan_features 
    where plans.id = plan_features.plan_id
    group by plans.id
  `).then((rows) => {
    res.json({ data: rows.map((row) => Object.assign({}, row, {
      features: row.features.toString().split(',')
    })) });
  }).catch((err) => {
    res.json({ message: 'Error' });
  });
});

app.get("/api/plan/feature/list", (req, res) => {
  db('SELECT * from features').then((rows) => {
    res.json({ data: rows });
  }).catch((err) => {
    res.json({ message: 'Error' });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});