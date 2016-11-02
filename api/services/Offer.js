var schema = new Schema({
  offerType:String,
  loyaltyProgramName:String,
  pointsStamps:String,
  basis:[String],
  forEvery:Number,
  minBillAmount:String,
  promoImage:String,
  addHeadlines:String,
  total:Number,
  real:Number,
  minSpendOf:Number,
  startFromDate:Date,
  startFromTime:Date,
  endToDate:Date,
  endToTime:Date,
  isRedemptionOffer:Boolean,
  costInPoints:Number,
  canBeUsed:Number,
  validOn:[{
    type:String,
    enum:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  }],
  location:String,
  ageGreaterThen:Number,
  ageLowerLimit:Number,
  ageUpperLimit:Number,
  minBalance:Number,
  lastActivity:Date,
  sex:{
    type:String,
    enum:["Male","Female","Other"]
  },
  lifeTimePoints:Number,
  birthdayFrom:Date,
  birthdayTo:Date,
  anniversary:[Date],
  childrenAgeFrom:Number,
  childrenAgeTo:Number,
  nationality:String,
  mostVisitedBranch:String,
  threeMonth:Number,
  city:String,
  headline:String,
  offerInfo:String,
  keyheadline:String,
  termsAndConditions:String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Offer', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
