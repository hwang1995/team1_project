import React from 'react';
import { css } from 'styled-components';
import SyncLoader from 'react-spinners/SyncLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #ffa8a8;
`;

const SyncSpinner = ({ isLoading }) => (
  <div style={{ width: '100%', display: 'flex' }}>
    <SyncLoader color="#ffa8a8" loading={isLoading} css={override} size={30} />
  </div>
);

export default SyncSpinner;
