import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Container, Divider } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import {
  addDiagnosticGroupItem,
  addDiagnosticInfo,
  removeDiagnosticInfo,
} from 'redux/features/diagnosis/diagnosisSlice';
import { searchDiagnosticListByCode } from 'apis/searchAPI';

const DiagnosticContainer = styled(Container)`
  width: 100%;
  padding: 0.5rem;

  // 임시
  display: flex;
  flex-direction: row;

  .group-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 100px;
    min-height: 100px;
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.12);

    .title {
      text-align: center;
      font-weight: 700;
      font-size: 1.2rem;
      margin-top: 0.4rem;
      margin-bottom: 0.6rem;
    }
    .group-code-container {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;

      .group-code {
        font-family: 'Lato';
        font-size: 1.5rem;
      }
    }
  }

  .prescription-container {
    display: flex;
    flex-direction: column;
    flex: 3;
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-left: none;

    .row {
      display: flex;
      align-items: center;
      font-size: 0.85rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      height: 25%;
      span {
        margin-right: 0.5rem;
      }
      .title {
        font-weight: 700;
      }
      .content {
        font-weight: 300;
      }
      .button-area {
        width: 100%;
        background: white;
        text-align: right;
        .add-button {
          background: #3b5bdb;
          color: white;
        }
        .remove-button {
          background: #e03131;
          color: white;
        }
        button {
          font-weight: 700;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0.2rem;
          padding-left: 5px;
          padding-right: 5px;
          border-radius: 6px;
          font-size: 0.7rem;
          letter-spacing: -0.5px;
          margin-left: 0.5rem;
        }
      }
    }
  }

  .MuiDivider-root {
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
  }
`;

const DiagnosticItem = ({ data, isRemove }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const handleAddButton = (data) => {
    dispatch(addDiagnosticInfo(data));
  };

  const handleRemoveButton = (data) => {
    dispatch(removeDiagnosticInfo(data));
  };

  const handleGroupButton = async (data) => {
    const { bundleCode } = data;
    try {
      const result = await searchDiagnosticListByCode(bundleCode);
      dispatch(addDiagnosticGroupItem(result));
    } catch (error) {
      const { message } = error.response.data;
      handleAlert('error', message);
    }

    // dispatch(addDiagnosticGroupItem({ bundleCode }));
  };
  return (
    <DiagnosticContainer>
      <div className="group-container">
        <p className="title">그룹 코드 </p>
        <Divider />
        <div className="group-code-container">
          <p className="group-code">{data.bundleCode}</p>
        </div>
      </div>

      <div className="prescription-container">
        <div className="row">
          <span className="title">그룹 명</span>
          <span>|</span>
          <span className="content">{data.bundleName}</span>
        </div>
        <div className="row">
          <span className="title">처방 코드</span>
          <span>|</span>
          <span className="content">{data.presCode}</span>
        </div>
        <div className="row">
          <span className="title">처방 명</span>
          <span>|</span>
          <span className="content">{data.presName}</span>
        </div>
        <div className="row">
          <div className="button-area">
            {!isRemove && (
              <Fragment>
                <button
                  className="add-button"
                  style={{}}
                  onClick={() => handleAddButton(data)}
                >
                  추가
                </button>
                <button
                  className="add-button"
                  style={{}}
                  onClick={() => handleGroupButton(data)}
                >
                  그룹 추가
                </button>
              </Fragment>
            )}
            {isRemove && (
              <button
                className="remove-button"
                style={{}}
                onClick={() => handleRemoveButton(data)}
              >
                삭제하기
              </button>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </DiagnosticContainer>
  );
};

export default React.memo(DiagnosticItem);
