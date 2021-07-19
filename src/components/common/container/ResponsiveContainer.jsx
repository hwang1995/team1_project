import styled from 'styled-components';
import Container from '@material-ui/core/Container';

/**
 * 해상도 조건에 맞게 (breakpoint) 컴포넌트의 폭을 조정하는 컴포넌트
 * <ResponsiveContainer breakpoint="md"/>
 * @author SUNG WOOK HWANG
 */
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
