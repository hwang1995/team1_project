import { useState } from 'react';

/**
 * * 입력 값을 편안하게 받기 위해 제작한 Custom Hook
 * * 사용 법 : Element에  {...지정한 Hook의 변수 이름} 을 기입하면 사용가능.
 * @param {object} defaultValue (어떤 값이 들어와도 상관 없음.)
 * @returns {object, function} value, onChange
 * @author SUNG WOOK HWANG
 */
const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  return { value, onChange };
};

export default useInput;
