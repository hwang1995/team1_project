import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Modal, Backdrop, IconButton } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import { setDiagnosisModal } from 'redux/features/diagnosis/diagnosisSlice';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    minHeight: '400px',
    minWidth: '400px',
    maxWidth: '920px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0,0,0,0.12)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
