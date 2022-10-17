var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.session.redirectTo = req.originalUrl;
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
}

middlewareObj.checkBlogOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
        res.redirect("back");
      } else {
        if(foundBlog.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back")
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

middlewareObj.isAdmin = function(req, res, next){
  if(req.isAuthenticated()){
    if(req.user.admin === true){
      next();
    } else {
      res.redirect("back")
    }
  } else {
    res.redirect("/login")
  }
}


middlewareObj.isSuper = function(req, res, next){
  if(req.isAuthenticated()){
    if(req.user.super === true){
      next();
    } else {
      res.redirect("back")
    }
  } else {
    res.redirect("/login")
  }
}

module.exports = middlewareObj
