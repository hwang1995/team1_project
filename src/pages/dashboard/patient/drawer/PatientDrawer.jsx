import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SwipeableDrawer, Grid } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import StyledInputBase from 'components/common/input/StyledInputBase';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';
import PatientModal from '../modal/Modal';

const PatientDrawer = ({ isOpened, setOpened, setPatients, patientData }) => {
  const { breakpoint } = useWindowSize();
  const [address, setAddress] = useState({});
  const [isModalOpened, setModalOpened] = useState(false);

  const [isPatient, setPatient] = useState({
    patient_id: '',
    patient_name: '',
    patient_birth: moment(new Date()).format('YYYY년 MM월 DD일'),
    patient_addr1: '',
    patient_addr2: '',
    patient_postal: '',
    patient_tel: '',
    patient_height: '',
    patient_weight: '',
  });


  useEffect(() => {
    isPatient.patient_postal = address.postalcode;
    isPatient.patient_addr1 = address.fullAddress;
  },[isModalOpened])

  useEffect(() => {
      setPatient({
        patient_birth: moment(new Date()).format('YYYY년 MM월 DD일'),
      });
  }, [isOpened])

  useEffect(() => {
    if (breakpoint !== undefined) {
      console.log('Current breakpoint is', breakpoint);
    }
  }, [breakpoint]);

  //fuction(open){function(e){}}
  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
  };

  const addHandleClick = () => {
    console.log(isPatient);
    let isChecked = true;
    if (isPatient.patient_name === undefined) {
      isChecked = false;
      alert('이름을 입력해주세요');
      return;
    }

    if (isPatient.patient_birth === '') {
      isChecked = false;
      alert('생년월일을 입력해주세요');
      return;
    }
    const reg = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;
    if (!reg.test(isPatient.patient_tel)) {
      alert('전화번호 형식이 맞지 않습니다.');
      isChecked = false;
      return;
    }
   
    if (
      Number.parseInt(isPatient.patient_height) === NaN ||
      isPatient.patient_height === undefined
    ) {
      console.log(Number.parseInt(isPatient.patient_height));
      alert('키 형식이 맞지 않습니다.');
      isChecked = false;
      return;
    }
    if (
      Number.parseInt(isPatient.patient_weight) === NaN ||
      isPatient.patient_weight === undefined
    ) {
      console.log(typeof isPatient.patient_weight);
      alert('몸무게 형식이 맞지 않습니다.');
      isChecked = false;
      return;
    }
    if (isPatient.patient_postal === undefined || isPatient.patient_addr1 === undefined) {
      alert('주소를 입력해주세요');
      isChecked = false;
      return;
    }

    if (isChecked) {
      isPatient.patient_id = patientData.length + 1;
      const newPatient = patientData.concat(isPatient);
      setPatients(newPatient);
      setPatient({});
      setAddress({});
      setOpened(false);
    }
  };

  const handleChange = (event) => {
    setPatient({
      ...isPatient,
      [event.target.name]: event.target.value,
    });
  };

  const findAddressHandle = () => {
    setModalOpened(true);
  };

  const dateHandleChange = (date) => {
    console.log('date', new Date());
    console.log('moment', moment(date).format('YYYY년 MM월 DD일'));
    const birth = moment(date).format('YYYY년 MM월 DD일');
    setPatient({
      ...isPatient,
      patient_birth: birth,
    });
  };

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
            <h1>직원 추가</h1>
            <div>
              <AiOutlineClose
                size={32}
                onClick={() => {
                  setOpened(false);
                  setAddress({});
                  setPatient({});
                }}
              />
            </div>
          </DrawerHeader>

          <Grid
            container
            spacing={1}
            alignItems="center"
            justify="center"
            style={{ padding: '1rem' }}
          >
            <Grid
              item
              xs={3}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledTypography variant="h6" component="h5" weight={5}>
                이름
              </StyledTypography>
            </Grid>
            <Grid item xs={9}>
              <StyledInputBase
                name="patient_name"
                onChange={handleChange}
                style={{ width: '53%' }}
              />
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledTypography variant="h6" component="h5" weight={5}>
                생년월일
              </StyledTypography>
            </Grid>
            <Grid item xs={9}>
              <DatePicker
                value={isPatient.patient_birth}
                customInput={<StyledInputBase />}
                onChange={dateHandleChange}
              />
            </Grid>

            <Grid
              item
              xs={3}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledTypography variant="h6" component="h5" weight={5}>
                연락처
              </StyledTypography>
            </Grid>
            <Grid item xs={9}>
              <StyledInputBase
                name="patient_tel"
                onChange={handleChange}
                style={{ width: '80%' }}
              />
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledTypography variant="h6" component="h5" weight={5}>
                키(cm)
              </StyledTypography>
            </Grid>
            <Grid item xs={9}>
              <StyledInputBase
                name="patient_height"
                style={{ width: '53%' }}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledTypography variant="h6" component="h5" weight={5}>
                몸무게(kg)
              </StyledTypography>
            </Grid>
            <Grid item xs={9}>
              <StyledInputBase
                name="patient_weight"
                style={{ width: '53%' }}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledTypography variant="h6" component="h5" weight={5}>
                주소
              </StyledTypography>
            </Grid>

            <Grid item xs={9}>
              <StyledInputBase
                placeholder="우편번호"
                value={address.postalcode || ''}
                readOnly
              />
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledButton
                onClick={() => findAddressHandle()}
                bgColor="#a9e34b"
              >
                주소 찾기
              </StyledButton>
            </Grid>
            <Grid item xs={12}>
              <StyledInputBase
                value={address.fullAddress || ''}
                placeholder="주소를 입력해주세요"
                readOnly
              />
            </Grid>
            <Grid item xs={12}>
              <StyledInputBase
                name="patient_addr2"
                onChange={handleChange}
                placeholder="상세 주소를 입력하세요."
              />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '2em' }}>
            <div style={{ textAlign: 'center' }}>
              <StyledButton
                bgColor="#1E4C7C"
                width="80%"
                style={{ color: 'white' }}
                onClick={addHandleClick}
              >
                환자 추가
              </StyledButton>
            </div>
          </Grid>
        </ResponsiveContainer>
      </SwipeableDrawer>
      <PatientModal
        isModalOpened={isModalOpened}
        setAddress={setAddress}
        setModalOpened={setModalOpened}
      />
    </Fragment>
  );
};

export default PatientDrawer;
