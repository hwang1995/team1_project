import React, { useCallback } from 'react';
import SearchContainer from './SearchContainer';
import ClrButton from './ClrButton';

/**
 * * 약품의 상세 정보를 담은 Template 컴포넌트
 * @param {object} data
 * @param {function} removeMedicine
 * @returns {JSX.Element} view
 * @author SUNG WOOK HWANG
 */
const MedicineItem = ({ data, removeMedicine }) => {
  // 약품을 제거하기 위한 이벤트 함수
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
