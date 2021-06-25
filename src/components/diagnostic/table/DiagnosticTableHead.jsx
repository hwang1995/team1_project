import { TableHead, TableCell } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';

const DiagnosticTableHead = () => {
  return (
    <TableHead>
      <TableCell size="small" style={{ minWidth: '50px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          순번
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '50px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          이름
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '80px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          생년월일
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '50px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          성별
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '180px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          진료 날짜
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '70px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          진료실
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '50px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          상태
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ width: '100px' }} />
    </TableHead>
  );
};

export default DiagnosticTableHead;
