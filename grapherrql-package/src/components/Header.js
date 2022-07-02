import { React, useState } from 'react';
import LoggerBox from './LoggerBox';
import QueryBox from './QueryBox';
import logo from '../images/GraphErrlogo.svg';
import { Logo, StyledHeader } from './styles/Header.styled';
import { StyledBody } from './styles/LoggerBox.styled';
import HeaderItemContainer from './HeaderItemContainer';

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
        <Logo src={logo} alt='Logo' />
        <HeaderItemContainer
          liveMode={liveMode}
          handleToggleClick={handleToggleClick}
        />
      </StyledHeader>
      <StyledBody>{liveMode ? <LoggerBox /> : <QueryBox />}</StyledBody>
    </div>
  );
}

export default Header;
