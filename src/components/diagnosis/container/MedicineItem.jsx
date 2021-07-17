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
          {data.medicineName} | {data.count}개
        </h2>
        <div>
          <ClrButton setcolor="#495057" onClick={() => handleRemoveBtn(data)}>
            <span style={{ color: 'white' }}>삭제</span>
          </ClrButton>
        </div>
      </div>
    </SearchContainer>
  );
};

export default MedicineItem;
