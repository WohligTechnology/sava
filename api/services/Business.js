var schema = new Schema({
    User:{
        type:Schema.Types.ObjectId,
        ref:"PersonalDetails"
    },
    name:String,
    address:String,
    number:String,
    buisnessType:String,
    regAuthority:String,
    VAT:String,
    branches:Number
});

schema.plugin(deepPopulate, { 
    populate:{
    'User':{
      select:'name _id'
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Business', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,'User','User'));
var model = {};
module.exports = _.assign(module.exports, exports, model);
