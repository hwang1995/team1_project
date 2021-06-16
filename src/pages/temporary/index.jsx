import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import HyungyoonPage from './hyungyoon';
import JonghyunPage from './jonghyun';
import SihyunPage from './sihyun';
import SungwookPage from './sungwook';

const TemporaryPage = () => (
  <Fragment>
    <Switch>
      <Route path="/temporary/sihyun" exact component={SihyunPage} />
      <Route path="/temporary/hyungyoon" exact component={HyungyoonPage} />
      <Route path="/temporary/jonghyun" exact component={JonghyunPage} />
      <Route path="/temporary/sungwook" exact component={SungwookPage} />
    </Switch>
  </Fragment>
);

export default TemporaryPage;
