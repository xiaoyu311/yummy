let avatar = 'https://github.com/xiaoyu311/yummy-images/blob/master/default-avatar.png?raw=true'


export default function avatarReducer (state = avatar, actions){
  switch (actions.type) {
    case 'LOAD_AVATAR':
      return actions.avatar
    default:
      return state
  }
}
