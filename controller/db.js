const
    fs = require('fs'),
    lowdb = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    adapter = new FileSync('./data/data.json'),
    db = lowdb(adapter); 
db.defaults({
    authors: [],
    books: [],
    mags: []
}).write()
const preload = () => {
    let authors = fs.readFileSync("data/authors.csv", { encoding: 'utf-8' });
    let books = fs.readFileSync("data/books.csv", { encoding: 'utf-8' });
    let mags = fs.readFileSync("data/mags.csv", { encoding: 'utf-8' });
    authors = csv2json(authors)
    books = csv2json(books)
    mags = csv2json(mags)

    db.get('authors').assign(authors).write();
    db.get('books').assign(books).write();
    db.get('mags').assign(mags).write();
}
const export_json = () => {
    fs.writeFileSync("data/books_exported.csv", j2c(db.get("books").value()), 'utf8')
    fs.writeFileSync("data/authors_exported.csv", j2c(db.get("authors").value()), 'utf8')
    fs.writeFileSync("data/mags_exported.csv", j2c(db.get("mags").value()), 'utf8') 
}
function csv2json(file) {
    file = file.split("\n").filter(e => e.length != 0);
    let keys = file.shift().split(";").filter(e => e.length != 0).map(k => {
        if (k.charAt(0) === '\uFEFF') k = k.substr(1);
        return k
    })
    return file.map((val) => keys.reduce((obj, key, index) => ({ ...obj, [String(key)]: val.split(";").filter(e => e.length != 0).map(e => e.trim())[index] }), {}))
}
function j2c(json) {
    return Object.keys(Object.assign({}, ...json)).join(";") + "\n" + json.reduce((str, item) => (str += Object.values(item).join(";") + "\n"), "")
}


module.exports = {
    data: db,
    preload: preload,
    export_json : export_json 
}


