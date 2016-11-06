var schema = new Schema({
  name:String,
  buisnessProgramme:{
    type:String,
    enum:["Single","Coalition"]
  },
  toIssue:{
    type:String,
    enum:["Points","Stamps"]
  },
  total:Number
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Loyalty', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
