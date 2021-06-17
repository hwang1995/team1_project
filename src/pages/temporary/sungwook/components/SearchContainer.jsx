import styled from 'styled-components';

const SearchContainer = styled.div`
  padding: 1rem;

  h2 {
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-weight: 300;
    margin-bottom: 0.5rem;
  }

  .button-area {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .count-container {
      display: flex;
      align-items: center;

      .text-area {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        font-weight: 700;
      }
    }

    .margin-button {
      margin-left: 1rem;
    }
  }
`;

export default SearchContainer;
