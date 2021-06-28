import React, { Fragment, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveStep,
  removeEmergencyItem,
} from 'redux/features/emergency/emergencySlice';
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import StyledButton from 'components/common/button/StyledButton';

const EmergencyDrawerMain = () => {
  const [searchVal, setSearchVal] = useState('');
  console.log(setSearchVal);
  const dispatch = useDispatch();
  const emergencyItem = useSelector((state) => state.emergency.emergencyItem);
  const currentIndex = useSelector(
    (state) => state.emergency.emergencyCurrentIndex,
  );

  const handleDeleteBtn = () => {
    dispatch(removeEmergencyItem(emergencyItem[currentIndex]));
  };

  const matchData = emergencyItem.filter((data) =>
    data.emergency_name.includes(searchVal),
  );

  return (
    <Fragment>
      <div style={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex' }}>
        <div style={{ flex: 1, alignSelf: 'center', marginRight: '20px' }}>
          <StyledButton
            color="white"
            style={{
              background: 'linear-gradient(to right, #000046, #1cb5e0)',
            }}
            width="30%"
            onClick={() => dispatch(setActiveStep('WRITE'))}
          >
            <BsPencilSquare style={{ marginRight: '5px' }} />
            추가하기
          </StyledButton>
        </div>
      </div>
      <Table style={{ minWidth: '500px', overflowX: 'scroll' }}>
        <TableHead>
          <TableCell size="small" style={{ minWidth: '120px' }}>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              이름
            </StyledTypography>
          </TableCell>
          <TableCell size="small" style={{ minWidth: '150px' }}>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              전화번호
            </StyledTypography>
          </TableCell>
          <TableCell size="small" style={{ minWidth: '80px' }}>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              분류
            </StyledTypography>
          </TableCell>
          <TableCell size="small" style={{ minWidth: '100px' }}>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              삭제
            </StyledTypography>
          </TableCell>
        </TableHead>
        <TableBody>
          {matchData.map((data) => (
            <Fragment key={data.emergency_id}>
              <TableRow>
                <TableCell size="small" style={{ minWidth: '100px' }}>
                  {data.emergency_name}
                </TableCell>
                <TableCell size="small">{data.emergency_tel}</TableCell>
                <TableCell size="small">{data.emergency_line}</TableCell>
                <TableCell size="small">
                  <div>
                    <AiOutlineClose size={20} onClick={handleDeleteBtn} />
                  </div>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default EmergencyDrawerMain;
