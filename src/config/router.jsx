import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Stories from '../views/Stories/index'
import StoryDetail from '../views/StoryDetail/index'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact />,
  <Route path="/list" component={Stories} />,
  <Route path="/detail" component={StoryDetail} />,
]
