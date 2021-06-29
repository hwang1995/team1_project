import React from 'react';
import { Container } from '@material-ui/core';
import ResponsivePageHeader from 'components/common/header/ResponsivePageHeader';
import PageTransition from 'components/common/transition/PageTransition';
import StyledTypography from 'components/common/typography/StyledTypography';
const MainPage = () => {
  return (
    <div>
      <header
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1,
        }}
      >
        <ResponsivePageHeader />
      </header>
      <main>
        <PageTransition>
          <Container
            maxWidth="lg"
            style={{
              backgroundImage: `url(/assets/image/landing_5.png)`,
              height: '90vh',
              width: '100%',
              backgroundPosition: 'bottom',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
            }}
          >
            <div
              style={{
                marginTop: '3rem',
                textAlign: 'center',
              }}
            >
              <StyledTypography variant="h2" component="h3" weight={7}>
                쉬운 병원 관리 시스템
              </StyledTypography>
              <div
                style={{
                  marginTop: '1rem',
                }}
              >
                <StyledTypography variant="h4" component="h3" weight={2}>
                  HealthCare와 함께 쉬운 병원 관리를 경험해보세요.
                </StyledTypography>
              </div>
            </div>
          </Container>
        </PageTransition>{' '}
      </main>
    </div>
  );
};

export default MainPage;
