import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SwipeableDrawer } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import SearchBox from 'components/common/search/SearchBox';
import PatientInfoListItem from './PatientInfoListItem';
import ReservationInfoListContainer from './ReservationInfoListContainer';
import ClockSpinner from 'components/common/spinner/ClockSpinner';
import { getSearchReservationPatient } from 'apis/reservationAPI';

/*
  예약된 환자의 검색을 보여주는 Drawer 컨테이너
*/
const SearchReservation = ({
  searchOpened,
  setSearchOpened,
  setAddDisplay,
}) => {
 
  // 로그인한 유저의 정보
  const loginInfo = useSelector((state) => state.common.loginInfo);
  // 검색어(SearchBox)를 보여주냐 안보여주냐를 세팅하는 상태 데이터
  const [visible, setVisible] = useState(false);

  //clockSpinner에 시팅할 것
  const [isLoading, setLoading] = useState(false);
  /*
     검색결과에 대한 환자 데이터를 담는 부분
     PatientInfoListItem 컴포넌트에 searchResults를 전달해 검색결과 데이터 리스트가 띄어진다
  */
  const [searchResults, setResult] = useState([]);
  /*
     컴포넌트 변경 부분
     false -> 검색어가 없다라고 띄우는 컴포넌트
     true -> 검색결과 내용을 담아 띄우는 컴포넌트
  */
  const [readOpened, setReadOpened] = useState(false);
  /*
    예약환자 데이터를 담는 상태데이터
    PatientInfoListItem 컴포넌트에 setReadPatient를 보내 데이터를 담아온다
  */
  const [readPatient, setReadPatient] = useState();
  /*
    예약환자를 검색하는 컴포넌트 (PatientListItem)에서 
    pageResult = true -> 검색어를 입력해세요 라는 내용이 세팅
                 false -> 검색결과가 없습니다 라는 내용이 세팅
  */
  const [pageResult, setPageResult] = useState(false);

  const { breakpoint } = useWindowSize();
  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setSearchOpened(open);
  };
  // x 버튼을 클릭시 발생되는 클릭 이벤트
  const handleChangeCloseClick = () => {
    setSearchOpened(false);
    setReadOpened(false);
    setPageResult(false);
    setResult([]);
  };

  useEffect(() => {
    setResult([]);
  }, [readOpened]);

  /*
    SearcBox에 해당 함수를 넘겨 키워드 (inputVal)를 받아
    그 키워드에 맞는 환자 데이터를
    1) result 변수에 담는다
    2) restul를 setResult 함수에 담는다 (searchResults)
  */
  const setSearchVal = async (inputVal) => {
    try {
      setLoading(true);
      const { data } = await getSearchReservationPatient({
        hospitalCode: loginInfo.hospitalCode,
        patientName: inputVal,
      });
      setResult(data.data);
      console.log(data.data);
      setReadOpened(false);
     
    } catch (error) {
      setResult([]);
       setPageResult(true);
      setLoading(false);
    }
  };

  /*
    검색결과에 대한 데이터의값이 있을 경우, spinner를 off 한다
  */
  useEffect(() => {
    if (searchResults.length > 0) {
      setLoading(false);
    }
  }, [searchResults]);

  const clockSpinner = () => {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ClockSpinner isLoading={isLoading} />
      </div>
    );
  };

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={searchOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer breakpoint={breakpoint}>
          <DrawerHeader breakpoint={breakpoint}>
            <h1>예약 환자 검색</h1>
            <div>
              <AiOutlineClose
                size={32}
                onClick={handleChangeCloseClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </DrawerHeader>

          {visible === false && (
            <SearchBox
              setSearchVal={setSearchVal}
              placeholder="환자 이름을 입력해주세요."
            />
          )}
          {isLoading && clockSpinner()}
          {!isLoading && (
            <div style={{ marginTop: '2em' }}>
              {readOpened === false ? (
                // 검색시 나오는 컴포넌트
                <PatientInfoListItem
                  searchResults={searchResults}
                  setReadOpened={setReadOpened}
                  setReadPatient={setReadPatient}
                  pageResult={pageResult}
                />
              ) : (
                //예약한 환자에 대한 정보 데이터
                <ReservationInfoListContainer
                  setReadOpened={setReadOpened}
                  readPatient={readPatient}
                  setVisible={setVisible}
                  setPageResult={setPageResult}
                  setAddDisplay={setAddDisplay}
                />
              )}
            </div>
          )}
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default SearchReservation;
