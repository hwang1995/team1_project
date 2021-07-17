import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGenderStatus } from 'redux/features/member/memberSlice';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { registerPatientInfo } from 'apis/patientAPI';
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

const PatientDrawer = ({
  isOpened,
  setOpened,
  setPatients,
  patientData,
  setDisplay,
}) => {
  const gender = useSelector((state) => state.member.gender);
  const loginInfo = useSelector((state) => state.common.loginInfo);
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
    patientName: '',
    patientSsn: '',
    patientBirth: '',
    patientAddr1: '',
    patientAddr2: '',
    patientPostal: '',
    patientTel: '',
    patientHeight: '',
    patientWeight: '',
    patientGender: '',
    recentDate: '',
    hospitalCode: '',
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

  const addHandleClick = async () => {
    console.log(isPatient);
    isPatient.patientBirth = moment(keyboardDate).format('YYYY-MM-DD');
    isPatient.patientSsn = moment(keyboardDate).format('YYYY-MM-DD');
    isPatient.recentDate = moment(new Date()).format('yyyy-MM-DDTHH:mm');

    if (isPatient.patientName === undefined || isPatient.patientName === '') {
      handleAlert('error', '이름을 입력해주세요.');
      return;
    }

    if (gender === '') {
      handleAlert('error', '성별을 선택해주세요.');
      return;
    } else {
      isPatient.patientGender = gender;
    }

    if (isPatient.patientBirth === '') {
      handleAlert('error', '생년월일을 입력해주세요.');
      return;
    }
    const reg = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;
    if (!reg.test(isPatient.patientTel)) {
      handleAlert('error', '전화번호 형식이 맞지 않습니다.');

      return;
    }

    if (
      Number.parseInt(isPatient.patientHeight) === isNaN ||
      isPatient.patientHeight === undefined
    ) {
      handleAlert('error', '키는 숫자만 입력 가능합니다.');
      return;
    }
    if (
      Number.parseInt(isPatient.patientWeight) === isNaN ||
      isPatient.patientWeight === undefined
    ) {
      handleAlert('error', '몸무게 숫자만 입력 가능합니다.');
      return;
    }
    if (
      isPatient.patientPostal === undefined ||
      isPatient.patientAddr1 === undefined
    ) {
      handleAlert('error', '주소를 입력해주세요.');
      return;
    }
    isPatient.hospitalCode = loginInfo.hospitalCode;
    console.log(isPatient);

    try {
      const { data } = await registerPatientInfo(isPatient);
      handleAlert('success', '환자가 등록되었습니다.');
      setDisplay(true);
      setPatient({});
      dispatch(setGenderStatus(''));
      handleKeyDateChange(new Date());
      setOpened(false);
    } catch (error) {
      const { message } = error.response.data;
      console.log(message);
      handleAlert('error', message);
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

  const addressClick = ({ fullAddress, postalcode }) => {
    setPatient({
      ...isPatient,
      patientPostal: postalcode,
      patientAddr1: fullAddress,
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
                name="patientName"
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
                name="patientTel"
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
                name="patientHeight"
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
                name="patientWeight"
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
                value={isPatient.patientPostal || ''}
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
                value={isPatient.patientAddr1 || ''}
                placeholder="주소를 입력해주세요"
                readOnly
              />
            </Grid>
            <Grid item xs={12}>
              <StyledInputBase
                name="patientAddr2"
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
