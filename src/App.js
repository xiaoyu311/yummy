import React, { Component } from 'react'
import './App.css'
import Home from './ui/pages/Home/Home'
import Signup from './ui/pages/Signup/Signup'
import Login from './ui/pages/Login/Login'
import Sidebar from './ui/shared/Sidebar/Sidebar'
import Dashboard from './ui/pages/Dashboard/Dashboard'
import Cart from './ui/pages/Cart/Cart'
import Profile from './ui/pages/Profile/Profile'
import DishId from './ui/pages/DishId/DishId'
import Dishes from './ui/pages/Dishes/Dishes'
import UserPage from './ui/pages/UserPage/UserPage'
import AlertBox from './ui/shared/AlertBox/AlertBox'
import store from './ui/redux/store'
import { Provider } from 'react-redux'
import axios from 'axios'
import settings from './settings'



import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

class App extends Component {
  componentDidMount(){
    let userId = localStorage.getItem('userId')
    if (userId) {
      axios.get(`${settings.host}/user/${userId}`)
        .then( res =>{
          store.dispatch({type:'SIGN_UP',username:res.data.user.username})
        })
      axios.get(`${settings.host}/users`)
      .then( res => {
        store.dispatch({type:'ADD_USERS', users:res.data.users})
        if (res.data.users[userId].slogan) {
          store.dispatch({type:'EDIT', edit:res.data.users[userId].slogan})
        }else{
          return
        }
        if (res.data.users[userId].avatar) {
          store.dispatch({type:'LOAD_AVATAR', avatar:`${settings.host}/uploads/avatars/${res.data.users[userId].avatar}`})
        }else{
          return
        }
      })
    }
    axios.get(`${settings.host}/dishes`)
      .then( res =>{
        let { dishes } = res.data
        store.dispatch({type:'LOAD_DISHES', dishes})
      })
      .catch( err =>console.log(err))
    axios.get(`${settings.host}/comments`).then(
      res => {
        const { comments } = res.data
        store.dispatch({ type: 'LOAD_COMMENTS', comments })
      }
    )
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <AlertBox />
          <Router>
            <div>
              <Route render={({ location }) => {
                return location.pathname !== '/' ?
                (<Sidebar />) : null
              }} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/login"  component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/dish/:id" component={DishId} />
                <Route path="/dishes" component={Dishes} />
                <Route path="/cart" component={Cart} />
                <Route path="/profile" component={Profile} />
                <Route path="/user/:username" component={UserPage} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App

//HashRouter
