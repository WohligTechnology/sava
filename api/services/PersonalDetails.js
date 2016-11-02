var schema = new Schema({
  image:{
    type:String
  },
    title:{
      type:String,
      enum:["Mr","Mrs","Ms"]
    },
    firstName :{
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
    buisnessName:{
      type:String,
      unique:true
    },
    buisnessAddress:{
      type:String
    },
    mobile:{
      type:String,
      unique:true
    },
    buisnessType:{
      type: Schema.Types.ObjectId,
      ref:"Category"
    },
    registrationAuthority:{
      type:String
    },
    vatRegistrationNumber:{
      type:String
    },
    numberOfBranches:{
      type:Number
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('PersonalDetails', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
