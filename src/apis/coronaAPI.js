import axios from 'axios';

/**
 * * 목적 : 해당 병원의 식별자 코드(hospitalCode)로 TODO 리스트를 출력하기 위한 API
 *
 * @param {String} from
 * @param {String} to
 * @returns coronaData
 * * [todos Entity]
 * * * !String todoContent
 * * * !String hospitalCode
 * * * !String createdDate
 * * * !int todo_id
 * @author HYEONG YUN KIM
 */
export const getCoronaData = async () => {
  return await axios.get(
    'https://api.covid19api.com/live/country/kr/status/confirmed/date/2021-07-15',
  );
};
