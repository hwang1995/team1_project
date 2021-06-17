import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import LoginButton from './LoginButton';
import Profile from './Profile';

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;

  max-height: 70px;
  /* background-color: aliceblue; */

  .left-side {
    flex: 1;
    min-width: 150px;
    display: flex;
    padding: 0.2rem;
    justify-content: center;
    align-items: center;
  }

  .right-side {
    flex: 7;
    display: flex;
    padding: 0.2rem;
    justify-content: flex-end;
    align-items: center;

    .button-margin {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
`;

const profileInfo1 = {
  url: '/assets/image/doge.png',
  name: 'Doge',
  role: 'Techno King',
};

const profileInfo2 = {
  url: '/assets/image/avatar.png',
  name: 'Karina',
  role: 'Music Doctor',
};

const PageHeader = () => {
  const [isLogined, setLogined] = useState(false);

  const handleLoginBtn = () => {
    setLogined((prevState) => !prevState);
  };
  return (
    <PageContainer>
      <div className="left-side">
        <img src="/assets/image/logo.png" alt="Logo" width="100%" />
      </div>
      <div className="right-side">
        {/* <Profile data={profileInfo1} /> */}
        <Profile data={profileInfo2} />
        {/* <Avatar className="button-margin" src="/assets/image/doge.png" />
        <Avatar src="/assets/image/avatar.png" /> */}
        <LoginButton
          className="button-margin"
          isLogined={isLogined}
          onClick={handleLoginBtn}
        >
          {isLogined ? 'Logout' : 'Login'}
        </LoginButton>
      </div>
    </PageContainer>
  );
};

export default PageHeader;
