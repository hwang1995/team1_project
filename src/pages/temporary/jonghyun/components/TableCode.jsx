import React, { useEffect, useState } from 'react'; //리액트 임포트
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  //기존 테이블 관련 컴포넌트
  TablePagination,
  Button,
  Input,
  //테이블 페이지 관련 컴포넌트
} from '@material-ui/core';
import medicineData from '../resources/medicine.json';

/*
  <table> 엘리먼트 뿐만 아니라 <tr>,<td>,<thead>,<tbody>
  와 같은 추가적인 엘리먼트가 필요.
  Material UI를 사용해서 테이블을 구성할때도 마찬가지.
  -> <Table/>컴포넌트와 더불어
     <TableRow/>,<TableCell/>,<TableHead>,<TableBody>,<TableContainer>
  와 같은 컴포넌트를 함꼐 사용해야함.
*/

function TableCode(props) {
  /*Hook은 함수 컴포넌트에서 React state와 생명주기 기능을
  연동 할 수 있게해주는 함수 (only Function 스타일에서만 동작)*/

  //"page", "medicines" 라는 새로운 상태 값을 정의, useState()안에 초기값 정의 가능.
  const [page, setPage] = useState(0);
  const [medicines, setMedicine] = useState(medicineData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  //페이지상태 이벤트(페이지 이동시)
  const handleChangePage = (event, newPage) => {
    console.log('newPage: ', newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Medicine 추가 이벤트처리
  const addMedicine = (event) => {
    setMedicine((medicineData) => [
      ...medicineData,
      {
        medicine_name: 'asdasd',
        medicine_code: 'BLAHBLAH',
      },
    ]);
  };

  //검색함수
  const searchMedicine = (event) => {
    setSearch(event.target.value);
  };

  /*
    리액트 컴포넌트안에서 데이터를 가져오거나 구독하고,
    DOM을 직접 조작하는 작업 : "effects"
    useEffect는 함수 컴포넌트 내에서 이런 이팩트를 수행할 수 있음./
    즉, 컴포넌트가 렌더링될때마다 특정작업을 실행할 수 있도록 하는 Hook
  */

  //테이블컴포넌트에 대한 JSX 코드
  return (
    <>
      <Input onChange={searchMedicine} />
      <Button onClick={addMedicine}>BLAH 데이터 추가</Button>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>약 코드</TableCell>
              <TableCell>약 타입</TableCell>
              <TableCell>약 단위</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines
              .filter(function (element) {
                //새로운 배열을 만들어줌
                return element.medicine_code.includes(search);
              })
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(
                (
                  { medicine_id, medicine_code, medicine_type, medicine_unit },
                  i,
                ) => (
                  <TableRow key={medicine_id}>
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + i + 1}
                    </TableCell>
                    <TableCell>{medicine_code}</TableCell>
                    <TableCell>{medicine_type}</TableCell>
                    <TableCell>{medicine_unit}</TableCell>
                  </TableRow>
                ),
              )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={medicines.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableCode;
