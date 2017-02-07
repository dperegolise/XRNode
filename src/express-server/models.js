module.exports = function (db, cb) {
    var User = db.define('gdn_user', {
        UserID : { type: "integer", size: 11, unique: true, key: true },
        Name: String,
        Email: String
    });

    var Category = db.define('gdn_category', {
        CategoryID : { type: "integer", size: 11, unique: true, key: true },
        Name: String
    });

    var Discussion = db.define('gdn_discussion', {
        DiscussionID : { type: "integer", size: 11, unique: true, key: true },
        InsertUserID: { type: "integer"},
        Name: String,
        DateInserted: { type: "date"},
        CategoryID: { type: "integer"},
        Body: { type: "integer"},
        Announce: { type: "integer"}
    });

    Discussion.hasOne("Category", Category, {autoFetch : true});

    return cb();
};