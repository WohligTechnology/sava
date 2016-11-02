var objectid = require("mongodb").ObjectId;
var schema = new Schema({
    branchName:{
      type:Schema.Types.ObjectId,
      ref:"BranchRegistration"
    },
    name: String,
    time: [{
      from: String,
      to: String
    }]
});

schema.plugin(deepPopulate, {
  populate : {
    'branchName' : {
      select : '_id branchName'
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('BranchHours', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,'branchName','branchName'));
var model = {

  getTime: function(data, callback) {
    BranchHours.findOne({
      _id: data._id
    }).exec(function(err, found) {
      if (err) {
        // console.log(err);
        callback(err, null);
      } else {
        // console.log(found,"000");
        var data2 = {};
        if (found.time) {
          data2.results = found.time;
        }else {
          data2.results = '';
        }
        if (data2) {
          callback(null, data2);
        } else {
          callback(null, {
            message: "No Data Found"
          });
        }
      }

    })
  },
  saveTime: function(data, callback) {
    //  var product = data.product;
    //  console.log(product);
    console.log("dddddd", data);
    if (!data._id) {
      BranchHours.update({
        _id: data.BranchHours
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
      BranchHours.update({
        "time._id": data._id
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

  deleteTime: function(data, callback) {
    BranchHours.update({
      "time._id": data._id
    }, {
      $pull: {
        "time": {
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

  getOneTime: function(data, callback) {
    BranchHours.aggregate([{
      $unwind: "$time"
    }, {
      $match: {
        "time._id": objectid(data._id)
      }
    }, {
      $project: {
        "time.from": 1,
        "time.to": 1,
        "time._id": 1
      }
    }]).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, found[0].time);
      }
    });
  },


};
module.exports = _.assign(module.exports, exports, model);
