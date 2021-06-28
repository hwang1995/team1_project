import React, { Fragment, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEmergencyCurrentIndex,
  setActiveStep,
  removeEmergencyItem
} from 'redux/features/emergency/emergencySlice';
import NoticeDrawerItem from 'components/dashboard/NoticeDrawerItem';
import StyledButton from 'components/common/button/StyledButton';

const EmergencyDrawerMain = () => {
  const [searchVal, setSearchVal] = useState('');
  console.log(setSearchVal);
  const dispatch = useDispatch();
  const emergencyItem = useSelector((state) => state.emergency.emergencyItem);
  const currentIndex = useSelector((state) => state.emergency.emergencyCurrentIndex);

  const handleClick = (data) => {
    console.log(data);
    dispatch(setEmergencyCurrentIndex(data.emergency_id - 1));
    // dispatch(setActiveStep('READ'));
  };

  const handleDeleteBtn = () => {
    dispatch(removeEmergencyItem(emergencyItem[currentIndex]));
  };

  const matchData = emergencyItem.filter((data) =>
    data.emergency_name.includes(searchVal),
  );

  return (
    <Fragment>
      <div style={{ marginTop: '3rem', display: 'flex'}}>
        {/* <button onClick={() => setActiveStep('what')}>hello world</button> */}
        <div style={{ flex: 1, alignSelf: 'center', marginRight: '20px' }}>
          <StyledButton
            bgColor="rgb(226,153,51)"
            color="white"
            width="30%"
            onClick={() => dispatch(setActiveStep('WRITE'))}
          >
            <BsPencilSquare style={{ marginRight: '5px' }} />
            추가하기
          </StyledButton>
        </div>
        
      </div>
      <NoticeDrawerItem>
        {matchData
          .map((data) => (
            <Fragment>
              <div style={{ display: 'flex', marginTop: '10px' }}>
                <div className="left-side" style={{ flex: 2 }}>
                  <div className="textTitle-container">
                    <div align="left"
                      onClick={() => {
                        handleClick(data);
                      }} >
                      {data.emergency_name} : {data.emergency_tel}
                    </div>
                    <div>
              <AiOutlineClose size={20} onClick={handleDeleteBtn} />
            </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
      </NoticeDrawerItem>
      
    </Fragment>
  );
};

export default EmergencyDrawerMain;
