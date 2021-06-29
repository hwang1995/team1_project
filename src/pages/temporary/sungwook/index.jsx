import React, { Fragment, useState } from 'react';
import { Divider, Grid } from '@material-ui/core';
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { IoManOutline, IoWomanOutline } from 'react-icons/io5';
import useWindowSize from 'hooks/useWindowSize';
import PageHeader from '../../../components/common/header/PageHeader';
import MenuSidebar from 'components/common/sidebar/MenuSidebar';
import TitleHeader from '../../../components/common/header/TitleHeader';
import StyledContainer from 'components/common/container/StyledContainer';
import StyledTypography from 'components/common/typography/StyledTypography';

const SungwookPage = () => {
  const { breakpoint } = useWindowSize();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [keyboardDate, handleKeyDateChange] = useState(new Date());

  const [selectedGender, setSelectedGender] = useState({
    male: false,
    female: false,
  });

  const handleChange = (name) => {
    console.log(name);
    const value = selectedGender[name];
    setSelectedGender({
      ...selectedGender,
      [name]: !value,
    });
  };

  return (
    <Fragment>
      <header style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>
        <PageHeader />
        <Divider />
      </header>
      <main>
        <Grid container>
          <Grid item xs={0} sm={4} md={3} lg={2}>
            {breakpoint !== 'xs' ? <MenuSidebar /> : ''}
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <div style={{ height: '90vh', padding: '1rem' }}>
              <TitleHeader>
                <span>진료 | </span>
                <span>진료 등록</span>
              </TitleHeader>

              <Divider light />

              <DatePicker
                disableFuture
                openTo="year"
                format="yyyy/MM/DD"
                views={['year', 'month', 'date']}
                value={selectedDate}
                onChange={handleDateChange}
              />

              <KeyboardDatePicker
                disableFuture
                openTo="year"
                format="yyyy/MM/DD"
                views={['year', 'month', 'date']}
                value={keyboardDate}
                onChange={handleKeyDateChange}
              />

              <br />
              <br />
              <div
                style={{ display: 'flex', maxWidth: '400px', height: '100px' }}
              >
                <StyledContainer
                  bgColor="rgb(62,63,70)"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() => handleChange('male')}
                >
                  {selectedGender.male && (
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
                  {!selectedGender.male && (
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
                  {selectedGender.female && (
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
                  {!selectedGender.female && (
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

export default SungwookPage;
