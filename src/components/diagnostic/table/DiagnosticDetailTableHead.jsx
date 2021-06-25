import { TableHead, TableCell } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';

const DiagnosticDetailTableHead = () => {
  return (
    <TableHead>
      <TableCell size="small" style={{ minWidth: '50px' }}>
          <StyledTypography variant="subtitle1" component="h5" weight={7}>
              묶음코드
          </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '50px' }}>
          <StyledTypography variant="subtitle1" component="h5" weight={7}>
              처방코드
          </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '150px' }}>
          <StyledTypography variant="subtitle1" component="h5" weight={7}>
              검사명
          </StyledTypography>
      </TableCell>
    </TableHead>
  );
};


export default DiagnosticDetailTableHead;