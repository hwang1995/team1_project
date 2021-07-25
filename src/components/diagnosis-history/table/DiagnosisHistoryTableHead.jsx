import { TableHead, TableCell } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';

const DiagnosisHistoryTableHead = () => {
  return (
    <TableHead>
      <TableCell size="small" style={{ minWidth: '50px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          순번
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '80px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          이름
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '100px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          생년월일
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '50px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          성별
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '120px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          연락처
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '300px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          주소
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '100px' }} />
    </TableHead>
  );
};

export default DiagnosisHistoryTableHead;
