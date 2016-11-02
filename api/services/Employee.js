var schema = new Schema({
  image:String,
    firstName:String,
    lastName:String,
    mobile:{
      type:Number,
      validate:validators.isNumeric()
    },
    email:{
      type:String,
      validate:validators.isEmail()
    },
    employeeId:Number,
    roles:{
      type:String,
      enum:["CEO","Principle","Manager","APM"]
    },
    role:{
      type:Schema.Types.ObjectId,
      ref:"BranchRegistration",
      index : true
    },
    branch:{
      type:Schema.Types.ObjectId,
      ref:"BranchRegistration",
      index : true
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Employee', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
