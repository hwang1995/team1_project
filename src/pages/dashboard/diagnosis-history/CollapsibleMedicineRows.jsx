import React, { Fragment } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StyledTypography from 'components/common/typography/StyledTypography';


const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const CollapsibleMedicineRows = ({ data }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              약품 코드
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              약품 명
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              약품 타입
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              약품 규격
            </StyledTypography>
          </TableCell>
          <TableCell>
            <StyledTypography variant="subtitle1" component="h5" weight={7}>
              처방 량
            </StyledTypography>
          </TableCell>
        </TableHead>

        <TableBody>
          {data.map((rows) => (
            <Fragment>
              <TableRow>
                <TableCell size="small">{rows.medicine_code}</TableCell>
                <TableCell size="small" 
                aria-owns={open ? 'mouse-over-popover' : undefined}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose} 
                >{rows.medicine_name}</TableCell>
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                      paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >

                      <StyledTypography variant="subtitle1" weight={7}>
                        <p>효능효과 : </p>
                        <p>1. 활동성 위ㆍ십이지장 궤양 치료 및 십이지장 궤양 재발방지</p>
                        <p>2. 내시경상으로 진단된 미란성 및 궤양성 식도염, 위식도 역류질환(GERD)에 기인한 가슴쓰림(heartburn) 증상의 치료</p>
                        <p>3. 다음 질환의 위점막병변(미란, 출혈, 발적, 부종)의 개선: 급성위염, 만성위염의 급성 악화기</p>
                        <p>[네이버 지식백과] 액시드캡슐150mg [Axid Cap. 150mg] (의약품 사전)</p>
                      </StyledTypography>
                      
                    
                </Popover>
                <TableCell size="small">{rows.medicine_type}</TableCell>
                <TableCell size="small">{rows.medicine_unit}</TableCell>
                <TableCell size="small">{rows.medicine_dose}</TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleMedicineRows;
