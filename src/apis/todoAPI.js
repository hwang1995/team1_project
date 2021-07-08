import axios from 'axios';

/**
 * * 목적 : 해당 병원의 식별자 코드(hospitalCode)로 TODO 리스트를 출력하기 위한 API
 *
 * @param {String} hospitalCode
 * @returns {List<TodosDTO>} list
 * * [todos Entity]
 * * * !String todoContent
 * * * !String hospitalCode
 * * * !String createdDate
 * * * !int todo_id
 */
export const getTodosListByHospitalCode = async (hospitalCode) => {
  return await axios.get('https://localhost/api/v1/todo/search/code/', {
    params: {
      hospitalCode,
    },
  });
};

/**
 * * 목적 : 해당 임직원의 ID(memberId)로 TODO 리스트를 출력하기 위한 API
 *
 * @param {number} memberId
 * @returns {List<TodosDTO>} list
 * * [todos Entity]
 * * * !String todoContent
 * * * !String createdDate
 * * * !int todoId
 * * * !int memberId
 */
export const getTodosListByMemberId = async (memberId) => {
  return await axios.get('https://localhost/api/v1/todo/search/id/', {
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
 *
 */
export const createTodo = async (todoInfo) => {
  return await axios.post('https://localhost/api/v1/todo/', {
    params: {
      todoInfo,
    },
  });
};

/**
 * * 목적 : 해당 TODO 리스트를 삭제하기 위한 API
 *
 * @param {number} todoId
 * @returns {boolean} result
 * 성공: True, 실패: False
 *
 */
export const removeTodo = async (memberId) => {
  return await axios.delete('https://localhost/api/v1/todo/', {
    params: {
      memberId,
    },
  });
};
