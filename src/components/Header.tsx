import styled from 'styled-components';
import { FilterBar } from './FilterBar';
import { ChangeMonthSection } from './ChangeMonthSection';
import { useState } from 'react';
import { AddTagForm } from './AddTagForm';
import { useAppDispatch } from '../shared/globalState/hooks';
import { HeaderProps, Task } from '../shared/types';
import { addTasksFromFile } from '../shared/globalState/features/taskSlice';
import { ExportImportBar } from './ExportImportBar';
import { getTasksFromFile } from '../shared/helpers';
import { addTagsFromImportFile } from '../shared/globalState/features/tagsSlice';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FD9F01;
  position: relative;
`;

export const Header: React.FC<HeaderProps> = ({ handlePdfExport }) => {
  const dispatch = useAppDispatch();
  const [isBarOpen, setIsBarOpen] = useState(false);

  const handleJsonImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      try {
        const jsonTasks = getTasksFromFile(event.target?.result);

        const tagsFromFile = jsonTasks.map((task: Task) => task.tags);

        dispatch(addTagsFromImportFile(tagsFromFile));
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

  return (
    <HeaderContainer>
      <ExportImportBar
        handleJsonImport={handleJsonImport}
        handlePdfExport={handlePdfExport}
      />

      <ChangeMonthSection />

      <FilterBar isBarOpen={isBarOpen} setIsOpen={setIsBarOpen} />

      {isBarOpen && <AddTagForm isOpen={isBarOpen} setIsOpen={setIsBarOpen} />}
    </HeaderContainer>
  )
}
