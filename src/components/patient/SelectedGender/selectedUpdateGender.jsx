import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {setGenderStatus} from "redux/features/member/memberSlice";
import { Grid } from '@material-ui/core';
import { IoManOutline, IoWomanOutline } from 'react-icons/io5';
import StyledContainer from 'components/common/container/StyledContainer';
import StyledTypography from 'components/common/typography/StyledTypography';

const SelectedMan = (genderValue) => {
  const dispatch = useDispatch();

  const gender = genderValue.genderValue;
  const [selectedGender, setSelectedGender] = useState({
    male: false,
    female: false,
  });

  const handleChange = (name) => {
    let balance = '';
    if (name === 'male') {
      balance = 'female';
    } else {
      balance = 'male';
    }
    const value = selectedGender[name];
    let balanceValue = selectedGender[balance];
    if (!value === balanceValue) {
      balanceValue = !balanceValue;
    }
    setSelectedGender({
      ...selectedGender,
      [name]: !value,
      [balance]: balanceValue,
    });
    dispatch(setGenderStatus(name));
  };

  useEffect(() => {
    setSelectedGender({
      [gender]: true,
    });
  }, [gender]);

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
                  {!selectedGender.male && (
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
                  {selectedGender.male && (
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
                  {!selectedGender.female && (
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
                  {selectedGender.female && (
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
