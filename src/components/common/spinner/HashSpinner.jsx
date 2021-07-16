import React from 'react';
import { css } from 'styled-components';
import HashLoader from 'react-spinners/HashLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #364fc7;
`;

const HashSpinner = ({ isLoading }) => (
  <div style={{ width: '100%' }}>
    <HashLoader color="#364fc7" loading={isLoading} css={override} size={100} />
  </div>
);

export default HashSpinner;
