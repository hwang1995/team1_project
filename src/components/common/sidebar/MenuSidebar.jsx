import React from 'react';
import { Divider, Collapse } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarInfo } from 'redux/features/common/commonSlice';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import { MdLocalHospital } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Sidebar from './Sidebar';

const MenuSidebar = () => {
  const dispatch = useDispatch();

  const { diagnosis, hospital, patient } = useSelector(
    (state) => state.common.sidebarInfo,
  );
  // const [isCollapsed, setCollapsed] = useState({
  //   diagnosis: false,
  //   hospital: false,
  //   patient: false,
  // });

  const history = useHistory();

  const handlePageChange = (page) => {
    history.push(page);
  };

  return (
    <Sidebar>
      <div className="info-container">
        <p>ABC Hospital</p>
        <p>destiny0810@naver.com</p>
      </div>
      <Divider light />
      <div
        className="collapse-container"
        onClick={() => {
          dispatch(
            setSidebarInfo({
              name: 'diagnosis',
              status: !diagnosis,
            }),
          );
        }}
      >
        <MdLocalHospital size={28} />
        <span>진료</span>
        <FiChevronDown size={22} />
      </div>

      <Collapse in={diagnosis}>
        <div className="collapsed-container">
          <div
            className="collapsed-item"
            onClick={() => handlePageChange('/dashboard/reservation')}
          >
            <AiOutlineCalendar size={22} />
            <span>진료 접수</span>
          </div>
          <div
            className="collapsed-item"
            onClick={() => handlePageChange('/dashboard/diagnosis')}
          >
            <AiOutlineCalendar size={22} />
            <span>진료 추가</span>
          </div>
          <div
            className="collapsed-item"
            onClick={() => handlePageChange('/dashboard/diagnostic')}
          >
            <AiOutlineCalendar size={22} />
            <span>진료 검사 보기</span>
          </div>
          <div
            className="collapsed-item"
            onClick={() => handlePageChange('/dashboard/diagnosis-history')}
          >
            <AiOutlineCalendar size={22} />
            <span>진료 기록 보기</span>
          </div>
        </div>
        <Divider light />
      </Collapse>

      <div
        className="collapse-container"
        onClick={() => {
          dispatch(
            setSidebarInfo({
              name: 'hospital',
              status: !hospital,
            }),
          );
        }}
      >
        <MdLocalHospital size={28} />
        <span>병원</span>
        <FiChevronDown size={22} />
      </div>

      <Collapse in={hospital}>
        <div className="collapsed-container">
          <div className="collapsed-item">
            <AiOutlineCalendar size={22} />
            <span>진료 접수</span>
          </div>
          <div className="collapsed-item">
            <AiOutlineCalendar size={22} />
            <span>진료 추가</span>
          </div>
          <div className="collapsed-item">
            <AiOutlineCalendar size={22} />
            <span>진료 검사 보기</span>
          </div>
          <div className="collapsed-item">
            <AiOutlineCalendar size={22} />
            <span>진료 기록 보기</span>
          </div>
        </div>
        <Divider light />
      </Collapse>

      <div
        className="collapse-container"
        onClick={() => {
          dispatch(
            setSidebarInfo({
              name: 'patient',
              status: !patient,
            }),
          );
        }}
      >
        <MdLocalHospital size={28} />
        <span>환자</span>
        <FiChevronDown size={22} />
      </div>

      <Collapse in={patient}>
        <div className="collapsed-container">
          <div className="collapsed-item">
            <AiOutlineCalendar size={22} />
            <span>진료 접수</span>
          </div>
          <div className="collapsed-item">
            <AiOutlineCalendar size={22} />
            <span>진료 추가</span>
          </div>
          <div className="collapsed-item">
            <AiOutlineCalendar size={22} />
            <span>진료 검사 보기</span>
          </div>
          <div className="collapsed-item">
            <AiOutlineCalendar size={22} />
            <span>진료 기록 보기</span>
          </div>
        </div>
        <Divider light />
      </Collapse>
    </Sidebar>
  );
};

export default MenuSidebar;
