import React, { Fragment } from 'react';
import GlobalStyle from './components/common/GlobalStyles';
import Pages from './pages/index';

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Pages />
    </Fragment>
  );
};

export default App;
