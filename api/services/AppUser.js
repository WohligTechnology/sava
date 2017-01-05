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
    enum: ["Male","Female","Other"]
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

  dietaryNeeds: [{
    name:String
  }],
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
  UserType:String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('AppUser', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getHouseHold: function(data, callback) {
    User.findOne({
        _id: data._id
    }).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log(found, "000");
        var data = {};
        data.results = found.houseHold;
        if (found && found.houseHold.length > 0) {
          callback(null, data);
        } else {
          callback(null, {
            message: "No Data Found"
          });
        }
      }

    })
  },
  getOneHouseHold: function(data, callback) {
    User.aggregate([{
      $unwind: "$houseHold"
    }, {
      $match: {
        "houseHold._id": objectid(data._id)
      }
    }, {
      $project: {
        "houseHold.name": 1,
        "houseHold.age": 1,
        "houseHold._id": 1
      }
    }]).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, found[0].houseHold);
      }
    });
  },

  savehouseHold: function(data, callback) {
    //  var product = data.product;
    //  console.log(product);
    if (!data._id) {
      User.update({
        _id: data.User
      }, {
        $push: {
          houseHold: data
        }
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "houseHold.$.";
      _.forIn(data, function(value, key) {
        tobechanged[attribute + key] = value;
      });
      User.update({
        "houseHold._id": data._id
      }, {
        $set: tobechanged
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },
  deleteHouseHold: function(data, callback) {
    User.update({
      "houseHold._id": data._id
    }, {
      $pull: {
        "houseHold": {
          "_id": objectid(data._id)
        }
      }
    }, function(err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });
  },

};
module.exports = _.assign(module.exports, exports, model);
