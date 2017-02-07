var express = require('express')
var orm = require('orm');
var _ = require('lodash');
var app = express()

app.use(orm.express("mysql://root:root@localhost/dev_xr_forum", {
    define: function (db, models, next) {
    	db.settings.set("properties.association_key", "{field}");
        db.load("./models", function (err) {
        	if (err) throw err;
		    // loaded!
		    models.user = db.models.GDN_User;
		    models.discussion = db.models.GDN_Discussion;
		});

        next();
    }
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
;
app.get('/api/posts', function (req, res) {
	req.models.discussion.find({Announce: 2}, 'DateInserted').each().get(function(posts) {
		// Have to do this ugly workaround because node-orm doesn't supoprt
		// custom foreign keys (Discussion.InsertUserID != User.UserID)
		req.models.user.find().each(function(user) {
			_.each(posts, function(post) {
				if(user.UserID === post.InsertUserID) {
					post.User = user;
				}
			});
		}).get(function(users) {
			res.send(posts);
		});
	});
	
	
});
