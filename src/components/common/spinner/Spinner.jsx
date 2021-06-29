import React from 'react';
import { css } from 'styled-components';
import PuffLoader from 'react-spinners/PuffLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = ({ isLoading }) => (
  <div style={{ width: '100%' }}>
    <PuffLoader color="red" loading={isLoading} css={override} size={150} />
  </div>
);

export default Spinner;
