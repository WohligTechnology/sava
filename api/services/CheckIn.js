var schema = new Schema({
    employee:{
      type:Schema.Types.ObjectId,
      ref:"Employee",
      index : true
    },
    branch:{
      type:Schema.Types.ObjectId,
      ref:"BranchRegistration",
      index : true
    },
    from:{
      type:Date,
      default:Date.now()
    },
    to:{
      type:Date,
      default:Date.now()
    },
    start:{
      type:Date,
      default:Date.now()
    },
    hoursWorked:{
      type:Number
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('CheckIn', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
