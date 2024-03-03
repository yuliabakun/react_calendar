import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CalendarItem } from './CalendarItem';
import { TaskItem } from './TaskItem';
import { ReorderableListProps } from '../shared/types';

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
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ height: '80%' }}
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
              </ul>
            )}
          </Droppable>
        </CalendarItem>
      ))}
    </DragDropContext>
  );
};
