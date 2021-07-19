import React from 'react';
import { css } from 'styled-components';
import BeatLoader from 'react-spinners/SyncLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #ffa8a8;
`;

const BeatSpinner = ({ isLoading }) => (
  <div style={{ width: '100%', display: 'flex' }}>
    <BeatLoader color="#ffa8a8" loading={isLoading} css={override} size={30} />
  </div>
);

export default BeatSpinner;
