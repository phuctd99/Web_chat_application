import { group } from '../services/index';

const createGroup = async (req, res) => {
  const members = req.body.members;
  if (members.length < 3) {
    return res.json({
      status: 'error',
      message: 'Nhóm phải có ít nhất 3 thành viên'
    });
  }
  const groupInfo = {
    name: req.body.name,
    userAmount: members.length,
    userId: req.body.userId,
    members: members
  }
  const result = await group.createGroup(groupInfo);
  if (result) {
    res.redirect('/');
  } else {
    return res.json({
      status: 'error',
      message: 'Có lỗi khi tạo nhóm, vui lòng thử lại'
    });
  }
};

const addMember = async (req, res) => {
  const groupId = req.body.groupId;
  const userId = req.body.userId;
  const result = await group.addMember(groupId, userId);
  if (result) {
    return res.json({
      status: 'success',
    });
  } else {
    return res.json({
      status: 'error',
      message: 'Lỗi'
    });
  }
};

const kickMember = async (req, res) => {
  const groupId = req.body.groupId;
  const userId = req.body.userId;
  const result = await group.kickMember(groupId, userId);
  if (result) {
    return res.json({
      status: 'success',
    });
  } else {
    return res.json({
      status: 'error',
      message: 'Lỗi'
    });
  }
};

module.exports = {
  createGroup: createGroup,
  addMember : addMember,
  kickMember: kickMember
};
