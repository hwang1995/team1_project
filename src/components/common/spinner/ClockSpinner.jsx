import React from 'react';
import { css } from 'styled-components';
import ClockLoader from 'react-spinners/ClockLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ClockSpinner = ({ isLoading }) => (
  <div style={{ width: '100%' }}>
    <ClockLoader color="red" loading={isLoading} css={override} size={80} />
  </div>
);

export default ClockSpinner;
