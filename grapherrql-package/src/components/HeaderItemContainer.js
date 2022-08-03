import { StyledHeaderItemContainer } from './LiveMode/styles/HeaderItemContainer.styled';
import { BlinkingComponent } from './LiveMode/styles/AnimatedComponent.styled';
import { BsToggle2Off, BsToggle2On, BsPlayCircle } from 'react-icons/bs';


function HeaderItemContainer({ liveMode, handleToggleClick }) {
  return (
    <>
      <>
        
        <StyledHeaderItemContainer>
          <p >Live Mode</p>
          {liveMode ? (
            <BlinkingComponent>
              <BsToggle2On
                size='4em'
                color='red'
                onClick={() => handleToggleClick()}
              />
            </BlinkingComponent>
          ) : (
            <BsToggle2Off
              size='4em'
              color='white'
              onClick={() => handleToggleClick()}
            />
          )}
          <p style={{ color: 'white' }}> {liveMode ? 'On' : 'Off'}</p>
        </StyledHeaderItemContainer>
      </>
    </>
  );
}

export default HeaderItemContainer;
