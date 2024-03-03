import styled from 'styled-components';
import { FilterBar } from './FilterBar';
import { ChangeMonthSection } from './ChangeMonthSection';
import { useState } from 'react';
import { AddTagBar } from './AddTagBar';
import { useAppDispatch } from '../shared/globalState/hooks';
import { HeaderProps, Task } from '../shared/types';
import { addTasksFromFile } from '../shared/globalState/features/taskSlice';
import { ExportImportBar } from './ExportImportBar';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FD9F01;
`;

export const Header: React.FC<HeaderProps> = ({ handlePdfExport }) => {
  const dispatch = useAppDispatch();
  const [isBarOpen, setIsBarOpen] = useState(false);

  const handleJsonExport = (data: Task[], type: string) => {
    const dataToLoad = JSON.stringify(data);

    const blob = new Blob([dataToLoad], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Json tasks';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  const handleJsonImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      try {
        const jsonTasks = JSON.parse(event.target?.result as string, dateReviver);

        dispatch(addTasksFromFile(jsonTasks));
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      fileReader.readAsText(file);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dateReviver = (key: any, value: any) => {
    if (key === 'assign_date') {
      return new Date(value);
    }

    return value;
  }

  return (
    <>
      <HeaderContainer>
        <ExportImportBar
          handleJsonExport={handleJsonExport}
          handleJsonImport={handleJsonImport}
          handlePdfExport={handlePdfExport}
        />

        <ChangeMonthSection />

        <FilterBar isBarOpen={isBarOpen} setIsOpen={setIsBarOpen} />
      </HeaderContainer>

      {isBarOpen && <AddTagBar setIsOpen={setIsBarOpen} />}
    </>
  )
}
