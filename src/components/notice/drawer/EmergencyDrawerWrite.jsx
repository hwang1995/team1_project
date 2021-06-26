import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';

import React, { Fragment, useState } from 'react';
import { BsListUl, BsPencilSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEmergencyItem,
  setActiveStep,
  setEmergencyCurrentIndex,
} from 'redux/features/emergency/emergencySlice';

const EmergencyDrawerWrite = () => {
  const [title, setTitle] = useState('');
  const [tel, setTel] = useState('');

  const dispatch = useDispatch();
  const emergencyItem = useSelector((state) => state.emergency.emergencyItem);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeTel = (event) => {
    setTel(event.target.value);
  };

  const handleAdd = () => {
    const emergencyIndex = emergencyItem.length;

    dispatch(
      addEmergencyItem({
        emergency_id: emergencyIndex + 1,
        emergency_title: title,
        emergency_tel: tel,
      }),
    );

    dispatch(setEmergencyCurrentIndex(emergencyIndex));
  };

  return (
    <Fragment>
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <div style={{ flex: 0.8, alignSelf: 'center' }}>
          <h2 style={{ fontWeight: '800' }}>제목</h2>
        </div>
        <div style={{ flex: 6 }}>
          <StyledInputBase
            value={title}
            onChange={handleChange}
            placeholder="이름을 입력해주세요."
          />
        </div>
        <div style={{ flex: 6 }}>
          <StyledInputBase
            value={title}
            onChange={handleChangeTel}
            placeholder="전화번호를 입력해주세요."
          />
        </div>
      </div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
        }}
      >
        <div style={{ flex: '2', marginRight: '10px' }}>
          <StyledButton
            bgColor="rgb(226,153,51)"
            color="white"
            onClick={handleAdd}
          >
            <BsPencilSquare style={{ marginRight: '5px' }} />
            게시물 등록
          </StyledButton>
        </div>
        <div style={{ flex: '2' }}>
          <StyledButton
            bgColor="rgb(8,78,127)"
            color="white"
            onClick={() => dispatch(setActiveStep('MAIN'))}
          >
            <BsListUl style={{ marginRight: '5px' }} />
            목록
          </StyledButton>
        </div>
        <div style={{ flex: '6' }}></div>
      </div>
    </Fragment>
  );
};
export default EmergencyDrawerWrite;
