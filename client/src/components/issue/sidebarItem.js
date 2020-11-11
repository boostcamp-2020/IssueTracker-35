import React, { useState } from 'react';
import styled from 'styled-components';
import CogWheel from '@/styles/svgs/cogwheel';
import color from '@/styles/colors';
import size from '@/styles/sizes';
import Modal from '@/components/issue/modal';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${color.LIGHT_GRAY};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${color.DARK_GRAY};

  &:hover {
    cursor: pointer;
    color: ${color.BLUE};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 1rem;
  font-size: 14px;
  margin: 0 0 10px 0;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 14px;
  margin: 10px 0;
`;

const ProfileImage = styled.img`
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  margin-right: 5px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
`;

const Nickname = styled.span`
  font-size: ${size.DEFAULT_FONT_SIZE};
`;

const AssigneeProfile = styled.div`
  display: flex;
  align-items: center;
`;

const AssigneeContainer = styled.div`
  display: flex;
  flex: 1 1;
  justify-content: flex-start;
  margin-bottom: 9px;
`;

const SideBarItem = ({
  headerText,
  title,
  content,
  handleChange,
  selected,
  component,
}) => {
  const [isVisible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = checked => {
    setVisible(false);
    handleChange(checked);
  };

  return (
    <Container>
      <Header onClick={showModal}>
        <Title>{title}</Title>
        <CogWheel />
      </Header>
      <Body>
        {selected?.size
          ? [...selected.values()].map(user => (
            <AssigneeContainer key={user.nickname}>
              <AssigneeProfile>
                <ProfileImage src={user.image} />
                <Nickname>{user.nickname}</Nickname>
              </AssigneeProfile>
            </AssigneeContainer>
          ))
          : content}
      </Body>
      {isVisible && (
        <Modal
          title={headerText}
          selected={selected}
          hideModal={hideModal}
          component={component}
        ></Modal>
      )}
    </Container>
  );
};

export default SideBarItem;
