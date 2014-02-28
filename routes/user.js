
/*
 * GET users listing.
 */

//exports.list = function(req, res){
//  res.send("respond with a resource");
//};

exports.list = function(db) {
    return function(req, res) {
        db.user.findItems(function(err, users) {
            res.render('userlist', {
                "userlist" : users
            });
        });
    };
};