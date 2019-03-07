const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

exports.validateSignup = (req, res , next) => {
   req.sanitizeBody('name')
   req.sanitizeBody('email')
   req.sanitizeBody('password')

   // Name is non-null and is 4 to 10 characters
   req.checkBody('name', 'یک نام وارد کنید').notEmpty();
   req.checkBody('name', 'نام باید بین 4 تا 10 کاراکتر باشد').isLength({ min:4, max:10})

   // Email is non-null, valid, and normalized
   req.checkBody('email', 'یک ایمیل معتبر وارد کنید').isEmail().normalizeEmail()

   // Password must be non-null, between 4 and 10 characters
   req.checkBody('password', 'یک پسورد وارد  کنید').notEmpty();
   req.checkBody('password', 'پسورد باید بین 4 تا 10 کاراکتر باشد').isLength({ min:4, max:10})

   const errors = req.validationErrors();
   if(errors) {
      const firstError = errors.map(error => error.msg)[0];
      return res.status(400).send(firstError);
   }
   next(); 


};

exports.signup = async (req, res) => {
   const {name, email, password} = req.body;

   const user= await new User({name, email, password})
   await User.register(user, password, (err, user) => {
      if(err) {
         return res.status(500).send(err.message);
      }
      res.json(user.name);
   })

    
};

exports.signin = (req, res, next) => {
   passport.authenticate('local',(err, user, info) => {
      if(err) {
         return res.status(500).json(err.message)
      }
      if(!user) {
         return res.status(500).json(info.message)
      }
      req.logIn(user, err => {
         if(err) {
            return res.status(500).json(err.message)
         }

         res.json(user);
      });
   })(req, res, next);
};

exports.signout = (req, res) => {
   res.clearCookie("next-cookie.sid")
   req.logout()
   res.json({ message: "شما اکنون خارج شده اید!"});
};

exports.checkAuth = (req, res, next) => {
   if (req.isAuthenticated()) {
      return next();
   }

   res.redirect('/signin');
};
