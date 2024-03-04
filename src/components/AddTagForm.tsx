import React, { FormEvent, useState } from 'react'
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../shared/globalState/hooks';
import { addTag } from '../shared/globalState/features/tagsSlice';
import { AddTagFormProps } from '../shared/types';
import { accentButtonOrange, buttonSecondary, inputStyles } from '../shared/styles';

const Section = styled.section`
  position: absolute;
  top: 100px;
  right: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const InputTag = styled.input`
  ${inputStyles}
`;

const ColorInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ffffff;
`;

const AddButton = styled.button`
  ${accentButtonOrange}
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
`;

const Button = styled.button`
  ${buttonSecondary}
`;

export const AddTagForm: React.FC<AddTagFormProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const [tag, setTag] = useState({ name: '', color: '' });
  const [error, setError] = useState(false);

  const handleAddTag = (event: FormEvent) => {
    event.preventDefault();
    setError(false);

    if (tag.name && tag.color) {
      const newTag = {
        id: uuidv4,
        ...tag,
      };

      dispatch(addTag(newTag));
      setTag({ name: '', color: '' });
      setIsOpen(false);
    } else {
      setError(true);
    }
  };

  if (!isOpen) { return null }

  return (
    <Section>
      <Form>
        {error && <p style={{ color: 'red' }}>All fields are required!</p>}

        <Label htmlFor='tags-input'>Add a new tag:</Label>
        <InputTag
          id='tags-input'
          type='text'
          placeholder='Enter tag name'
          required
          value={tag.name}
          onChange={(event) => setTag({ ...tag, name: event.target.value })}
        />

        <Label htmlFor='tags-input-color'>Pick color:</Label>
        <ColorInput
          id='tags-input-color'
          type='color'
          required
          value={tag.color}
          onChange={(event) => setTag({ ...tag, color: event.target.value })}
        />

        <ButtonsContainer>
          <AddButton type='submit' onClick={handleAddTag}>Create</AddButton>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </ButtonsContainer>
      </Form>
    </Section>
  )
}
