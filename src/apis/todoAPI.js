import axios from 'axios';

/**
 * * 목적 : 해당 병원의 식별자 코드(hospitalCode)로 TODO 리스트를 출력하기 위한 API
 *
 * @param {String} hospitalCode
 * @returns {List<TodosDTO>} todoList
 * * [todos Entity]
 * * * !String todoContent
 * * * !String hospitalCode
 * * * !String createdDate
 * * * !int todo_id
 * @author HYEONG YUN KIM
 */
export const getTodosListByHospitalCode = async (hospitalCode) => {
  return await axios.get('/todo/search/code/', {
    params: {
      hospitalCode,
    },
  });
};

/**
 * * 목적 : 해당 임직원의 ID(memberId)로 TODO 리스트를 출력하기 위한 API
 *
 * @param {number} memberId
 * @returns {List<TodosDTO>} todoList
 * * [todos Entity]
 * * * !String todoContent
 * * * !String createdDate
 * * * !int todoId
 * * * !int memberId
 * @author HYEONG YUN KIM
 */
export const getTodosListByMemberId = async (memberId) => {
  return await axios.get('/todo/search/id/', {
    params: {
      memberId,
    },
  });
};

/**
 * * 목적 : 해당 TODO 리스트를 등록하기 위한 API
 *
 * @param {TodosDTO} todoInfo
 * * [todos Entity]
 * * * !String todoContent
 * * * LocalDateTime createdDate
 * * * !int memberId
 * * * !String hospitalCode
 * @returns {boolean} result
 * 성공: True, 실패: False
 * @author HYEONG YUN KIM
 */
export const createTodo = async (todoInfo) => {
  return await axios.post('/todo', todoInfo);
};

/**
 * * 목적 : 해당 TODO 리스트를 삭제하기 위한 API
 *
 * @param {number} todoId
 * @returns {boolean} result
 * 성공: True, 실패: False
 * @author HYEONG YUN KIM
 */
export const removeTodo = async (todoId) => {
  return await axios.delete('/todo/', {
    params: {
      todoId,
    },
  });
};

/**
 * * 목적 : 해당 TODO의 CHECKED를 1로 수정하기 위한 API
 *
 * @param {number} todoId
 * @returns {boolean} result
 * 성공: True, 실패: False
 * @author HYEONG YUN KIM
 */
export const modifyCheckedIn = async (todoId) => {
  return await axios.put('todo/in?todoId=' + todoId);
};

/**
 * * 목적 : 해당 TODO의 CHECKED를 0으로 수정하기 위한 API
 *
 * @param {number} todoId
 * @returns {boolean} result
 * 성공: True, 실패: False
 * @author HYEONG YUN KIM
 */
export const modifyCheckedOut = async (todoId) => {
  return await axios.put('todo/out?todoId=' + todoId);
};