import User from '../models/User';

let dashboard = async (req, res) => {
  try {
      let user = await User.find().select('-local.password');
      return res.render('adminDashboard/master',{
         users: user
      });
  } catch (error) {
      res.status(500).send(error);
  }
};

let blockAccount =  async (req, res) => {
  try {
      let id = req.body.id;
      let user = await User.findOneAndUpdate({_id:id},{'local.isActive': false});
      user.save();
      return res.redirect('/get-user');
  } catch (error) {
      res.status(500).send(error);
  }
};

let unblockAccount = async (req, res) => {
  try {
      let id = req.body.id;
      let user = await User.findOneAndUpdate({_id:id},{'local.isActive': true});
      user.save();
      return res.redirect('/get-user')
  } catch (error) {
      res.status(500).send(error);
  }
};

let checkIsAdmin = async (req, res, next) => {
  try {
    if(req.user.role !== 'admin')
    {
      return res.redirect('/');
    }
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  dashboard: dashboard,
  blockAccount: blockAccount,
  unblockAccount: unblockAccount,
  checkIsAdmin: checkIsAdmin
}