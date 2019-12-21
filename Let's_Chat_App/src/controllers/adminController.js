import User from '../models/User';

let dashboard = async (req, res) => {
  try {
      let user = await User.find({_id: {$ne: req.user._id}}).select('-local.password');
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

let promoteAccount = async (req, res) => {
  try {
    let id = req.body.id;
    let user = await User.findOneAndUpdate({_id: id}, {role:'admin'})
    user.save();
    return res.redirect('/get-user');
  } catch (error) {
    res.status(500).send(error);
  }
};

let demoteAccount = async (req, res) => {
  try {
    let id = req.body.id;
    let user = await User.findOneAndUpdate({_id: id}, {role: 'user'})
    user.save();
    return res.redirect('/get-user');
  } catch (error) {
    res.status(500).send(error);
  }
};

let deleteAccount = async (req, res) => {
  try {
    let id = req.body.id;
    let user = await User.findOneAndDelete({_id: id});
    user.save();
    return res.redirect('/get-user');
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
  dashboard: dashboard,
  blockAccount: blockAccount,
  unblockAccount: unblockAccount,
  checkIsAdmin: checkIsAdmin,
  promoteAccount: promoteAccount,
  demoteAccount: demoteAccount,
  deleteAccount: deleteAccount,
}