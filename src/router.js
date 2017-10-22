import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Bundle from './components/shared/Bundle'

const router = () => {
  return <Router>
    <Switch>
      <Route path='/' exact render={() => {
        return <Bundle load={() => import('./views/Home')}>
          {Home => <Home></Home>}
        </Bundle>
      }} />
      <Route render={() => {
        return <Bundle load={() => import('./views/NoRouter')}>
          {NoRouter => <NoRouter></NoRouter>}
        </Bundle>
      }} />
    </Switch>
  </Router>
}

export default router