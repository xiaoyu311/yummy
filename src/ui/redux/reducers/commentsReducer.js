let comments = {}


export default function commentsReducer(state = comments, actions){
  switch (actions.type) {
    case 'LOAD_COMMENTS':
      return actions.comments
    default:
      return state
  }
}
