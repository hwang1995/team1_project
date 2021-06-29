import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const StyledTypography = styled(Typography)`
  font-weight: ${({ weight }) => {
    const fontWeight = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (weight < 1) {
      return 500;
    }
    return fontWeight[weight - 1] * 100;
  }};
  color: ${({ color }) => color};
`;

StyledTypography.defaultProps = {
  weight: 1,
  color: 'initial',
};

export default StyledTypography;
