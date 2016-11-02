var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  name: {
    type: String,
    default: ""
  },
  thumbnail:String,
  destination: {
    type: Schema.Types.ObjectId,
    ref: 'Destination',
    index: true
  },
  status: {
    type: String,
    enum: ["true", "false"]
  }
});

schema.plugin(deepPopulate, {
  populate:{
    'destination':{
      select:'name _id'
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('DestinationTitle', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,'destination','destination'));
var model = {};
module.exports = _.assign(module.exports, exports, model);
