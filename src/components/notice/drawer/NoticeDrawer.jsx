import React, { Fragment, useState } from 'react';
import { SwipeableDrawer, TableRow } from '@material-ui/core';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import SearchBox from 'components/common/search/SearchBox';
import NoticeDrawerItem from 'components/dashboard/NoticeDrawerItem';
const NoticeDrawer = ({ isOpened, setOpened }) => {
  const { breakpoint } = useWindowSize();
  //   const [isLoading, setLoading] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
  };

  //   console.log(searchVal);
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
            <h1>공지 사항</h1>
            <div>
              <AiOutlineClose size={32} onClick={() => setOpened(false)} />
            </div>
          </DrawerHeader>

          <SearchBox
            setSearchVal={setSearchVal}
            placeholder="제목을 입력해주세요."
          />

          <NoticeDrawerItem>
            <div className="left-side">
              <div className="avatar-container">
                <img src="/assets/image/doctorface.png" alt="Logo" width="25" />
                <h4 style={{ marginLeft: '5px' }}>Dr. Hong</h4>
              </div>
              <div className="textTitle-container">
                <TableRow align="left">Dr.Hong의 병원 컨설팅</TableRow>
              </div>
              <div className="textContent-container">
                <TableRow align="left">저 잘하죠?</TableRow>
              </div>
              <div className="textDate-container">
                <TableRow align="left">
                  {new Date().toLocaleDateString()}
                </TableRow>
              </div>
            </div>
            <div className="right-side">
              <img src="/assets/image/hell.jpg" alt="Logo" width="100%" />
            </div>
          </NoticeDrawerItem>
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default NoticeDrawer;
