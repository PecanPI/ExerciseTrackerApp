const router = require('express').Router()
const User = require('../models/user-model')
const passport = require('passport')


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



router.route('/').get((req, res)=>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/register').post((req, res)=>{
   
    User.register({username: req.body.username,},req.body.password, (err, user)=>{
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/")
            })
        }
    })

    // const username = req.body.username;
    // const newUser = new User({username})
    // newUser.save()
    // .then(()=>res.json('User added!'))
    // .catch((err) => res.status(400).json('Error: ' + err))
});


router.route('/login')




module.exports = router;