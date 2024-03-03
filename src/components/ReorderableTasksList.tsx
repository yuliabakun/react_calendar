/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Task } from '../shared/types';
import { TaskItem } from './TaskItem';

type Props = {
  items: Task[],
  onTaskDelete: (v: string) => void,
};

export const ReorderableTasksList: React.FC<Props> = ({ items, onTaskDelete }) => {
  const [list, setList] = useState(items);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedList = Array.from(list);
    const [removed] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, removed);

    setList(reorderedList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem task={item} onTaskDelete={onTaskDelete} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
