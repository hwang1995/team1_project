import React from 'react';
import ColoredButton from './components/ColoredButton';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  background-color: #6772e5;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
`;
const HyungyoonPage = () => {
  return (
    <div>
      <StyledButton size="large">hello world </StyledButton>
      <ColoredButton color="aliceblue">SI HYN</ColoredButton>
      <br />
      여기에 마음껏 내용을 작성하시면 됩니다. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Doloribus aliquam ipsum odit minus ratione,
      at in eum sequi ea facere recusandae explicabo illum doloremque culpa quam
      tempora quos, soluta cum.
    </div>
  );
};

export default HyungyoonPage;
