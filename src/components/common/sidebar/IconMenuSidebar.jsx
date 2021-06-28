import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Collapse, SwipeableDrawer } from '@material-ui/core';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Sidebar from './Sidebar';
import { setSidebarInfo } from 'redux/features/common/commonSlice';

const IconMenuSidebar = () => {
  const drawerWidth = 240;
  const history = useHistory();
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.common.sidebarInfo.drawer);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    dispatch(
      setSidebarInfo({
        name: 'drawer',
        status: true,
      }),
    );
  };

  return (
    <Fragment>
      <SwipeableDrawer
        variant="permanent"
        anchor="left"
        open={isOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <AiOutlineCalendar size={24} />
      </SwipeableDrawer>
    </Fragment>
  );
};

export default IconMenuSidebar;
