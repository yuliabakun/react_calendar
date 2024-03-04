import styled from 'styled-components';
import { TaskItemProps } from '../shared/types';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/globalState/hooks';
import { deleteTaskById, updateTask } from '../shared/globalState/features/taskSlice';
import { TagItem } from './TagItem';
import iconClose from '../shared/assets/icon-plus-gray.svg';
import iconEdit from '../shared/assets/icon-edit.svg';

const Container = styled.div`
  margin: 5px;
  padding: 5px;
  background-color: #FFFFFF;
  border: 1px solid #E9E2D64C;
  border-radius: 3px;
  box-shadow: 0 4px 30px #00000019;
  cursor: pointer;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3px;
  cursor: move;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
`;

const ControlButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #929598;
  padding: 5px;

  &:hover {
    background-color: #9795934b;
    border-radius: 5px;
  }
`;

const TaskContainer = styled.span`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const IconClose = styled.img`
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
`;

const Icon = styled.img`
  width: 10px;
  height: 10px;
`;

const EditInput = styled.input`
  padding: 10px;
`;

const ButtonsContainer = styled.span`
  display: flex;
  gap: 5px;
  justify-content: space-evenly;
`;

const Button = styled.button`
  padding: 1px;
  border: none;
  font-family: 'Montserrat', sans-serif;
  border-radius: 2px;
  cursor: pointer;
  background-color: #E3E4E6;

  &:hover {
    background-color: #FD9F01;
  }
`;

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const { tagsCreated } = useAppSelector(state => state.tag);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.description);
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const pressedKey = event.key;

    if (pressedKey === 'Enter') { handleSave() }

    if (pressedKey === 'Escape') { setIsEditing(false) }
  }

  const handleSave = () => {
    setIsEditing(false);

    const updatedTask = {
      ...task,
      description: text,
    };

    dispatch(updateTask(updatedTask));
  }

  const getTagsToRender = () => {
    if (task.tags.length > 0) {
      const tags = tagsCreated.filter(tag => task.tags.includes(tag.name));

      return (
        <TagsContainer>
          {tags.map(tag => <TagItem key={tag.id} tag={tag} />)}
        </TagsContainer>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {isEditing ? (
        <Container>
          <EditInput
            type='text'
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyUp={(event) => handleKeyUp(event)}
          />

          <ButtonsContainer>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </ButtonsContainer>
        </Container>
      ) : (
        <Container
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          {getTagsToRender()}

          <TaskContainer>
            {task.description}

            {isHovered && (
              <div>
                <ControlButton onClick={() => setIsEditing(true)}>
                  <Icon src={iconEdit} />
                </ControlButton>

                <ControlButton onClick={() => dispatch(deleteTaskById(task.id))}>
                  <IconClose src={iconClose} />
                </ControlButton>
              </div>
            )}
          </TaskContainer>
        </Container>
      )}
    </>
  )
}
