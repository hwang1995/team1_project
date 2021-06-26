import { useState, useCallback } from 'react';
import moment from 'moment';

const useCalendar = () => {
  const [calInfo, setCalInfo] = useState({
    weekNo: moment().week(),
    startDate: moment(moment().startOf('week').toDate()).format(
      'YYYY년 MM월 DD일',
    ),
    endDate: moment(moment().endOf('week').toDate()).format('YYYY년 MM월 DD일'),
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
  }, []);

  return [calInfo, getPrevWeek, getNextWeek, reset];
};

export default useCalendar;