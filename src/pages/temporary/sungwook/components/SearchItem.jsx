import React, { useState, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import ClrButton from './ClrButton';
import SearchContainer from './SearchContainer';

const SearchItem = ({ data, addMedicine }) => {
  const [count, setCount] = useState(1);

  const addItem = useCallback(
    (data, count) => {
      addMedicine({ ...data, count });
    },
    [addMedicine],
  );

  const handlePlusBtn = useCallback(() => {
    setCount((prevState) => prevState + 1);
  }, []);

  const handleMinusBtn = useCallback(() => {
    setCount((prevState) => {
      if (prevState <= 1) {
        alert('MINUS');
        return prevState;
      }
      return prevState - 1;
    });
  }, []);

  return (
    <SearchContainer key={data.medicine_id}>
      <h2>{data.medicine_name}</h2>
      <p>
        약품 코드: {data.medicine_code} | 약품 타입 : {data.medicine_type} |
        캡슐 타입 : {data.medicine_unit}
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
          Add
        </ClrButton>
      </div>
    </SearchContainer>
  );
};

export default React.memo(SearchItem);
