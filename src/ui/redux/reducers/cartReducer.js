let cart = []

export default function cartReducer(state = cart, actions){
  switch (actions.type) {
    case 'ADD_CART':
      return [...state, actions.cart]
    case 'ADD_NUM':
      let numAdd = state.map( item => {
        if (item.id === actions.id) {
          item.num = item.num + 1
        }
        return item
      })
      return numAdd
    case 'SUB_NUM':
      let numSub = state.map( item => {
        if (item.id === actions.id) {
          item.num = item.num - 1
        }
        return item
      })
      return numSub
    default:
      return state
  }
}
