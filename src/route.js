import React from 'react'
import {Route} from 'react-router'

import ZiltagMapPage from './page/ZiltagMapPage'
import ZiltagPage from './page/ZiltagPage'
import ReaderPage from './page/ReaderPage'


export default (
	<Route path='/'>
    <Route path='/ziltag_maps/:id' component={ZiltagMapPage}/>
    <Route path='/ziltags/:id' component={ZiltagPage}/>
    <Route path='/reader' component={ReaderPage}/>
  </Route>
)
