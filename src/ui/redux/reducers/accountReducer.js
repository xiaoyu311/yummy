let defaultAccountState = {
  isAuthenticated:false,
  currentUser:''
}
export default function accountReducer(state = defaultAccountState, actions){
  switch (actions.type) {
    case 'SIGN_UP':
      return {...state, isAuthenticated:true, currentUser:actions.username}
    case 'LOG_OUT':
      return {...state, isAuthenticated:false, currentUser:''}
    default:
      return state
  }
}
