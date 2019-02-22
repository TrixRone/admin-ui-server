// app.get("/create", function(req, res) {
//     res.render("create");
// });

// app.post("/create", function(req, res) {
//     const {title, body} = req.body;
//     Post.create({
//         title: title,
//         body: body
//     }).then(post => console.log(post.id));
//     res.redirect("/");
// });
// app.get("/create", function(req, res) {
//     res.render("create");
// });

// app.post("/create", function(req, res) {
//     const {title, body} = req.body;
//     Post.create({
//         title: title,
//         body: body
//     }).then(post => console.log(post.id));
//     res.redirect("/");
// });
/*if (!result) {
   console.log(result);
     res.sendStatus(400);
 } else {
     res.json({
         success: true,
         message: 'login'
     });
     req.session.user = username;
     req.session.save();
 }*/



/*
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});*/
/*function  comparePassword (candidatePassword, hashedPassword , cb) {
  bcrypt.compare(candidatePassword, hashedPassword, function
    (err, isMatch) {
    if (err) {
      return console.log(err);
    }
    return console.log(isMatch);
  });
};
function hashPassword (candidatePassword) {
  bcrypt.genSalt(11, function (err, salt) {
    if (err){
      return console.log(err);
    }
    bcrypt.hash(candidatePassword ,salt, function
      (err, hashedPassword) {
          if (err) {
            return console.log(err);
          }

          console.log(hashedPassword);

    });
  });
}*/

// hashPassword('password');
