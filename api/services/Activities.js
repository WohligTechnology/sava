var schema = new Schema({
  order: {
      type: Number
  },
  typeCart: {
      type: String,
      default: "Activities"
  },
    name: {
        type: String,
        default: ""
    },
    description:{
      type:String,
      default:""
    },
    image1:{
        type: String,
        default: ""
    },
    image2:{
        type: String,
        default: ""
    },
    image3:{
        type: String,
        default: ""
    },
    type:{
      type:String,
      enum:["day","night"]
    },
    destination: {
        type: Schema.Types.ObjectId,
        ref: 'Destination',
        index: true
    },
    isSlider: {
        type: String,
        enum:["Yes","No"]
    },
    status: {
        type: String,
        enum:["true","false"]
    },
    popular: {
      type: String,
      enum: ["None","Popular Attraction"]
    }
});

schema.plugin(deepPopulate, {
  populate: {
      'destination': {
          select: 'name _id'
      }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Activities', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,'destination','destination'));
var model = {};
module.exports = _.assign(module.exports, exports, model);
