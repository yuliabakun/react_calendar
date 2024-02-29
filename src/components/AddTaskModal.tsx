import { FormEvent, useState } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../shared/globalState/hooks';
import { Task } from '../shared/types';
import { addNewTask } from '../shared/globalState/features/taskSlice';
import { getDateToRender } from '../shared/helpers';

const Overlay = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.7);
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 50%;
  padding: 20px;
`;

const ModalTopbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

interface ButtonProps {
  color?: string,
}

const Button = styled.button<ButtonProps>`
  padding: 8px 15px;
  margin-right: 10px;
  background-color: ${props => props.color || '#EBEBEB'};
  border: 1px solid #EBEBEB;
  cursor: pointer;
  transition: transform 0.5s ease;
`;

const Form = styled.form`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TaskInput = styled.input`
  padding: 10px;
  background: #EFEFEE4C;
  border: 1px solid #E9E2D64C;
  border-radius: 5px;
  margin-bottom: 20px;

  &:active, &:focus {
    outline: none;
  }
`;

const TagsContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-evenly;
  gap: 10px;
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: right;
`;

interface LabelProps {
  color: string,
}

const StyledLabel = styled.label<LabelProps>`
  color: ${props => props.color || 'black'};
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

type Props = {
  open: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AddTaskModal: React.FC<Props> = ({ open, setIsModalOpen }) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  const { tagsCreated } = useAppSelector(state => state.tag);
  const { selectedDate } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [task, setTask] = useState<Omit<Task, 'id'>>({
    description: '',
    assign_date: null,
    tags: [],
  });

  const saveTask = (e: FormEvent) => {
    e.preventDefault();
    setError(false);

    const newTask: Omit<Task, 'id'> = {
      ...task,
      assign_date: selectedDate,
    };

    if (newTask.description && newTask.assign_date) {
      dispatch(addNewTask(newTask));
      setIsModalOpen(false);

      setTask({ description: '', assign_date: null, tags: []});
    } else {
      setError(true);
    }
  }

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;

    const updatedTags = checked
      ? [...task.tags, name]
      : task.tags.filter((tagName) => tagName !== name);

    setTask({ ...task, tags: updatedTags });
  };

  if (!open) { return null }

  return ReactDom.createPortal(
    <>
      <Overlay />

      <Modal>
        <ModalTopbar>
          <h4>{`Create task for ${getDateToRender(selectedDate)}`}</h4>

          <Button onClick={() => {
            setError(false);
            setIsModalOpen(false);
          }}>Close</Button>
        </ModalTopbar>

        {error && <ErrorMessage>Task description is required!</ErrorMessage>}

        <Form>
          <TaskInput
            id='todo_name'
            type='text'
            required
            placeholder='Enter Task description'
            value={task.description}
            onChange={(event) => setTask({
              ...task,
              description: event.target.value,
            })}
          />

          <p>Add Tags:</p>
          <TagsContainer>
            {tagsCreated.map((tag) => (
              <StyledLabel key={tag.id} htmlFor={tag.id} color={tag.color}>
                <input
                  id={tag.id}
                  name={tag.name}
                  type='checkbox'
                  checked={task.tags.includes(tag.name)}
                  onChange={(event) => handleTagChange(event)}
                />
                {tag.name}
              </StyledLabel>
            ))}
          </TagsContainer>
        </Form>

        <ActionsBar>
          <Button onClick={() => {
            setTask({ ...task, description: '', tags: [] })
            setError(false);
          }}>
            Cancel
          </Button>

          <Button onClick={(event) => saveTask(event)} color='#FD9F01'>
            Save Task
          </Button>
        </ActionsBar>
      </Modal>
    </>, modalRoot
  )
}