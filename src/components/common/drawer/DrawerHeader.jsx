import styled from 'styled-components';

/**
 * Drawer의 헤더를 설정하기 위한 컴포넌트
 * @author SUNG WOOK HWANG
 */
const DrawerHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  margin: 20px 0 20px 0;
  /* min-width: 320px; */
  /* width: ${({ breakpoint }) => {
    const breakpointsWithWidth = {
      xs: '100%',
      sm: '100%',
      md: '600',
      lg: '912px',
      xl: '912px',
    };
    return breakpointsWithWidth[breakpoint];
  }}; */

  h1 {
    flex: 4;
    font-weight: 900;
  }
  div {
    flex: 1;
    text-align: right;
  }
`;

DrawerHeader.defaultProps = {
  breakpoint: 'xs',
};

export default DrawerHeader;
