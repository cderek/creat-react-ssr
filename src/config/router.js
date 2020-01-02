import React from 'react';
import { Route } from 'react-router-dom';

import Stories from '../views/Stories/index';
import StoryDetail from '../views/StoryDetail/index';

export default () => [
  <Route path="/" component={Stories} />,
  <Route path="/detail" component={StoryDetail} />,
];
