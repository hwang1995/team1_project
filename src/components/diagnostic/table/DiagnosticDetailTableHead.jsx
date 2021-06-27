import { TableHead, TableCell } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';

const DiagnosticDetailTableHead = () => {
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

      <TableCell size="small" style={{ minWidth: '200px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          검사명
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '80px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          결과값
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '130px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          평균값
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '100px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          검체명
        </StyledTypography>
      </TableCell>
      <TableCell size="small" style={{ minWidth: '100px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          용기
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
      <TableCell size="small" style={{ minWidth: '50px' }}>
        <StyledTypography variant="subtitle1" component="h5" weight={7}>
          상태
        </StyledTypography>
      </TableCell>
    </TableHead>
  );
};

export default DiagnosticDetailTableHead;
