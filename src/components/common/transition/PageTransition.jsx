import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const duration = 0.5;
  const variants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration,
        delay: duration,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      transition: { duration },
    },
  };
  const location = useLocation();

  return (
    <AnimatePresence>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
