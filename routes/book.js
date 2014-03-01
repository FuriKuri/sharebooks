var mongo = require("mongoskin");
var BSON = mongo.BSONPure;

exports.showAddBook = function(req, res) {
    res.render('addBook', { title: 'Book' });
};

exports.addBook = function(db) {
    return function(req, res) {
        var book = {
            "title" : req.body.title,
            "author" : req.body.author,
            "year" : req.body.year,
            "description" : req.body.description,
            "comment" : req.body.comment,
            "user_id" : req.session.user_id
        };
        db.book.insert(book, function(err) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                res.location("books");
                res.redirect("books");
            }
        });
    }
}

exports.list = function(db) {
    return function(req, res) {
        db.book.findItems({"user_id": req.session.user_id}, function(err, books) {
            res.render('booklist', {
                "booklist" : books
            });
        });
    };
};

exports.show = function(db) {
    return function(req, res) {
        db.book.findOne({_id: BSON.ObjectID(req.params.id)}, function(err, book) {
            var my = book;
            res.render('book', {
                "book" : book
            });
        });
    };
};