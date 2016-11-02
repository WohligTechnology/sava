var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  name: String,
  email: String,
  mobile: String,
  groupSize: Number,
  myCart: [{
    type: {
      type: String,
      enum: ["Package", "Activities"]
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      index: true
    },
    activities: {
      type: Schema.Types.ObjectId,
      ref: 'Activities',
      index: true
    }
  }]
});

schema.plugin(deepPopulate, {
  populate: {
    'myCart.package': '_id image name'
  },
  populate: {
    'myCart.activities': '_id image1 name'
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Cart', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "myCart.package myCart.activities", "myCart.package myCart.activities"));
var model = {
  getMyCart: function(data, callback) {
    Cart.findOne({
      _id: data._id
    }).populate("myCart.activities",'_id image1 name').populate("myCart.package",'_id image name').exec(function(err, found) {
      if (err) {
        // console.log(err);
        callback(err, null);
      } else {
        console.log(found.myCart, "000");
        var data = {};
        data.results = found.myCart;
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

  saveCart: function(data, callback) {
    var mycartdata = this(data);
    mycartdata.save(function(err, respo) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, respo);
      }
    });
  },


};
module.exports = _.assign(module.exports, exports, model);
