import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGenderStatus } from 'redux/features/member/memberSlice';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { SwipeableDrawer, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import SelectedMan from '../SelectedGender/selectedGender';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import StyledInputBase from 'components/common/input/StyledInputBase';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';
import PatientModal from '../modal/Modal';

const PatientDrawer = ({ isOpened, setOpened, setPatients, patientData }) => {
  const gender = useSelector((state) => state.member.gender);
  const dispatch = useDispatch();
  const { breakpoint } = useWindowSize();
  const [isModalOpened, setModalOpened] = useState(false);
  const [keyboardDate, handleKeyDateChange] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };
  const [isPatient, setPatient] = useState({
    patient_id: '',
    patient_name: '',
    patient_birth: '',
    patient_addr1: '',
    patient_addr2: '',
    patient_postal: '',
    patient_tel: '',
    patient_height: '',
    patient_weight: '',
    patient_gender: '',
  });

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
    isPatient.patient_birth = moment(keyboardDate).format('YYYY/MM/DD');

    if (isPatient.patient_name === undefined || isPatient.patient_name === '') {
      handleAlert('error', '이름을 입력해주세요.');
      return;
    }

    if (gender === '') {
      handleAlert('error', '성별을 선택해주세요.');
      return;
    } else {
      isPatient.patient_gender = gender;
    }

    if (isPatient.patient_birth === '') {
      handleAlert('error', '생년월일을 입력해주세요.');
      return;
    }
    const reg = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;
    if (!reg.test(isPatient.patient_tel)) {
      handleAlert('error', '전화번호 형식이 맞지 않습니다.');

      return;
    }

    if (
      Number.parseInt(isPatient.patient_height) === isNaN ||
      isPatient.patient_height === undefined
    ) {
      console.log(Number.parseInt(isPatient.patient_height));
      handleAlert('error', '키는 숫자만 입력 가능합니다.');
      return;
    }
    if (
      Number.parseInt(isPatient.patient_weight) === isNaN ||
      isPatient.patient_weight === undefined
    ) {
      console.log(typeof isPatient.patient_weight);
      handleAlert('error', '몸무게 숫자만 입력 가능합니다.');
      return;
    }
    if (
      isPatient.patient_postal === undefined ||
      isPatient.patient_addr1 === undefined
    ) {
      handleAlert('error', '주소를 입력해주세요.');
      return;
    }
    isPatient.patient_id = patientData.length + 1;
    const newPatient = patientData.concat(isPatient);
    setPatients(newPatient);
    setPatient({});
    dispatch(setGenderStatus(''));
    setOpened(false);
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

  const addressClick = ({ fullAddress, postalcode }) => {
    setPatient({
      ...isPatient,
      patient_postal: postalcode,
      patient_addr1: fullAddress,
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
            <h1>환자 추가</h1>
            <div>
              <AiOutlineClose
                size={32}
                onClick={() => {
                  setOpened(false);
                  setPatient({});
                  dispatch(setGenderStatus(''));
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
                marginTop: '1em',
              }}
            >
              <StyledTypography variant="h6" component="h5" weight={5}>
                성별
              </StyledTypography>
            </Grid>
            <Grid item xs={9} style={{ marginTop: '1em' }}>
              <SelectedMan />
            </Grid>

            <Grid
              item
              xs={3}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledTypography
                variant="h6"
                component="h5"
                weight={5}
                style={{ marginTop: '1em', marginBottom: '1em' }}
              >
                생년월일
              </StyledTypography>
            </Grid>
            <Grid item xs={9} style={{ marginTop: '1em', marginBottom: '1em' }}>
              <KeyboardDatePicker
                disableFuture
                openTo="year"
                format="yyyy/MM/DD"
                views={['year', 'month', 'date']}
                value={keyboardDate}
                onChange={handleKeyDateChange}
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
                value={isPatient.patient_postal || ''}
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
                value={isPatient.patient_addr1 || ''}
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
        addressClick={addressClick}
        setModalOpened={setModalOpened}
      />
    </Fragment>
  );
};

export default PatientDrawer;
