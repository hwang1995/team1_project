import React, { useState, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import ClrButton from './ClrButton';
import SearchContainer from './SearchContainer';

/**
 * * 목표 : 검색 항목을 나타내기 위한 컴포넌트
 * @param {object} data
 * @param {function} addMedicine
 * @returns {JSX.Element} view
 * @author SUNG WOOK HWANG
 */
const SearchItem = ({ data, addMedicine }) => {
  // 갯수를 설정하기 위한 상태
  const [count, setCount] = useState(1);

  const { enqueueSnackbar } = useSnackbar();
  const handleAlert = useCallback(
    (variant, message) => {
      enqueueSnackbar(message, {
        variant,
      });
    },
    [enqueueSnackbar],
  );

  // 항목을 추가하기 위한 이벤트 함수
  const addItem = useCallback(
    (data, count) => {
      addMedicine({ ...data, count });
    },
    [addMedicine],
  );

  // 항목의 갯수를 추가하기 위한 이벤트 함수
  const handlePlusBtn = useCallback(() => {
    setCount((prevState) => prevState + 1);
  }, []);

  // 항목의 갯수를 제거하기 위한 이벤트 함수
  const handleMinusBtn = useCallback(() => {
    setCount((prevState) => {
      if (prevState <= 1) {
        handleAlert('error', '수량은 마이너스가 될 수 없습니다.');
        return prevState;
      }
      return prevState - 1;
    });
  }, [handleAlert]);

  return (
    <SearchContainer key={data.medicineId}>
      <h2>{data.medicineName}</h2>
      <p>
        약품 코드: {data.medicineCode} | 약품 타입 : {data.medicineType} | 캡슐
        타입 : {data.medicineUnit}
      </p>
      <div className="button-area">
        <div className="count-container">
          <IconButton type="button" onClick={handlePlusBtn}>
            <AiOutlinePlusCircle size={24} />
          </IconButton>
          <span className="text-area">{count}</span>
          <IconButton type="button" onClick={handleMinusBtn}>
            <AiOutlineMinusCircle size={24} />
          </IconButton>
        </div>
        <ClrButton
          className="margin-button"
          setcolor="aliceblue"
          onClick={() => addItem(data, count)}
        >
          추가
        </ClrButton>
      </div>
    </SearchContainer>
  );
};

export default React.memo(SearchItem);
