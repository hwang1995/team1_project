import React, { Fragment } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import notfoundhistory from 'pages/temporary/hyungyoon/resources/notfound.png';

const CollapsibleVitalsRows = ({ data }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              혈압
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              맥박
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              호흡
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              체온
            </StyledTypography>
          </TableCell>
         
        </TableHead>

        <TableBody>
          {data.map((rows) => (
            <Fragment key={rows.diag_inspection_id}>
              <TableRow>
              {rows.blood_pressure ? (
                       <TableCell size="small">{rows.blood_pressure} mmHg</TableCell>
                      ) : (
                        <TableCell size="small">
                          <img
                            src={notfoundhistory}
                            alt="Logo"
                            width="100"
                            style={{
                              display: 'flex',
                            }}
                          />
                          기록이 존재하지 않습니다.
                        </TableCell>
                      )}
                {rows.pulse ? (
                       <TableCell size="small">{rows.pulse} BPM</TableCell>
                      ) : (
                        <TableCell size="small">
                          <img
                            src={notfoundhistory}
                            alt="Logo"
                            width="100"
                            style={{
                              display: 'flex',
                            }}
                          />
                          기록이 존재하지 않습니다.
                        </TableCell>
                      )}
                {rows.respiration_rate ? (
                       <TableCell size="small">{rows.respiration_rate} RR</TableCell>
                      ) : (
                        <TableCell size="small">
                          <img
                            src={notfoundhistory}
                            alt="Logo"
                            width="100"
                            style={{
                              display: 'flex',
                            }}
                          />
                          기록이 존재하지 않습니다.
                        </TableCell>
                      )}
                {rows.temperature ? (
                       <TableCell size="small">{rows.temperature} °C</TableCell>
                      ) : (
                        <TableCell size="small">
                          <img
                            src={notfoundhistory}
                            alt="Logo"
                            width="100"
                            style={{
                              display: 'flex',
                            }}
                          />
                          기록이 존재하지 않습니다.
                        </TableCell>
                      )}
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleVitalsRows;
