import { useState } from 'react';
import LoggerBox from './LiveMode/LoggerBox';
import HeaderGif from '../images/HeaderGif.gif';
import HeaderRightPic from '../images/HeaderRightPic.png'
import { Logo, StyledHeader, HeaderRight } from './LiveMode/styles/Header.styled';
import { StyledBody } from './LiveMode/styles/LoggerBox.styled';
import HeaderItemContainer from './HeaderItemContainer';
import Display from './SandboxMode/Display';

function Header() {
  const [liveMode, setLiveMode] = useState(false);

  const handleToggleClick = () => {
    setLiveMode((previousToggle) => {
      return !previousToggle;
    });
  };

  return (
    <div>
      <StyledHeader>
        <Logo src={HeaderGif} alt='Logo' />
        <HeaderItemContainer
          liveMode={liveMode}
          handleToggleClick={handleToggleClick}
        />
        <HeaderRight src={HeaderRightPic}/>
      </StyledHeader>
      <StyledBody>{liveMode ? <LoggerBox /> : <Display />}</StyledBody>
    </div>
  );
}

export default Header;
