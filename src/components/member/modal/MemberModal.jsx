import { Modal } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import DaumPostCode from 'react-daum-postcode';

const ModalBase = styled(Modal)`
  paper: {
    position: 'absolute';
    width: 400;
    backgroundcolor: white;
    border: '2px solid #000';
    padding: 30;
  }
`;

const MemberModal = ({ isOpenModal, setOpenModal }) => {
  const toggleModal = (open) => {
    setOpenModal(open);
  };

  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '400px',
    height: '400px',
    padding: '7px',
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let zoneCode = data.zonecode;
    console.log(zoneCode);

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <>
      <ModalBase open={isOpenModal} onClose={toggleModal(false)}>
        <div>
          <p>asdasdasda모달창</p>
          <DaumPostCode style={postCodeStyle} onComplete={handleComplete} />
        </div>
      </ModalBase>
    </>
  );
};

export default MemberModal;
