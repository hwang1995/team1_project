import styled from 'styled-components';

const Sidebar = styled.div`
  display: flex;

  flex-direction: column;
  padding: 1.3rem;
  height: 100vh;
  background-color: #023047;
  color: white;

  .info-container {
    display: flex;
    flex-direction: column;

    p {
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      font-weight: 800;
      color: white;
    }

    p:nth-child(2) {
      font-weight: 300;
    }
  }

  .collapse-container {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 0.5rem;

    span {
      display: flex;
      align-items: center;
      flex: 1;
      margin-left: 0.5rem;
      font-weight: 700;
    }
  }

  .collapsed-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 2.3rem;
    .collapsed-item {
      display: flex;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      align-items: center;
      span {
        margin-left: 1rem;
        font-weight: 500;
      }
    }
  }

  .MuiDivider-light {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: white;
  }
`;

export default Sidebar;
