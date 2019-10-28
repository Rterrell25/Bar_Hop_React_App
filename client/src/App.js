import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import BarsList from './pages/BarsList'
import SingleBar from './pages/SingleBar'
import NavBar from './components/NavBar'

const App = () => (
  <BrowserRouter>
    <NavBar/>
    <Switch> 
      <Route exact path="/" component={Home}/>
      <Route exact path="/bars/:location" component={BarsList}/>
      <Route path="/bar/:id" component={SingleBar}/>
    </Switch>
  </BrowserRouter>
)

export default App
