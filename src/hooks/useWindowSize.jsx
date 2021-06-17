import { useState, useEffect } from 'react';
/**
 * useWindowSize Hook
 * 해당 기기의 해상도가 바뀌는 경우에 감지하기 위한 커스텀 훅
 * @returns {object}
 */
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    breakpoint: undefined,
  });

  useEffect(() => {
    function handleResize() {
      const { innerWidth, innerHeight } = window;
      let breakpoint = '';

      if (innerWidth > 1920) {
        breakpoint = 'xl';
      } else if (innerWidth > 1280) {
        breakpoint = 'lg';
      } else if (innerWidth > 960) {
        breakpoint = 'md';
      } else if (innerWidth > 600) {
        breakpoint = 'sm';
      } else {
        breakpoint = 'xs';
      }

      setWindowSize({
        width: innerWidth,
        height: innerHeight,
        breakpoint,
      });
    }
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
