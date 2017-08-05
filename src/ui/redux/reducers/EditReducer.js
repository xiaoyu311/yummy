let Edit = '编辑个性签名'

export default function EditReducer(state = Edit, actions){
  switch (actions.type) {
    case 'EDIT':
      return actions.edit
    default:
      return state
  }
}
