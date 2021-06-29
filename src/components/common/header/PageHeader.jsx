import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import LoginButton from '../button/LoginButton';
import Profile from '../profile/Profile';

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

const profileInfo3 = {
  url: '/assets/image/nailon.png',
  name: 'Elon Musk',
  role: 'Techno King',
};

const PageHeader = () => {
  const [isLogined, setLogined] = useState(false);

  const handleLoginBtn = useCallback(() => {
    setLogined((prevState) => !prevState);
  }, []);

  return (
    <PageContainer>
      <div className="left-side">
        <img src="/assets/image/logo_2.png" alt="Logo" width="100%" />
      </div>
      <div className="right-side">
        {/* <Profile data={profileInfo1} /> */}
        {isLogined ? <Profile data={profileInfo3} /> : ''}

        {/* <Avatar className="button-margin" src="/assets/image/doge.png" />
        <Avatar src="/assets/image/avatar.png" /> */}
        <LoginButton
          className="button-margin"
          islogined={isLogined.toString()}
          onClick={handleLoginBtn}
        >
          {isLogined ? 'Logout' : 'Login'}
        </LoginButton>
      </div>
    </PageContainer>
  );
};

export default PageHeader;
