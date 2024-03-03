import styled from 'styled-components';
import { Task } from '../shared/types';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/globalState/hooks';
import { updateTask } from '../shared/globalState/features/taskSlice';
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

  &:hover {
    color: black;
    background-color: #E9E2D64C;
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

type Props = {
  task: Task,
  onTaskDelete: (v: string) => void,
};

export const TaskItem: React.FC<Props> = ({ task, onTaskDelete }) => {
  const dispatch = useAppDispatch();
  const { tagsCreated } = useAppSelector(state => state.tag);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.description);
  const [isHovered, setIsHovered] = useState(false);

  const handleOnDrag = (e: React.DragEvent, task: string) => {
    e.dataTransfer.setData('currentTask', task);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const pressedKey = event.key;

    if (pressedKey === 'Enter' || pressedKey === 'Escape') {
      handleBlur();
    }
  }

  const handleBlur = () => {
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
          <input
            type='text'
            value={text}
            onChange={(event) => setText(event.target.value)}
            onBlur={handleBlur}
            onKeyUp={(event) => handleKeyUp(event)}
          />
        </Container>
      ) : (
        <Container
          draggable
          onDragStart={(event) => handleOnDrag(event, JSON.stringify(task))}
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

                <ControlButton onClick={() => onTaskDelete(task.id)}>
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
