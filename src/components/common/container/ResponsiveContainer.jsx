import styled from 'styled-components';
import Container from '@material-ui/core/Container';

const ResponsiveContainer = styled(Container)`
  width: ${({ breakpoint }) => {
    const breakpointsWithWidth = {
      xs: '100vw',
      sm: '80vw',
      md: '600px',
      lg: '600px',
      xl: '960px',
    };

    return breakpointsWithWidth[breakpoint];
  }};
`;

ResponsiveContainer.defaultProps = {
  breakpoint: 'xs',
};

export default ResponsiveContainer;
