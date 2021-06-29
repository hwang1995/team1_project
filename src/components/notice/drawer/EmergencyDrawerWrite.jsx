import StyledButton from 'components/common/button/StyledButton';
import StyledInputBase from 'components/common/input/StyledInputBase';
import StyledTypography from 'components/common/typography/StyledTypography';
import React, { Fragment, useState } from 'react';
import { BsListUl, BsPencilSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEmergencyItem,
  setActiveStep,
  setEmergencyCurrentIndex,
} from 'redux/features/emergency/emergencySlice';
import {
  FormControl,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@material-ui/core';
// import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';


const EmergencyDrawerWrite = () => {
  const [title, setTitle] = useState('');
  const [tel, setTel] = useState('');
  const [line, setLine] = useState('');

  const dispatch = useDispatch();
  const emergencyItem = useSelector((state) => state.emergency.emergencyItem);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeTel = (event) => {
    setTel(event.target.value);
  };

  const handleChangeLine = (event) => {
    setLine(event.target.value);
  };

  const handleAdd = () => {
    const emergencyIndex = emergencyItem.length;

    if (tel === '' || title === '') {
      alert('이름 혹은 전화번호 비어있습니다.');
      return;
    }
    if (line === '') {
      alert('내선/외선을 선택해 주시기 바랍니다.');
      return;
    }
    dispatch(
      addEmergencyItem({
        emergency_id: emergencyIndex + 1,
        emergency_name: title,
        emergency_tel: tel,
        emergency_line: line,
      }),
    );

    dispatch(setEmergencyCurrentIndex(emergencyIndex));
    dispatch(setActiveStep('MAIN'));
  };

  return (
    <Fragment>
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
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell size="small" style={{ minWidth: '100px' }}>
              <StyledInputBase
                value={title}
                onChange={handleChange}
                placeholder="이름을 입력해주세요."
              />
            </TableCell>
            <TableCell size="small">
              {/* <MaskedInput
                value={tel}
                onChange={handleChangeTel}
                placeholder="전화번호를 입력해주세요."
                mask={[
                  '(',
                  /[0-9]/,
                  /\d/,
                  /\d/,
                  ')',
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  '-',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              /> */}
              <NumberFormat
                onChange={handleChangeTel}
                format="###-###-####"
                allowEmptyFormatting
                mask="_"
              />
            </TableCell>
            <TableCell size="small">
              <FormControl style={{ width: '100%' }} variant="outlined">
                <Select onChange={handleChangeLine} value={line}>
                  <MenuItem value={line} onClick={() => setLine('내선')}>
                    내선
                  </MenuItem>
                  <MenuItem value={line} onClick={() => setLine('외선')}>
                    외선
                  </MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <StyledButton
          bgColor="rgb(226,153,51)"
          color="white"
          onClick={handleAdd}
          style={{
            maxWidth: '150px',
          }}
        >
          <BsPencilSquare style={{ marginRight: '5px' }} />
          전화번호 등록
        </StyledButton>

        <StyledButton
          bgColor="rgb(8,78,127)"
          color="white"
          onClick={() => dispatch(setActiveStep('MAIN'))}
          style={{
            maxWidth: '150px',
          }}
        >
          <BsListUl style={{ marginRight: '5px' }} />
          목록
        </StyledButton>
      </div>
    </Fragment>
  );
};
export default EmergencyDrawerWrite;