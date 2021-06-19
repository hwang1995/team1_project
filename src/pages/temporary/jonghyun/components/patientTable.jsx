import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('감자바', 159, 6.0, 24, 4.0),
  createData('박자스', 237, 9.0, 37, 4.3),
  createData('리액트', 262, 16.0, 24, 6.0),
  createData('프론트', 305, 3.7, 67, 4.3),
  createData('데스크', 356, 16.0, 49, 3.9),
  createData('안녕핫', 356, 16.0, 49, 3.9),
  createData('테스트', 356, 16.0, 49, 3.9),
  createData('홋홋홋', 356, 16.0, 49, 3.9),
  createData('므므므', 356, 16.0, 49, 3.9),
  createData('가나다', 356, 16.0, 49, 3.9),
  createData('라마바', 356, 16.0, 49, 3.9),
  createData('사아자', 356, 16.0, 49, 3.9),
  createData('차카타', 356, 16.0, 49, 3.9),
  createData('파하마', 356, 16.0, 49, 3.9),
  createData('람머스', 356, 16.0, 49, 3.9),
  createData('카직스', 356, 16.0, 49, 3.9),
  createData('브론즈', 356, 16.0, 49, 3.9),
  createData('다이아', 356, 16.0, 49, 3.9),
  createData('판테온', 356, 16.0, 49, 3.9),
  createData('장범준', 356, 16.0, 49, 3.9),
];

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell align="right">생년월일</TableCell>
            <TableCell align="right">성별</TableCell>
            <TableCell align="right">연락처</TableCell>
            <TableCell align="right">주소</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <Button>더보기</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
