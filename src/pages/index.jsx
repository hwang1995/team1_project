import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './dashboard';
import ErrorPage from './ErrorPage';
// import { Switch, Route, Router } from 'react-router-dom';
import MainPage from './main';
import TemporaryPage from './temporary';

/**
 * Pages 컴포넌트는 페이지 주소를 라우팅 하기 위해
 * 사용되는 컴포넌트 입니다.
 *
 * 작성자 : SUNG WOOK HWANG
 * @returns {JSX.Element}
 */
const Pages = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/temporary" component={TemporaryPage} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Fragment>
  );
};

export default Pages;
