var schema = new Schema({
  offerType:String,
   loyaltyProgramName: {
    type: Schema.Types.ObjectId,
    ref: 'Loyalty',
    index: true
  },
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
    name:{
    type:String
  }
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
  mostVisitedBranch:{
    type: Schema.Types.ObjectId,
    ref: 'BranchRegistration',
    index: true
  },
  threeMonth:Number,
  city:String,
  headline:String,
  offerInfo:String,
  keyheadline:String,
  termsAndConditions:String
});

schema.plugin(deepPopulate, {
  populate:{
    'loyaltyProgramName':{
      select:"_id name"
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Offer', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,'loyaltyProgramName','loyaltyProgramName'));
var model = {};
module.exports = _.assign(module.exports, exports, model);
