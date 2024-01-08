const router = require("express").Router();
const User = require("../../../models/users");

router.get('/:id', (req, res) => {
    res.render('auth/userPreference', {})
});

// router.post('/', async(req, res) => {
//     const {uuid} = req.user;
//     let user = await User.findOne({uuid: uuid});
//     const newsCategory = Object.values(req.body);
//     console.log(newsCategory);
//     user.newsCategory = newsCategory;
//     console.log(user);
//     res.redirect('/');
// })


module.exports = router