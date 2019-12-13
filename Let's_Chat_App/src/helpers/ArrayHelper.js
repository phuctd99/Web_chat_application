const mergeContactsAndGroups = (users, groups) => {
  let i = 0, j = 0, n = users.length, m = groups.length;
  let result = [];
  for(i, j; i<n && j<m;){
    if (!users[i].latestMessage.createdAt){
      result.push(groups[j]);
      j++;
    }else if (!groups[j].latestMessage.createdAt){
      result.push(users[i]);
      i++;
    }else if (users[i].latestMessage.createdAt > groups[j].latestMessage.createdAt){
      result.push(users[i]);
      i++;
    }else if (users[i].latestMessage.createdAt <= groups[j].latestMessage.createdAt){
      result.push(groups[j]);
      j++;
    }
  }
  if (i < n){
    for(i; i < n; i++){
      result.push(users[i]);
    }
  }else if (j < m){
    for(j; j < m; j++){
      result.push(groups[j]);
    }
  }
  return result;
};

module.exports = {
  mergeContactsAndGroups: mergeContactsAndGroups
}
