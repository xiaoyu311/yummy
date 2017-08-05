let avatar = 'http://media.haoduoshipin.com/yummy/default-avatar.png'


export default function avatarReducer (state = avatar, actions){
  switch (actions.type) {
    case 'LOAD_AVATAR':
      return actions.avatar
    default:
      return state
  }
}
