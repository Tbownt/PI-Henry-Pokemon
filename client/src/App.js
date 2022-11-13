import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home'
import './App.css'
import CardDetail from './components/CardDetail/CardDetail';
import CreateForm from './components/CreateForm/CreateForm';
import Error from './components/Error/Error';

const App = () => {
  
  return (
    <BrowserRouter>
    <div className='App'>
      <Switch>
        <Route exact path={'/'} component={Landing}/>
        <Route exact path={'/home'} component={Home}/>
        <Route exact path={'/pokemons/:id'} component={CardDetail}/>
        <Route exact path={'/pokemon/'} component={CardDetail}/>
        <Route exact path={'/create'} component={CreateForm}/>
        <Route exact path={'*'} component={Error}/> 
      </Switch>
    </div>
    </BrowserRouter>
  )
}

export default App