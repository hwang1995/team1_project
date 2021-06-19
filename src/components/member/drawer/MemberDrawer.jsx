import React, { Fragment, useEffect, useState } from 'react';
import {
  SwipeableDrawer,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import StyledInputBase from 'components/common/input/StyledInputBase';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';

const MemberDrawer = ({ isOpened, setOpened }) => {
  const { breakpoint } = useWindowSize();
  const [selectVal, setSelectVal] = useState('');
  // const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (breakpoint !== undefined) {
      console.log('Current breakpoint is', breakpoint);
    }
  }, [breakpoint]);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
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
              <AiOutlineClose size={32} onClick={() => setOpened(false)} />
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
                  <MenuItem value="의사" onClick={() => setSelectVal('의사')}>
                    의사
                  </MenuItem>
                  <MenuItem
                    value="간호사"
                    onClick={() => setSelectVal('간호사')}
                  >
                    간호사
                  </MenuItem>
                  <MenuItem
                    value="검사자"
                    onClick={() => setSelectVal('검사자')}
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
              <StyledInputBase />
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledButton bgColor="lightgray">중복 체크</StyledButton>
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
                비밀번호
              </StyledTypography>
            </Grid>
            <Grid item xs={9}>
              <StyledInputBase />
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
              <StyledInputBase />
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
              <StyledInputBase />
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
              <StyledInputBase />
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledButton bgColor="lightgray">주소 찾기</StyledButton>
            </Grid>
            <Grid item xs={12}>
              <StyledInputBase />
            </Grid>
            <Grid item xs={12}>
              <StyledInputBase />
            </Grid>
          </Grid>

          <div
            style={{
              position: 'fixed',
              bottom: 30,
              right: 20,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <StyledButton bgColor="lightgray">임직원 추가</StyledButton>
          </div>
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default MemberDrawer;
