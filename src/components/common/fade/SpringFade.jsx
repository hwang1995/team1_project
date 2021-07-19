import React, { forwardRef } from 'react';
import { useSpring, animated } from 'react-spring/dist/react-spring.cjs';

/**
 * React-spring을 이용하여 페이지 컴포넌트가 렌더링 되었을 때에
 * duration (0.3s)동안의 opacity를 주기 위한 컴포넌트
 * @author SUNG WOOK HWANG
 */
const SpringFade = forwardRef((props, ref) => {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });
  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default SpringFade;
