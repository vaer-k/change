var paypal = require('paypal-rest-sdk');
var config = {};

/*
 * GET home page
 */

 exports.index = function(req, res){
   res.render('index', { title: 'Express'});
 };


/*
 * SDK configuration
 */

 var testPayment = {
   "intent": "sale",
   "payer": {
     "payment_method": "paypal"
   },
   "redirect_urls": {
     "return_url": "http://localhost:3000/execute",
     "cancel_url": "http://localhost:3000/cancel"
   },
   "transactions": [{
     "amount": {
       "total": "5.00",
       "currency": "USD"
     },
     "description": "My awesome payment"
   }]
 };

exports.init = function(c){
  config = c;
  paypal.configure(c.api);
};

exports.create = function(req, res){
  var payment = testPayment;
  paypal.payment.create(payment, function (error, payment){
    if (error) {
      console.log(error);
    } else {
      if(payment.payer.payment_method === 'paypal') {
        req.session.paymentId = payment.id;
        var redirectUrl;
        for(var i=0; i < payment.links.length; i++) {
          var link = payment.links[i];
          if (link.method === 'REDIRECT') {
            redirectUrl = link.href;
          }
        }
        res.redirect(redirectUrl);
      }
    }
  });
};

exports.execute = function(req, res){
  var paymentId = req.session.paymentId;
  var payerId = req.param('PayerID');

  var details = { 'payer_id': payerId };
  paypal.payment.execute(paymentId, details, function(error, payment) {
    if (error){
      console.log(error);
    } else {
      res.send('Hell yeah!');
    }
  });
};


