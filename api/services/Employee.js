var schema = new Schema({
    image:String,
    name:String,
    lastName:String,
    mobile:String,
    email:{
      type:String,
      validate:validators.isEmail()
    },
    employeeId:Number,
    role:String,
    business:{
      type:Schema.Types.ObjectId,
      ref:"Business",
      index : true
    },
    branch:{
      type:Schema.Types.ObjectId,
      ref:"BranchRegistration",
      index : true
    }
});

schema.plugin(deepPopulate, {
  populate:{
    'branch':{
      select:"_id name"
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Employee', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,'branch','branch'));
var model = {};
module.exports = _.assign(module.exports, exports, model);
