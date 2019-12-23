import { group } from '../services/index';

const getGroupById = async (req, res) => {
  const groupId = req.query.gid;
  const data = await group.getGroupAndMembersByGroupId(groupId);
  return res.json(data);
}

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
  const role = req.body.userRole;
  const result = await group.addMember(groupId, userId, role);
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

const authorizeGroupManager = async (req, res) => {
  const groupId = req.body.groupId;
  const userId = req.body.userId;
  const result = await group.authorizeGroupManager(groupId, userId);
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
}

const getFriendsNotInGroup = async (req, res) => {
  const groupId = req.query.gid;
  const userId = req.query.uid;
  const result = await group.getFriendsNotInGroup(groupId, userId);
  return res.json({
    result: result
  })
}

const changeGroupName = async (req, res) => {
  const newName = req.body.newName;
  const groupId = req.body.groupId;
  const result = await group.changeGroupName(groupId, newName);
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
  getGroupById: getGroupById,
  createGroup: createGroup,
  addMember : addMember,
  kickMember: kickMember,
  authorizeGroupManager: authorizeGroupManager,
  getFriendsNotInGroup: getFriendsNotInGroup,
  changeGroupName: changeGroupName
};
