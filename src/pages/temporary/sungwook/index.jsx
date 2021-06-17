import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import ClrButton from './components/ClrButton';
import MedicineDrawer from './components/MedicineDrawer';
import Divider from '@material-ui/core/Divider';
import PageHeader from '../../../components/common/PageHeader';
const SungwookPage = (props) => {
  const [isOpened, setOpened] = useState(false);
  const [medData, setMedData] = useState([]);

  useEffect(() => {
    if (medData.length === 0) {
      return;
    }

    console.log(medData);
  }, [medData]);

  return (
    <Fragment>
      <PageHeader />
      <Divider />
      <div style={{ padding: '1rem' }}>
        <ClrButton
          setcolor="aliceblue"
          size="medium"
          onClick={() => setOpened(!isOpened)}
        >
          MedicineDrawer 열기
        </ClrButton>
        <MedicineDrawer
          isOpened={isOpened}
          setOpened={setOpened}
          setMedData={setMedData}
        />
        {medData.length !== 0 &&
          medData.map((data) => (
            <div>
              <p>{data.medicine_id}</p>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default SungwookPage;
