var bcrypt = require('bcrypt');

exports.register = function(req, res) {
    res.render('register', { title: 'Registrieren' });
};

exports.addUser = function(db) {
    return function(req, res) {
        var userName = req.body.username;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                var user = {
                    "username" : userName,
                    "password" : hash
                };
                db.user.insert(user, function(err) {
                    if (err) {
                        res.send("There was a problem adding the information to the database.");
                    }
                    else {
                        res.location("login");
                        res.redirect("login");
                    }
                });
            });
        });
    }
}