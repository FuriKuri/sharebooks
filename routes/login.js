exports.login = function(req, res) {
    res.render('login', { title: 'Login' });
};

exports.do_login = function(req, res) {
    req.session.user_id = req.body.username;
    res.render('index', { title: 'Eingeloggt' });
};

exports.logout = function(req, res) {
    delete req.session.user_id;
    res.render('index', { title: 'Ausgeloggt' });
};

