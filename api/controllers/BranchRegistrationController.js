module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getHours:function(req,res){
    if(req.body){
      BranchRegistration.getHours(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getTime:function(req,res){
    if(req.body){
      BranchRegistration.getTime(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  addTime:function(req,res){
    if(req.body){
      BranchRegistration.addTime(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  updateTime:function(req,res){
    if(req.body){
      BranchRegistration.updateTime(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getOneHours:function(req,res){
    if(req.body){
      BranchRegistration.getOneHours(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getOneTime:function(req,res){
    if(req.body){
      BranchRegistration.getOneTime(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  deleteHours: function(req, res) {
if (req.body) {
if (req.body._id && req.body._id !== "") {
//	console.log("not valid");
BranchRegistration.deleteHours(req.body, function(err, respo) {
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

deleteTime: function(req, res) {
if (req.body) {
if (req.body._id && req.body._id !== "") {
//	console.log("not valid");
BranchRegistration.deleteTime(req.body, function(err, respo) {
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

saveHours:function(req,res){
  if(req.body){
    BranchRegistration.saveHours(req.body,res.callback);
  }
  else{
    res.json({value:false,data:{message:"Invalid Request"}})
  }
},
saveTime:function(req,res){
  if(req.body){
    BranchRegistration.saveTime(req.body,res.callback);
  }
  else{
    res.json({value:false,data:{message:"Invalid Request"}})
  }
}

};
module.exports = _.assign(module.exports, controller);
