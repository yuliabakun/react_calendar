import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CalendarItem } from './CalendarItem';
import { TaskItem } from './TaskItem';
import { ReorderableListProps } from '../shared/types';
import styled from 'styled-components';

const TasksList = styled.ul`
  height: 80%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #EEEFF1; 
  }

  &::-webkit-scrollbar-thumb {
    background: #adaaaa; 
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`;

export const ReorderableList: React.FC<ReorderableListProps> = ({
  lists,
  onDragEnd,
  setIsModalOpen,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (result: any) => {
    onDragEnd(result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {lists.map((list, index) => (
        <CalendarItem item={list} setIsModalOpen={setIsModalOpen}>
          <Droppable key={index} droppableId={list.id}>
            {(provided) => (
              <TasksList
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ height: '80%', overflowY: 'auto' }}
              >
                {list.items.map((item, itemIndex) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={itemIndex}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem task={item} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TasksList>
            )}
          </Droppable>
        </CalendarItem>
      ))}
    </DragDropContext>
  );
};
