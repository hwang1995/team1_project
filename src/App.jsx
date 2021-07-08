import React, { Fragment } from 'react';

import GlobalStyle from './components/common/GlobalStyles';
import Pages from './pages/index';
/**
 * 추가해야 하는 내용은 App.jsx에
 * 1. axios.defaults.headers.common['authToken'] 을 설정한다.
 * 2. 매번 sessionStorage에 authToken과 userInfo가 있는지 점검하고, 있다면 Redux store에 저장시켜서 글로벌로 사용할 수 있게 한다.
 *
 * @returns
 */
const App = () => (
  <Fragment>
    <GlobalStyle />
    <Pages />
  </Fragment>
);

export default App;
