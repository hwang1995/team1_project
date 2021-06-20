import React, { Fragment, useEffect, useState } from 'react';
import { SwipeableDrawer, Grid } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import SearchBox from 'components/common/search/SearchBox';
import ReservationInfoContainer from './ReservationInfoContainer';
const ReservationDrawer = ({
  isOpened,
  setOpened,
  reservationTime,
  doctorInfo,
}) => {
  const { breakpoint } = useWindowSize();
  const [searchVal, setSearchVal] = useState('');
  const [page, setPage] = useState('INFO');

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
  };

  useEffect(() => {

    if(searchVal !== '') {
        // setPage의 값을 'INFO' > 'SEARCH_INFO'로 변경
    }

  }, [searchVal]);

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer breakpoint={breakpoint}>
          <DrawerHeader breakpoint={breakpoint}>
            <h1>진료 접수</h1>
            <div>
              <AiOutlineClose size={32} onClick={() => setOpened(false)} />
            </div>
          </DrawerHeader>

          <SearchBox
            setSearchVal={setSearchVal}
            placeholder="환자 이름을 입력해주세요."
          />

          {page === 'INFO' && (
            <ReservationInfoContainer
              reservationTime={reservationTime}
              doctorInfo={doctorInfo}
            />
          )}
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default ReservationDrawer;
