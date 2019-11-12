let getHome = (req, res) => {
    return res.render('test', {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

module.exports = {
    getHome: getHome
};
  