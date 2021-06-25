
import DrawerHeader from "components/common/drawer/DrawerHeader";
import StyledTypography from 'components/common/typography/StyledTypography';
import StyledInputBase from 'components/common/input/StyledInputBase';
import StyledButton from 'components/common/button/StyledButton';
import { Grid } from '@material-ui/core';

const LoginPage = () => {

  return (
    <div>
      <DrawerHeader style={{ padding: '2em' }}>
        <h1>HealthCare</h1>
      </DrawerHeader>
      <Grid container spacing={3} style={{padding:"2em"}}>
        <Grid item xl={7} lg={7} md={7} sm={6} xs={6} style={{fontWeight:"bold", alignItems:"center"}}>
          <h1>로그인</h1>
          <Grid container style={{marginTop: "2em"}}>
            <Grid item xl={3} lg={3} md={3} sm={4} xs={6} style={{fontWeight:"bold", alignItems:"center"}}>
                <StyledTypography variant="h6" component="h5" weight={5}>
                    병원코드
               </StyledTypography>
            </Grid>
            <Grid item xl={9} lg={9} md={9} sm={8} xs={6}>
               <StyledInputBase  />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={5} lg={5} md={5} sm={6} xs={6} style={{backgroundColor:"blue"}}>
          <h1>그림 세팅</h1>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginPage;