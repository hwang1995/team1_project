import React, { Fragment, useEffect, useState } from 'react';
import {
  SwipeableDrawer,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setDiagnosticDrawer } from 'redux/features/diagnostic/diagnosticSlice';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import StyledTypography from 'components/common/typography/StyledTypography';

const DiagnosticDrawer = () => {
  const { breakpoint } = useWindowSize();
  const [searchVal, setSearchVal] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => )

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    dispatch(setDiagnosticDrawer(open));
  };
};
