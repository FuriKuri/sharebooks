var bcrypt = require('bcrypt');

exports.login = function(req, res) {
    res.render('login', { title: 'Login' });
};

exports.doLogin = function(db) {
    return function(req, res) {
        db.user.findOne({"username": req.body.username}, function(err, user) {
            if (user == null) {
                res.location("login");
                res.redirect("login");
            } else {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (result == true) {
                        req.session.user_id = user._id;
                        res.location("books");
                        res.redirect("books");
                    } else {
                        res.location("login");
                        res.redirect("login");
                    }
                });
            }
        });
    }
}

exports.logout = function(req, res) {
    delete req.session.user_id;
    res.render('index', { title: 'Ausgeloggt' });
};

