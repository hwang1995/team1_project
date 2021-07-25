import React, { Fragment, useEffect, useState } from 'react';
import {
  SwipeableDrawer,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
} from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import useWindowSize from 'hooks/useWindowSize';
import StyledInputBase from 'components/common/input/StyledInputBase';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';
import PostalCodeModal from '../modal/PostalCodeModal';
import { setModalStatus } from 'redux/features/member/memberSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  isExistedEmail,
  memberImageUpload,
  modifyMemberInfo,
} from 'apis/memberAPI';
import { v4 as uuid } from 'uuid';
import { CirclePicker } from 'react-color';
import ImageUploader from 'react-images-upload';

/**
 * 이 DRAWER 컴포넌트는 임직원 수정사항을 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * DRAWER (SwipeableDrawer)
 * * * 주소 검색 (PostalCodeModal)
 * * * 이미지 업로드 (ImageUploader)
 * * * 색상 선택 (CirclePicker)
 * @returns {JSX.Element}
 * @author Jong Hyun Hong
 */
const MemberUpdateDrawer = ({
  isUpdateOpened,
  setUpdateOpened,
  memberData,
  currentUser,
  showMember,
}) => {
  const { breakpoint } = useWindowSize();

  // 임직원의 권한을 설정할때 저장하는 상태
  const [selectVal, setSelectVal] = useState('');

  // 임직원의 이메일 중복체크의 확인여부를 저장하는 상태
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  // 임직원 정보에 대한 데이터를 저장하는 상태
  const [memberInfo, setMemberInfo] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  // 임직원의 색상을 저장하기 위한 상태
  const [currentColor, setCurrentColor] = useState('');

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  // 데이터 변경시에 동작
  const handleChange = (event) => {
    // 이메일 변경시 중복체크 여부 재설정
    if (event.target.name === 'memberEmail') {
      setIsEmailChecked(false);
    }
    setMemberInfo({ ...memberInfo, [event.target.name]: event.target.value });
    console.log(event.target.name);
    console.log('값 변경: ', event.target.value);
  };

  // 이미지를 업로드하거나 취소할때의 동작
  const onDrop = async (event, picture) => {
    if (event.length === 0 || picture.length === 0) {
      return;
    }

    try {
      let ext = '.jpg';

      if (event[0].type === 'image/jpeg') {
        ext = '.jpg';
      } else if (event[0].type === 'image/gif') {
        ext = '.gif';
      } else if (event[0].type === 'image/png') {
        ext = '.png';
      } else if (event[0].type === 'image/webp') {
        ext = '.webp';
      }

      const imageName = uuid() + ext;

      let imageInfo = {
        hospitalCode: currentUser.hospitalCode,
        imageName,
        base64Content: picture[0],
      };

      await memberImageUpload(imageInfo);
      const sendImageName = `/${imageInfo.hospitalCode}/${imageInfo.imageName}`;
      setMemberInfo((prevState) => ({
        ...prevState,
        memberImage: sendImageName,
      }));
      // setPictures(imageInfo);
    } catch (error) {
      // const { message } = error.response.data;

      handleAlert('error', '알 수 없는 이유로 이미지 업로드에 실패하였습니다.');
      return;
    }
  };

  //Drawer창이 켜졌을때 데이터 받아오기
  useEffect(() => {
    if (isUpdateOpened) {
      setMemberInfo({
        memberId: memberData.memberId,
        memberName: memberData.memberName,
        memberTel: memberData.memberTel,
        memberAuthority: memberData.memberAuthority,
        memberPostal: memberData.memberPostal,
        memberAddr1: memberData.memberAddr1,
        memberAddr2: memberData.memberAddr2,
        memberColor: memberData.memberColor,
        memberEmail: memberData.memberEmail,
        memberImage: memberData.memberImage,
        memberIntroduction: memberData.memberIntroduction,
      });
      console.log('updateOpened', memberData);
      setSelectVal(memberData.memberAuthority);
    }
  }, [isUpdateOpened]);

  const dispatch = useDispatch();
  const isModalOpened = useSelector((state) => state.member.modalStatus);
  const { member_postal, member_addr1 } = useSelector(
    (state) => state.member.addressInfo,
  );

  // 색상 변경시 데이터 저장
  useEffect(() => {
    console.log('currentCOlor', currentColor);
    setMemberInfo({
      ...memberInfo,
      memberColor: currentColor,
    });
  }, [currentColor]);

  // 권한 변경시 데이터 저장
  useEffect(() => {
    console.log('memberAuthority', selectVal);
    setMemberInfo({
      ...memberInfo,
      memberAuthority: selectVal,
    });
  }, [selectVal]);

  // 주소 및 우편번호 변경시 데이터 저장
  useEffect(() => {
    setMemberInfo({
      ...memberInfo,
      memberPostal: member_postal,
      memberAddr1: member_addr1,
    });
  }, [member_postal, member_addr1]);

  // '변경' 버튼을 클릭시 동작
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 이메일 정규 표현식
      const regExpEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      // 전화번호 정규표현식
      const regExpTel =
        /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

      const isValidEmail = regExpEmail.test(memberInfo.memberEmail);
      const isValidTel = regExpTel.test(memberInfo.memberTel);

      // 동일한 이메일주소
      let sameEmail = false;
      // 같은 이메일일때
      if (memberInfo.memberEmail === memberData.memberEmail) {
        sameEmail = true;
      }
      console.log('이메일 체크 상태: ', isEmailChecked);

      if (!sameEmail) {
        if (!isEmailChecked) {
          handleAlert('error', '이메일 중복 체크를 해주세요.');
          return;
        }
      } else if (!isValidEmail) {
        handleAlert('error', '이메일을 올바른 형식으로 입력해주세요.');
        return;
      } else if (memberInfo.memberName === '') {
        handleAlert('error', '이름이 공백입니다.');
        return;
      } else if (!isValidTel) {
        handleAlert(
          'error',
          `전화번호를 제대로 입력해주세요.(공백 또는 ' - ' 사용)`,
        );
        return;
      } else if (
        memberInfo.memberPostal === '' ||
        memberInfo.memberAddr1 === ''
      ) {
        handleAlert('error', '주소가 공백입니다. 주소 검색을 해주세요.');
        return;
      } else if (memberInfo.memberAddr2 === '') {
        handleAlert('error', '상세주소가 공백입니다. 상세주소를 입력해주세요.');
        return;
      } else if (memberInfo.memberColor === '') {
        handleAlert('error', '색상이 없습니다. 색을 골라주세요.');
        return;
      }
      console.log('modifyInfo', memberInfo);
      await modifyMemberInfo(memberInfo);

      handleAlert('success', '임직원 정보가 변경 되었습니다.');
      showMember();
      setUpdateOpened(false);
    } catch (error) {
      const { message } = error.response.data;

      if (message === undefined) {
        handleAlert(
          'error',
          '알 수 없는 이유로 임직원 정보 수정에 실패하였습니다.',
        );
        return;
      }

      handleAlert('error', message);
      return;
    }
  };

  //이메일 중복체크
  const handleEmailChecked = async () => {
    if (memberInfo.memberEmail === '') {
      handleAlert('error', '이메일을 입력해주세요.');
      return;
    }

    //유효성 검사
    const regExpEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const isValidEmail = regExpEmail.test(memberInfo.memberEmail);
    if (!isValidEmail) {
      handleAlert('error', '이메일을 올바른 형식으로 입력해주세요.');
      return;
    }

    try {
      if (memberInfo.memberEmail !== memberData.memberEmail) {
        const { data } = await isExistedEmail(memberInfo.memberEmail);
        console.log('이메일검사 결과: ', data);
        handleAlert('success', '이메일을 사용해도 좋습니다.');
      }
      setIsEmailChecked(true);
    } catch (error) {
      handleAlert('error', '중복된 이메일 입니다. 다른 이메일을 사용해주세요.');
      return;
    }
  };

  // 색상 변경시 동작
  const colorChange = (color, event) => {
    if (color) {
      setCurrentColor(color.hex);
      console.log(color.hex);
    }
  };

  useEffect(() => {
    if (breakpoint !== undefined) {
      console.log('Current breakpoint is', breakpoint);
    }
  }, [breakpoint]);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setUpdateOpened(open);
  };

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isUpdateOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <form onSubmit={handleSubmit}>
          <ResponsiveContainer breakpoint={breakpoint}>
            <DrawerHeader breakpoint={breakpoint}>
              <h1>직원 정보 변경 - {memberData.memberName}님</h1>
              <div>
                <AiOutlineClose
                  size={32}
                  onClick={() => setUpdateOpened(false)}
                />
              </div>
            </DrawerHeader>

            <Grid container spacing={1} style={{ padding: '1rem' }}>
              <Grid
                item
                xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledTypography variant="h6" component="h5" weight={5}>
                  직책
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <FormControl style={{ width: '100%' }} variant="outlined">
                  <InputLabel id="form-label">의사</InputLabel>
                  <Select
                    labelId="form-label"
                    id="select-label"
                    label="직책"
                    value={selectVal}
                  >
                    <MenuItem
                      value="ROLE_DOCTOR"
                      onClick={() => setSelectVal('ROLE_DOCTOR')}
                    >
                      의사
                    </MenuItem>
                    <MenuItem
                      value="ROLE_NURSE"
                      onClick={() => setSelectVal('ROLE_NURSE')}
                    >
                      간호사
                    </MenuItem>
                    <MenuItem
                      value="ROLE_INSPECTOR"
                      onClick={() => setSelectVal('ROLE_INSPECTOR')}
                    >
                      검사자
                    </MenuItem>
                  </Select>
                </FormControl>
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
                  이메일
                </StyledTypography>
              </Grid>
              <Grid item xs={7}>
                <StyledInputBase
                  name="memberEmail"
                  onChange={handleChange}
                  value={memberInfo.memberEmail || ''}
                />
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledButton
                  bgColor="lightgray"
                  onClick={() => handleEmailChecked()}
                >
                  중복 체크
                </StyledButton>
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
                  이름
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <StyledInputBase
                  name="memberName"
                  value={memberInfo.memberName || ''}
                  onChange={handleChange}
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
                  전화번호
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <StyledInputBase
                  name="memberTel"
                  value={memberInfo.memberTel || ''}
                  onChange={handleChange}
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
                  name="memberPostal"
                  placeholder="우편 번호"
                  value={memberInfo.memberPostal || ''}
                  onChange={handleChange}
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
                  bgColor="lightgray"
                  onClick={() => dispatch(setModalStatus(!isModalOpened))}
                >
                  주소 찾기
                </StyledButton>
              </Grid>
              <Grid item xs={12}>
                <StyledInputBase
                  name="memberAddr1"
                  placeholder="주소"
                  value={memberInfo.memberAddr1 || ''}
                  onChange={handleChange}
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <StyledInputBase
                  name="memberAddr2"
                  placeholder="상세 주소를 입력하세요."
                  value={memberInfo.memberAddr2 || ''}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <div>
              <StyledTypography variant="h6" component="h5" weight={5}>
                이미지
              </StyledTypography>
              <ImageUploader
                name="memberImage"
                withIcon={true}
                buttonText="이미지를 선택해주세요."
                onChange={onDrop}
                imgExtension={['.jpg', '.png', '.jpeg']}
                fileSizeError="파일사이즈가 너무 큽니다. 최대크기(5242880)"
                fileTypeError="파일확장자가 잘못되었습니다."
                label="최대 파일 크기: 5mb, 확장자: jpg, png만 가능"
                maxFileSize={5242880}
                singleImage
                withPreview
              />
            </div>
            <div>
              <StyledTypography variant="h6" component="h5" weight={5}>
                자기소개
              </StyledTypography>
              <TextField
                name="memberIntroduction"
                value={memberInfo.memberIntroduction || ''}
                onChange={handleChange}
                label="간단한 소개인사를 적어주세요."
                multiline
                rows={4}
                variant="outlined"
                fullWidth
              />
            </div>
            <div
              style={{
                marginTop: 15,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledTypography
                variant="h6"
                component="h5"
                weight={5}
                style={{ marginRight: 15 }}
              >
                색상선택
              </StyledTypography>
              <CirclePicker onChange={colorChange} />
              <Paper
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: 30,
                  backgroundColor: memberInfo.memberColor || '',
                }}
              />
            </div>

            <div
              style={{
                position: 'fixed',
                bottom: 30,
                right: 20,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <StyledButton type="submit" bgColor="lightgray">
                정보 변경
              </StyledButton>
            </div>
            <PostalCodeModal />
          </ResponsiveContainer>
        </form>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default MemberUpdateDrawer;
