import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Camera from '../Camera';

const Main = () => (
  <main className="main__wrapper">
    <Switch>
      <Route exact path='/scan' component={Camera}/>
    </Switch>
  </main>
);

export default Main;