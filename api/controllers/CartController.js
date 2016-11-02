module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getMyCart: function(req, res) {
    if (req.body) {
      Cart.getMyCart(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      })
    }
  },

  addToCart: function(req, res) {
    if (req.body) {
      if (req.session.user) {

      } else {
        console.log("Not logged", req.session.cart);
        newcart = [];
        if (req.session.cart && req.session.cart.length > 0) {
          req.session.cart.push(req.body);
        } else {
          req.session.cart = [];
          req.session.cart.push(req.body);
        }

        res.json({
          value: true,
          data: req.session.cart,
          message: "Offline cart"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  saveCart: function(req, res) {
    if (req.body) {
      console.log("aaaa", req.session.cart);
      req.body.myCart = req.session.cart;
      Cart.saveCart(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getCart: function(req, res) {
    if (req.body) {
      if (req.session.user) {

      } else {
        res.json({
          value: true,
          data: req.session.cart
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

};
module.exports = _.assign(module.exports, controller);
