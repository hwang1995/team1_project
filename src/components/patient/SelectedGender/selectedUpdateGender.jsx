import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setGenderStatus} from "redux/features/member/memberSlice";
import { Grid } from '@material-ui/core';
import { IoManOutline, IoWomanOutline } from 'react-icons/io5';
import StyledContainer from 'components/common/container/StyledContainer';
import StyledTypography from 'components/common/typography/StyledTypography';


/**
 * 이 페이지 컴포넌트는 환자의 성별을 수정하기 위해 작성한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * Sider
 * * Header
 * * 환자 관리 (PatientSearch, Table, ColoredButton)
 * @returns {JSX.Element}
 * @author SI HYUN PARK
 */
const SelectedMan = (genderValue) => {
  const dispatch = useDispatch();
  // 리덕스에서 성별 데이터를 가져온다
  const gender = genderValue.genderValue; 

  const genderStatus= useSelector((state) => state.member.gender);
 

  // 성별을 세팅하는 onChange
  const handleChange = (name) => {
   
   dispatch(setGenderStatus(name));
  };
  
  useEffect(() => {
   dispatch(setGenderStatus(gender));
  }, [gender, dispatch])



  return (
    <Fragment>
      <main>
        <Grid container>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <div>
              <div
                style={{ display: 'flex', maxWidth: '400px', height: '70px' }}
              >
                <StyledContainer
                  bgColor="rgb(62,63,70)"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() => handleChange('male')}
                >
                  {genderStatus === 'female' && (
                    <Fragment>
                      <IoManOutline color="rgb(217,217,217)" size={64} />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          flex: 1,
                        }}
                      >
                        <StyledTypography
                          variant="subtitle1"
                          weight={7}
                          style={{ color: 'white', fontFamily: 'Lato' }}
                        >
                          남자 (Male)
                        </StyledTypography>
                      </div>
                    </Fragment>
                  )}
                  {genderStatus === 'male' && (
                    <Fragment>
                      <IoManOutline color="rgb(244,213,51)" size={64} />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          flex: 1,
                        }}
                      >
                        <StyledTypography
                          variant="subtitle1"
                          weight={7}
                          style={{
                            color: 'rgb(244,213,51)',
                            fontFamily: 'Lato',
                          }}
                        >
                          남자 (Male)
                        </StyledTypography>
                      </div>
                    </Fragment>
                  )}
                </StyledContainer>
                <StyledContainer
                  bgColor="rgb(62,63,70)"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() => handleChange('female')}
                >
                  {genderStatus === 'male' && (
                    <Fragment>
                      <IoWomanOutline color="rgb(217,217,217)" size={64} />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          flex: 1,
                        }}
                      >
                        <StyledTypography
                          variant="subtitle1"
                          weight={7}
                          style={{ color: 'white', fontFamily: 'Lato' }}
                        >
                          여자 (Female)
                        </StyledTypography>
                      </div>
                    </Fragment>
                  )}
                  {genderStatus === 'female'&& (
                    <Fragment>
                      <IoWomanOutline color="rgb(244,213,51)" size={64} />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          flex: 1,
                        }}
                      >
                        <StyledTypography
                          variant="subtitle1"
                          weight={7}
                          style={{
                            color: 'rgb(244,213,51)',
                            fontFamily: 'Lato',
                          }}
                        >
                          여자 (Female)
                        </StyledTypography>
                      </div>
                    </Fragment>
                  )}
                </StyledContainer>
              </div>
            </div>
          </Grid>
        </Grid>
      </main>
    </Fragment>
  );
};

export default SelectedMan;
