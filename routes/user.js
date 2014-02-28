
/*
 * GET users listing.
 */

//exports.list = function(req, res){
//  res.send("respond with a resource");
//};

exports.list = function(db) {
    return function(req, res) {
        var collection = db.get('user');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};