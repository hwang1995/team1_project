import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { SwipeableDrawer, Container, Grid, Divider } from '@material-ui/core';
import DrawerHeader from './DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import SearchBox from './SearchBox';
import Spinner from './Spinner';
import InjectorData from '../injector';
import InjectorItem from './InjectorItem';

const InjectorDrawer = ({ isOpened, setOpened }) => {
  const { breakpoint } = useWindowSize();
  const [searchVal, setSearchVal] = useState('');
  const [selInjector, setSelInjector] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (breakpoint === undefined) return;
  }, [breakpoint]);

  useEffect(() => {
    if (searchVal === '') return;
    console.log(searchVal);
    setLoading(false);

    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [searchVal]);

  useEffect(() => {
    if (selInjector === []) {
      return;
    }
    console.log('addInjector', selInjector);
  }, [selInjector]);

  const addInjector = useCallback((data) => {
    const findItem = (element) => {
      if (element.medicine_id === data.medicine_id) return true;
    };

    setSelInjector((prevState) => {
      const newState = prevState;

      const isDuplicatedItem = newState.find(findItem);

      if (isDuplicatedItem) {
        return prevState;
      } else {
        return [...newState, data];
      }
    });
  }, []);

  const removeInjector = useCallback((data) => {
    setSelInjector((prevState) => {
      const newState = prevState.filter((dataInfo) => {
        if (dataInfo.medicine_id === data.medicine_id) return false;
        return true;
      });
      return newState;
    });
  }, []);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpened(open);
  };

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <Container maxWidth="md">
          <DrawerHeader breakpoint={breakpoint}>
            <h1>주사 처방하기</h1>
            <div>
              <AiOutlineClose size={32} onClick={() => setOpened(false)} />
            </div>
          </DrawerHeader>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SearchBox
                setSearchVal={setSearchVal}
                placeholder="주사 이름을 입력해주세요."
              />
              {searchVal === '' && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src="/assets/image/searchinfo.png"
                    width="70%"
                    alt="search"
                  />
                </div>
              )}
              {searchVal !== '' && !isLoading && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                  }}
                >
                  <Spinner />
                </div>
              )}
              {searchVal !== '' && isLoading && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '1rem',
                    width: '100%',
                    height: '90vh',
                    overflowY: 'scroll',
                  }}
                >
                  <Divider />
                  {InjectorData.filter(({ medicine_name }) =>
                    medicine_name.includes(searchVal),
                  ).map((data) => (
                    <Fragment key={data.medicine_name}>
                      <Divider />
                      <InjectorItem data={data} addInjector={addInjector} />
                    </Fragment>
                  ))}
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default InjectorDrawer;
