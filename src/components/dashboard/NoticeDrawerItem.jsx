import React from 'react';
import styled from 'styled-components';

const NoticeDrawerItem = styled.div`
  display: flex;
  margin-top: 0.5rem;
  padding: 0.5rem;
  .left-side {
    padding: 10px;
    display: flex;
    flex: 2;
    flex-direction: column;
    .avatar-container {
      display: flex;
      flex-direction: row;
      margin: 0.5rem;
      flex: 2;
      align-items: center;
      font-weight: 600;
    }
    .textTitle-container {
      margin-left: 15px;
      font-weight: 750;
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
    .textContent-container {
      margin-left: 15px;
      margin-bottom: 10px;
      color: gray;
    }
    .textDate-container {
      margin-left: 15px;
      color: rgb(107, 104, 104);
    }
  }
  .right-side {
    display: flex;
    align-items: center;
    flex: 1;
  }
`;

export default React.memo(NoticeDrawerItem);
