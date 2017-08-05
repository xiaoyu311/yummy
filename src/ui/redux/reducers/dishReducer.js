let dishes = {
  all:{}
}
export default function dishReducer(state = dishes, actions){
  switch (actions.type) {
    case 'LOAD_DISHES':
      return {...state, all:actions.dishes}
    default:
      return state
  }
}
