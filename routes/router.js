const express = require('express');
const router = express.Router();
const db = require('../controller/db');
// db.preload()
const get_data = () => {
  let books = db.data.get("books").value()
  let mags = db.data.get("mags").value() 
  books = books.map((item)=>{
    item.type = "books"
    return item;
  })
  mags  = mags.map((item)=>{
    item.type = "mags"
    return item;
  })
  return [...books,...mags]
};
router.get('/', (req, res) => {
  res.render('index', { "books": get_data() });
});
router.get('/reset', (req, res) => {
  db.preload();
  res.redirect("/")
});
router.get('/export', (req, res) => {
  db.export_json()
  res.render('export', { "status": true });
});
router.post('/search', function (req, res) {
  const pass = (input) => input;
  const findInArray = (array, search, fields) => {
    return array.filter((item) => fields.map((field) => search.test(item[field])).some(pass));
  };
  let data = findInArray(get_data(), new RegExp(req.body.st, "gmi"), ["title", "isbn", "authors"])

  res.json(data)
});
router.get('/get_data', function (req, res) {
  res.json(get_data())
});
router.post('/add', function (req, res) {
  let sel = req.body.type
  let data = req.body
  if(data.type  == "mags") data.publishedAt = new Date().toJSON().slice(0,10).split("-").reverse().join(".")
  delete data.type
  db.data.get(sel).push(data).write()
  res.json(get_data())
});

router.post('/delete/:in', function (req, res) {
  db.data.get(req.params.in).remove({ isbn: req.body.isbn }).write();

  res.json(get_data())
});

module.exports = router;