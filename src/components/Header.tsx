import styled from 'styled-components';
import { FilterBar } from './FilterBar';
import { ChangeMonthSection } from './ChangeMonthSection';
import { useState } from 'react';
import { AddTagBar } from './AddTagBar';
import { useAppDispatch, useAppSelector } from '../shared/globalState/hooks';
import { Task } from '../shared/types';
import { addTasksFromFile } from '../shared/globalState/features/taskSlice';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FD9F01;
`;

const ActionsBar = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 5px;
  background: #EFEFEE4C;
  border: 1px solid #E9E2D64C;
  border-radius: 3px;
  cursor: pointer;
`;

type Props = {
  handlePdfExport: () => void,
}

export const Header: React.FC<Props> = ({ handlePdfExport }) => {
  const [isBarOpen, setIsBarOpen] = useState(false);
  const { tasks } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();

  const handleJsonExport = (data: Task[], type: string) => {
    const dataToLoad = JSON.stringify(data);

    const blob = new Blob([dataToLoad], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Json tasks';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const dateReviver = (key, value) => {
    if (key === 'assign_date') {
      return new Date(value);
    }

    return value;
  }

  const handleJsonImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      try {
        const jsonTasks = JSON.parse(event.target.result as string, dateReviver);

        dispatch(addTasksFromFile(jsonTasks));
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      fileReader.readAsText(file);
    }
  };


  return (
    <>
      <HeaderContainer>
        <ActionsBar>
          <Button onClick={handlePdfExport}>Export PDF</Button>

          <Button onClick={() => handleJsonExport(tasks, 'application/json')}>
            Export JSON
          </Button>

          <input
            type="file"
            accept=".json"
            onChange={handleJsonImport}
          />

        </ActionsBar>

        <ChangeMonthSection />

        <FilterBar isBarOpen={isBarOpen} setIsOpen={setIsBarOpen} />
      </HeaderContainer>

      {isBarOpen && <AddTagBar setIsOpen={setIsBarOpen} />}
    </>
  )
}
