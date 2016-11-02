var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  name: {
    type: String,
    default: ""
  },
  description: String,
   destination: {
    type: Schema.Types.ObjectId,
    ref: 'Destination',
    index: true
  },
  destinationTitle: {
    type: Schema.Types.ObjectId,
    ref: 'DestinationTitle',
    index: true
  },
  images: [{
    image: String,
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

schema.plugin(deepPopulate, {
  populate:{
    'destinationTitle':{
      select:'name _id'
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('DestinationContent', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,'destinationTitle','destinationTitle'));
var model = {

  getImages: function(data, callback) {
    DestinationContent.findOne({
      _id: data._id
    }).exec(function(err, found) {
      if (err) {
        // console.log(err);
        callback(err, null);
      } else {
        // console.log(found,"000");
        var data = {};
        data.results = found.images;
        if (found && found.images.length > 0) {
          callback(null, data);
        } else {
          callback(null, {
            message: "No Data Found"
          });
        }
      }

    })
  },


  getOneImages: function(data, callback) {
    DestinationContent.aggregate([{
      $unwind: "$images"
    }, {
      $match: {
        "images._id": objectid(data._id)
      }
    }, {
      $project: {
        "images.name": 1,
        "images.description": 1,
        "images.order": 1,
        "images.status": 1,
        "images.image":1,
        "images.descriptionTitle": 1,
        "images._id": 1
      }
    }]).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, found[0].images);
      }
    });
  },


  deleteImages: function(data, callback) {
    DestinationContent.update({
      "images._id": data._id
    }, {
      $pull: {
        "images": {
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


  saveImages: function(data, callback) {
    //  var product = data.product;
    //  console.log(product);
    console.log("dddddd", data);
    if (!data._id) {
      DestinationContent.update({
        _id: data.DestinationContent
      }, {
        $push: {
          images: data
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
      var attribute = "images.$.";
      _.forIn(data, function(value, key) {
        tobechanged[attribute + key] = value;
      });
      DestinationContent.update({
        "images._id": data._id
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
