import React from 'React'
import Route from 'react-router'

import ZiltagMapPage from './page/ZiltagMapPage'
import ZiltagPage from './page/ZiltagPage'


export default (
	<Route path='/'>
	  <Route path='/ziltag_maps/:id' component={ZiltagMapPage}>
	  </Route>
	  <Route path='/ziltags/:id' component={ZiltagPage}>
	  </Route>
  </Route>
)
