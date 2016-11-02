var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  name: {
    type: String,
    default: ""
  },
  description: String,
  banner: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  video: String,
  isSlider: {
    type: String,
    enum: ["Yes", "No"]
  },
  type: {
    type: String,
    enum: ["None","Popular Destination"]
  },
  accomodation:[{
    hotelName:String,
    image:String,
    status: {
      type: String,
      enum: ["true", "false"]
    }
  }],
  status: {
    type: String,
    enum: ["true", "false"]
  }

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Destination', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getAccomodation: function (data, callback) {
    Destination.findOne({
      _id: data._id
    }).exec(function (err, found) {
      if (err) {
        // console.log(err);
        callback(err, null);
      } else {
        // console.log(found,"000");
        var data = {};
        data.results = found.accomodation;
        if (found) {
          callback(null, data);
        } else {
          callback(null, {
            message: "No Data Found"
          });
        }
      }

    })
  },
  getActivities: function (data, callback) {
    Destination.findOne({
      _id: data._id
    }).exec(function (err, found) {
      if (err) {
        // console.log(err);
        callback(err, null);
      } else {
        // console.log(found,"000");
        var data = {};
        data.results = found.activities;
        if (found && found.activities.length > 0) {
          callback(null, data);
        } else {
          callback(null, {
            message: "No Data Found"
          });
        }
      }

    })
  },

  getOneAccomodation: function (data, callback) {
    Destination.aggregate([{
      $unwind: "$accomodation"
    }, {
      $match: {
        "accomodation._id": objectid(data._id)
      }
    }, {
      $project: {
        "accomodation.hotelName": 1,
        "accomodation.image": 1,
        "accomodation.status": 1,
        "accomodation._id": 1
      }
    }]).exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, found[0].accomodation);
      }
    });
  },

  deleteAccomodation: function (data, callback) {
    Destination.update({
      "accomodation._id": data._id
    }, {
      $pull: {
        "accomodation": {
          "_id": objectid(data._id)
        }
      }
    }, function (err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });
  },
  saveAccomodation: function (data, callback) {
    if (!data._id) {
      Destination.update({
        _id: data.Destination
      }, {
        $push: {
          accomodation: data
        }
      }, function (err, updated) {
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
      var attribute = "accomodation.$.";
      _.forIn(data, function (value, key) {
        tobechanged[attribute + key] = value;
      });
      Destination.update({
        "accomodation._id": data._id
      }, {
        $set: tobechanged
      }, function (err, updated) {
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
