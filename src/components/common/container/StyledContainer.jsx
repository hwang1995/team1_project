import styled from 'styled-components';
import Container from '@material-ui/core/Container';

const StyledContainer = styled(Container)`
  width: 100%;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 12px;
  padding: ${({ padding }) => {
    return padding + 'rem';
  }};
`;

StyledContainer.defaultProps = {
  bgColor: 'white',
  padding: '1',
};

export default StyledContainer;
