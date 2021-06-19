import React, { useCallback } from 'react';
import SearchContainer from './SearchContainer';
import ClrButton from './ClrButton';

const MedicineItem = ({ data, removeMedicine }) => {
  const handleRemoveBtn = useCallback(
    (data) => {
      console.log(data);
      removeMedicine(data);
    },
    [removeMedicine],
  );
  return (
    <SearchContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ flex: 3, margin: 0 }}>
          {data.medicine_name} | {data.count}개
        </h2>
        <div>
          <ClrButton setcolor="red" onClick={() => handleRemoveBtn(data)}>
            삭제
          </ClrButton>
        </div>
      </div>
    </SearchContainer>
  );
};

export default MedicineItem;
