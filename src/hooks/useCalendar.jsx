import { useState, useCallback } from 'react';
import moment from 'moment';

/**
 * [calInfo, sendCalInfo, getPrevWeek, getNextWeek, reset]
 * * 캘린더 정보를 가져오기 위한 Custom Hook
 * @returns [calInfo : object, sendCalInfo : object , getPrevWeek : function, getNextWeek : function, reset : function]
 * * calInfo는 선택 주가 몇번 째 주인지 (weekNo), startDate (주의 시작), endDate(주의 마지막)의 대한 정보를 담고 있음.
 * * sendCalInfo는 서버랑 데이터를 통신할 때에 YYYY-MM-DD 형식으로 보내기 위해서 정의함.
 * * getPrevWeek은 호출 시에 해당 주의 지난 주의 값을 가져옴.
 * * getNextWeek은 호출 시에 해당 주의 다음 주의 값을 가져옴.
 * * reset은 이번 주의 값으로 초기화 함.
 * @author SUNG WOOK HWANG
 */
const useCalendar = () => {
  const [calInfo, setCalInfo] = useState({
    weekNo: moment().week(),
    startDate: moment(moment().startOf('week').toDate()).format(
      'YYYY년 MM월 DD일',
    ),
    endDate: moment(moment().endOf('week').toDate()).format('YYYY년 MM월 DD일'),
  });

  const [sendCalInfo, setSendCalInfo] = useState({
    weekNo: moment().week(),
    startDate: moment(moment().startOf('week').toDate()).format('YYYY-MM-DD'),
    endDate: moment(moment().endOf('week').toDate()).format('YYYY-MM-DD'),
  });

  const getPrevWeek = useCallback(() => {
    setCalInfo((prevState) => {
      const newState = prevState;
      const { weekNo } = newState;
      return {
        weekNo: weekNo - 1,
        startDate: moment(
          moment()
            .week(weekNo - 1)
            .startOf('week')
            .toDate(),
        ).format('YYYY년 MM월 DD일'),
        endDate: moment(
          moment()
            .week(weekNo - 1)
            .endOf('week')
            .toDate(),
        ).format('YYYY년 MM월 DD일'),
      };
    });

    setSendCalInfo((prevState) => {
      const newState = prevState;
      const { weekNo } = newState;
      return {
        weekNo: weekNo - 1,
        startDate: moment(
          moment()
            .week(weekNo - 1)
            .startOf('week')
            .toDate(),
        ).format('YYYY-MM-DD'),
        endDate: moment(
          moment()
            .week(weekNo - 1)
            .endOf('week')
            .toDate(),
        ).format('YYYY-MM-DD'),
      };
    });
  }, []);

  const getNextWeek = useCallback(() => {
    setCalInfo((prevState) => {
      const newState = prevState;
      const { weekNo } = newState;
      return {
        weekNo: weekNo + 1,
        startDate: moment(
          moment()
            .week(weekNo + 1)
            .startOf('week')
            .toDate(),
        ).format('YYYY년 MM월 DD일'),
        endDate: moment(
          moment()
            .week(weekNo + 1)
            .endOf('week')
            .toDate(),
        ).format('YYYY년 MM월 DD일'),
      };
    });

    setSendCalInfo((prevState) => {
      const newState = prevState;
      const { weekNo } = newState;
      return {
        weekNo: weekNo + 1,
        startDate: moment(
          moment()
            .week(weekNo + 1)
            .startOf('week')
            .toDate(),
        ).format('YYYY-MM-DD'),
        endDate: moment(
          moment()
            .week(weekNo + 1)
            .endOf('week')
            .toDate(),
        ).format('YYYY-MM-DD'),
      };
    });
  }, []);

  const reset = useCallback(() => {
    setCalInfo({
      weekNo: moment().week(),
      startDate: moment(moment().startOf('week').toDate()).format(
        'YYYY년 MM월 DD일',
      ),
      endDate: moment(moment().endOf('week').toDate()).format(
        'YYYY년 MM월 DD일',
      ),
    });

    setSendCalInfo({
      weekNo: moment().week(),
      startDate: moment(moment().startOf('week').toDate()).format('YYYY-MM-DD'),
      endDate: moment(moment().endOf('week').toDate()).format('YYYY-MM-DD'),
    });
  }, []);

  return [calInfo, sendCalInfo, getPrevWeek, getNextWeek, reset];
};

export default useCalendar;
