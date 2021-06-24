import React from 'react';
import styled from 'styled-components';

const NoticeDrawerItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  .left-side {
    padding: 10px;
    flex: 2;
    .avatar-container {
      display: flex;
      margin: 0.5rem;
      flex: 2;
      align-items: center;
      font-weight: 600;
    }
    .textTitle-container {
      display: flex;
      margin-left: 15px;
      font-weight: 750;
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
    .textContent-container {
      display: flex;
      margin-left: 15px;
      margin-bottom: 10px;
      color: gray;
    }
    .textDate-container {
      display: flex;
      margin-left: 15px;
      color: rgb(107, 104, 104);
    }
  }
  .right-side {
    align-items: center;
    
    flex: 1;
  }
`;

export default React.memo(NoticeDrawerItem);
