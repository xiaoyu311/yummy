import { combineReducers } from 'redux'
import account from './accountReducer'
import cart from './cartReducer'
import appReducer from './appReducer'
import dish from './dishReducer'
import total from './total'
import avatar from './avatarReducer'
import rechart from './rechartReducer'
import edit from './EditReducer'
import users from './usersReducer'
import comments from './commentsReducer'


const rootReducer = combineReducers({
  account,
  appReducer,
  dish,
  cart,
  total,
  avatar,
  rechart,
  edit,
  users,
  comments
})
export default rootReducer
