var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  branchName: String,
  branchId: String,
  address: String,
  contactNumber: [Number],
  numberOfEmployee: Number,
  photo: [{
        image: String
    }],
  eastablishmentType: String,
  cuisines: [String],
  collections: {
    type: Boolean,
    default: false
  },
  typeOfAppoinment: {
    type: String,
    enum: ["a", "b", "c"]
  },
  paymentMethods: [String],
  avgCost: Number,
  tags: [String]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('BranchRegistration', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getHours: function(data, callback) {
    BranchRegistration.findOne({
      _id: data._id
    }).exec(function(err, found) {
      if (err) {
        // console.log(err);
        callback(err, null);
      } else {
        // console.log(found,"000");
        var data = {};
        data.results = found.hours;
        if (found && found.hours.length > 0) {
          callback(null, data);
        } else {
          callback(null, {
            message: "No Data Found"
          });
        }
      }

    })
  },


  getTime: function(data, callback) {
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data._id);
    BranchRegistration.aggregate([{
      $unwind: "$hours"
    }, {
      $match: {
        "hours._id": objectid(data._id)
      }
    }]).exec(function(err, found) {
      if (err) {
        // console.log(err);
        callback(err, null);
      } else {
        console.log(found, "000");
        var data = {};
        data.results = found[0].hours.time;
        if (found && found.length > 0) {
          callback(null, data);
        } else {
          callback(null, {
            message: "No Data Found"
          });
        }
      }

    })
  },

  getOneTime: function(data, callback) {
    BranchRegistration.aggregate([{
        $unwind: "$hours"
      }, {
        $unwind: "$hours.time"
      }, {
        $match: {
          "hours.time._id": objectid(data._id)
        }
      }, {
        $project: {
          "hours.time.from": 1,
          "hours.time.to": 1,
          "hours.time._id": 1
        }
      }
      // ,{
      //   $set:{
      //     "from":"12.45",
      //     "to":"12.45"
      //   }
      // }

    ]).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log("AAAAAAAAAAAAAAAAAAA", found);
        callback(null, found[0].hours.time);
      }
    });
  },
  getOneHours: function(data, callback) {
    BranchRegistration.aggregate([{
      $unwind: "$hours"
    }, {
      $match: {
        "hours._id": objectid(data._id)
      }
    }, {
      $project: {
        "hours.name": 1,
        "hours._id": 1
      }
    }]).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, found[0].hours);
      }
    });
  },

  deleteHours: function(data, callback) {
    BranchRegistration.update({
      "hours._id": data._id
    }, {
      $pull: {
        "hours": {
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



  saveHours: function(data, callback) {
    //  var product = data.product;
    //  console.log(product);
    console.log("dddddd", data);
    if (!data._id) {
      BranchRegistration.update({
        _id: data.BranchRegistration
      }, {
        $push: {
          hours: data
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
      var attribute = "hours.$.";
      _.forIn(data, function(value, key) {
        console.log("value key", value, key);
        tobechanged[attribute + key] = value;
      });
      BranchRegistration.update({
        "hours._id": data._id
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


  saveTime: function(data, callback) {
    //  var product = data.product;
    //  console.log(product);
    console.log("dddddd", data);
    if (!data._id) {
      BranchRegistration.update({
        _id: data.BranchRegistration
      }, {
        $push: {
          time: data
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
      var attribute = "time.$.";
      _.forIn(data, function(value, key) {
        console.log("value key", value, key);
        tobechanged[attribute + key] = value;
      });
      BranchRegistration.update({
        "hours.time._id": data._id
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
  }


};
module.exports = _.assign(module.exports, exports, model);
