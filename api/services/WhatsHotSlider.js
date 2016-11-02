var objectid = require("mongodb").ObjectId;
var schema = new Schema({
    banner: {
        type: String,
        default: ""
    },
    mobileBanner: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    },
    order: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["true", "false"]
    }
  });

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('WhatsHotSlider', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
