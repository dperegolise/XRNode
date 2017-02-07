module.exports = function (db, cb) {
    var User = db.define('GDN_User', {
        UserID : { type: "integer", size: 11, unique: true, key: true },
        Name: String,
        Email: String
    });

    var Category = db.define('GDN_Category', {
        CategoryID : { type: "integer", size: 11, unique: true, key: true },
        Name: String
    });

    var Discussion = db.define('GDN_Discussion', {
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