var schema = new Schema({
    //  ************Login Details*************
    name: String,
    email: {
        type: String,
        validate: validators.isEmail(),
        unique: true
    },
    mobile: {
        type: String,
        validate: validators.isLength(8, 14)
    },
    password: String,
    image: String,
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    dob: Date,
    // ****************   Address  *********************

    address1: String,
    address2: String,
    town: String,
    city: String,
    pincode: Number,
    country: String,
    lat: String,
    lng: String,
    // ****************   About You  *********************

    dietaryNeeds: [String],
    houseHold: [{
        name: String,
        age: {
            type: Number,
            validate: validators.isNumeric()
        }
    }],
    annualIncome: String,
    facebookID: String,
    googleID: String,
    otp: String,

    favBranch: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'BranchRegistration'
        }],
        index: true
    },
    accessToken: {
        type: [String],
        index: true
    },
    googleAccessToken: String,
    googleRefreshToken: String,
    oauthLogin: {
        type: [{
            socialId: String,
            socialProvider: String
        }],
        index: true
    },
    accessLevel: {
        type: String,
        default: "User",
        enum: ['User', 'Admin']
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('User', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    existsSocial: function(user, callback) {
        var Model = this;
        Model.findOne({
            "oauthLogin.socialId": user.id,
            "oauthLogin.socialProvider": user.provider,
        }).exec(function(err, data) {
            if (err) {
                callback(err, data);
            } else if (_.isEmpty(data)) {
                var modelUser = {
                    name: user.displayName,
                    accessToken: [uid(16)],
                    oauthLogin: [{
                        socialId: user.id,
                        socialProvider: user.provider,
                    }]
                };
                if (user.emails && user.emails.length > 0) {
                    modelUser.email = user.emails[0].value;
                }
                modelUser.googleAccessToken = user.googleAccessToken;
                modelUser.googleRefreshToken = user.googleRefreshToken;
                if (user.image && user.image.url) {
                    modelUser.photo = user.image.url;
                }
                Model.saveData(modelUser, function(err, data2) {
                    if (err) {
                        callback(err, data2);
                    } else {
                        data3 = data2.toObject();
                        delete data3.oauthLogin;
                        delete data3.password;
                        delete data3.forgotPassword;
                        delete data3.otp;
                        callback(err, data3);
                    }
                });
            } else {
                delete data.oauthLogin;
                delete data.password;
                delete data.forgotPassword;
                delete data.otp;
                data.googleAccessToken = user.googleAccessToken;
                data.save(function() {});
                callback(err, data);
            }
        });
    },
    profile: function(data, callback, getGoogle) {
        var str = "name email photo mobile accessLevel";
        if (getGoogle) {
            str += " googleAccessToken googleRefreshToken";
        }
        User.findOne({
            accessToken: data.accessToken
        }, str).exec(function(err, data) {
            if (err) {
                callback(err);
            } else if (data) {
                callback(null, data);
            } else {
                callback("No Data Found", data);
            }
        });
    },
    updateAccessToken: function(id, accessToken) {
        User.findOne({
            "_id": id
        }).exec(function(err, data) {
            data.googleAccessToken = accessToken;
            data.save(function() {});
        });
    }

};
module.exports = _.assign(module.exports, exports, model);
