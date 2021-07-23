import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * 색상이 포함된 정사각형 컴포넌트 (Atom)
 * 사용법
 * <ColorCircleContainer size={120} color="DIAGNOSTIC_PENDING"/>
 * <ColorCircleContainer size={120} color="#FFFFFF"/>
 * @author SUNG WOOK HWANG
 */
const ColorCircleContainer = styled.div`
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
  background-color: ${({ color }) => {
    if (color === 'DIAGNOSTIC_PENDING') {
      return '#F1BF4D';
    } else if (color === 'DIAGNOSTIC_REGISTER') {
      return '#E35E5C';
    } else if (color === 'DIAGNOSTIC_COMPLETED') {
      return '#488EF3';
    } else if (color === 'DIAGNOSTIC_PROCESSING' || color === 'EDTA') {
      return '#9761F6';
    } else if (color === 'Lithium Heparin') {
      return '#69db7c';
    } else if (color === 'Conical') {
      return '#ff922b';
    }
    return color;
  }};
  border-radius: 50%;

  & + & {
    margin-left: 0.5rem;
  }
`;

ColorCircleContainer.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

ColorCircleContainer.defaultProps = {
  size: 100,
  color: 'red',
};
export default ColorCircleContainer;
