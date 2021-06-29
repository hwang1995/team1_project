
import React, {useState} from "react";
import InformationButton from '../InformationButton';
import RgbColor from '../util/rgb';
import MainDrawer from './MainDrawer';

function DrawerComponent(props) {

  const [isOpened, setOpened] = useState(false);

  const openedClick = () => {
    setOpened(true);
  }

  const isClosed = () =>{
    setOpened(false);
  }

  return (
    <div>
      <InformationButton
        name={RgbColor.color_reservation}
        widthvalue="200px"
        onClick={openedClick}
      >
        Click!!
      </InformationButton>
      <MainDrawer isOpened={isOpened} isClosed={isClosed}/>
    </div>
  );
}

export default DrawerComponent;
