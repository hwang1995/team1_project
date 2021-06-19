import React, { useState } from 'react';
import { Divider, Collapse } from '@material-ui/core';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import { MdLocalHospital } from 'react-icons/md';
import Sidebar from './Sidebar';

const MenuSidebar = () => {
  const [isCollapsed, setCollapsed] = useState({
    diagnosis: false,
    hospital: false,
    patient: false,
  });

  return (
    <Sidebar>
      <div className="info-container">
        <p>ABC Hospital</p>
        <p>destiny0810@naver.com</p>
      </div>
      <Divider light />
      <div
        className="collapse-container"
        onClick={() =>
          setCollapsed((prevState) => ({
            ...prevState,
            diagnosis: !prevState.diagnosis,
          }))
        }
      >
        <MdLocalHospital size={28} />
        <span>진료</span>
        <FiChevronDown size={22} />
      </div>

      <Collapse in={isCollapsed.diagnosis}>
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
        onClick={() =>
          setCollapsed((prevState) => ({
            ...prevState,
            hospital: !prevState.hospital,
          }))
        }
      >
        <MdLocalHospital size={28} />
        <span>병원</span>
        <FiChevronDown size={22} />
      </div>

      <Collapse in={isCollapsed.hospital}>
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
        onClick={() =>
          setCollapsed((prevState) => ({
            ...prevState,
            patient: !prevState.patient,
          }))
        }
      >
        <MdLocalHospital size={28} />
        <span>환자</span>
        <FiChevronDown size={22} />
      </div>

      <Collapse in={isCollapsed.patient}>
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
