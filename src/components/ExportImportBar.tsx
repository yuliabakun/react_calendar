import styled from 'styled-components';
import { ExportImportBarProps } from '../shared/types';
import { useAppSelector } from '../shared/globalState/hooks';
import { inputStyles } from '../shared/styles';
import { handleJsonExport } from '../shared/helpers';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  text-align: center;
  width: 100%;
`;

const FileInput = styled.input`
  ${inputStyles}
`;

export const ExportImportBar: React.FC<ExportImportBarProps> = ({
  handleJsonImport,
  handlePdfExport,
}) => {
  const { tasks } = useAppSelector(state => state.tasks);

  return (
    <ActionsBar>
      <Container>
        <Button onClick={() => handleJsonExport(tasks, 'application/json')}>
          Export JSON
        </Button>

        <Button onClick={handlePdfExport}>Export PDF</Button>
      </Container>

      <Container>
        <InputLabel htmlFor='input-import-json'>Import Json file:</InputLabel>
        <FileInput
          id='input-import-json'
          type='file'
          accept='.json'
          placeholder='Import Json'
          onChange={handleJsonImport}
        />
      </Container>
    </ActionsBar>
  )
}