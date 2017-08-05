

export default function usersReducer(state = null, actions){
  switch (actions.type) {
    case 'ADD_USERS':
      return actions.users
    default:
      return state
  }
}
