var schema = new Schema({
    email:{
      type: String,
      validate: validators.isEmail(),
      unique: true
    },
    image:String,
    password:String,
    title:{
      type:String,
      enum:["Mr","Mrs","Ms"]
    },
    name :{
      type:String
    },
    lastName :{
      type:String
    },
    dob:{
      type:Date
    },
    address1:String,
    address2:String,
    town:String,
    city:String,
    pincode:Number,
    country:String,
    lat:String,
    lng:String,
    question:String,
    answer:String,
    facebookID: String,
    googleID: String,
    otp: String
});

schema.plugin(deepPopulate, {
  
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('PersonalDetails', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
