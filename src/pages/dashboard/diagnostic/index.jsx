import React, { useState, useEffect, Fragment } from 'react';
import {
  Divider,
  Grid,
  Table,
  TableContainer,
  TableBody,
  Hidden,
  Paper,
} from '@material-ui/core';

import PageHeader from 'components/common/header/PageHeader';
import MenuSidebar from 'components/common/sidebar/MenuSidebar';
import ContentContainer from 'components/common/container/ContentContainer';
import TitleHeader from 'components/common/header/TitleHeader';
// import SearchBox from 'components/common/search/SearchBox';
import diagnosticHistory from './diagnosticHistory';
import DiagnosticTableHead from 'components/diagnostic/table/DiagnosticTableHead';
import DiagnosticTableRow from 'components/diagnostic/table/DiagnosticTableRow';
/**
 * 이 페이지 컴포넌트는 진단 검사 페이지를 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * 진단 검사 (PatientSearch, ColoredButton, Table, DiagnosticDrawer )
 * * Sider
 * * Header
 * @returns {JSX.Element}
 */
const DiagnosticPage = () => {
  const [searchVal, setSearchVal] = useState('');
  useEffect(() => {
    console.log(searchVal);
  }, [searchVal]);

  return (
    <div>
      {/* DiagnosticPage를 작성합니다. 들어가야할 컴포넌트는 위의 주석에 설명되어
      있으니 참조하시면 됩니다. */}
      <header style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>
        <PageHeader />
        <Divider />
      </header>
      <main>
        <Grid container>
          <Grid item xs={0} sm={4} md={3} lg={2}>
            <Hidden xsDown>
              <MenuSidebar />
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <ContentContainer>
              <TitleHeader>
                <span>진료 | </span>
                <span>진료 검사 보기</span>
              </TitleHeader>

              <TableContainer
                component={Paper}
                style={{
                  marginTop: '2rem',
                }}
              >
                <Table style={{ minWidth: '930px', overflowX: 'scroll' }}>
                  <DiagnosticTableHead />
                  <TableBody>
                    {diagnosticHistory.map((data) => (
                      <Fragment key={data.diag_test_id}>
                        <DiagnosticTableRow data={data} />
                      </Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </ContentContainer>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default DiagnosticPage;
