var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  cities:String,
  activities:String,
  size:Number,
  from:Date,
  to:Date,
  comment:String,
  name:String,
  phone:String,
  email:String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Enquire', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
