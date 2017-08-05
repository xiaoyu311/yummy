let total = 0


export default function totalReducer(state = total, actions){
  switch (actions.type) {
    case 'TOTAL':
      return actions.num
    default:
      return state
  }
}
