import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CalendarItem } from './CalendarItem';
import { TaskItem } from './TaskItem';

const ReorderableList = ({ lists, onDragEnd, setIsModalOpen }) => {
  const handleDragEnd = (result) => {
    onDragEnd(result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {lists.map((list, index) => (
        <CalendarItem item={list} setIsModalOpen={setIsModalOpen}>
          <Droppable key={index} droppableId={list.id}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} style={{ height: '80%' }}>
                {list.items.map((item, itemIndex) => (
                  <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem task={item} onTaskDelete={() => { }} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </CalendarItem>
      ))}
    </DragDropContext>
  );
};

export default ReorderableList;
