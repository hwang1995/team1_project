import { TableHead, TableCell } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';

const DiagnosticDetailInputTableHead = () => {
  return (
    <TableHead>
      <TableCell size="small" style={{ minWidth: '80px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          묶음코드
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '80px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          처방코드
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '150px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          묶음명
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '150px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          검사명
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '150px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          결과값
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '100px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          평균값
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '80px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          진료의
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '80px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          검사담당자
        </StyledTypography>
      </TableCell>
    </TableHead>
  );
};

export default DiagnosticDetailInputTableHead;
