import { useState, useCallback } from 'react';

/**
 * 사용 방법
 * const [{username, email}, onChange, reset] = useInputs({
 * username: '', email: ''})
 *
 * <input {...username}/> <input {...email}/>
 * @param {*} initialForm
 * @returns
 */
const useFormInput = (initialForm) => {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
};

export default useFormInput;
