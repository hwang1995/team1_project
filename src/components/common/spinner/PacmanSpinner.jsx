import React from 'react';
import { css } from 'styled-components';
import PacmanLoader from 'react-spinners/PacmanLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: lightblue;
`;

const PacmanSpinner = ({ isLoading }) => (
  <div style={{ width: '100%', display: 'flex' }}>
    <PacmanLoader
      color="lightblue"
      loading={isLoading}
      css={override}
      size={30}
    />
  </div>
);

export default PacmanSpinner;
