import styled from 'styled-components';
import PropTypes from 'prop-types';

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
