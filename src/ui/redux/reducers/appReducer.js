let defaultAppState = {
  showAlert:false,
  alertMsg:'默认'
}
export default function appReducer(state = defaultAppState, actions){
  switch (actions.type) {
    case 'HIDE_ALERT':
      return {...state, showAlert:false}
    case 'SHOW_ALERT':
      return {...state, showAlert:true, alertMsg:actions.alertMsg}
    default:
      return state
  }
}
