module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

  saveHours:function(req,res){
    if(req.body){
      BranchHours.saveHours(req.body,res.callback);
    }
    else{
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getTime:function(req,res){
    if(req.body){
      BranchHours.getTime(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },

  deleteTime: function(req, res) {
if (req.body) {
if (req.body._id && req.body._id !== "") {
//	console.log("not valid");
BranchHours.deleteTime(req.body, function(err, respo) {
if (err) {
res.json({
value: false,
data: err
});
} else {
res.json({
value: true,
data: respo
});
}
});
} else {
res.json({
value: false,
data: "Invalid Id"
});
}
} else {
res.json({
value: false,
data: "Invalid call"
});
}
},
saveTime:function(req,res){
  if(req.body){
    BranchHours.saveTime(req.body,res.callback);
  }
  else{
    res.json({value:false,data:{message:"Invalid Request"}})
  }
},
getOneTime:function(req,res){
  if(req.body){
    BranchHours.getOneTime(req.body,res.callback);
  }
  else {
    res.json({value:false,data:{message:"Invalid Request"}})
  }
},





};
module.exports = _.assign(module.exports, controller);
