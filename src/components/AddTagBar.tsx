import React, { FormEvent, useState } from 'react'
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../shared/globalState/hooks';
import { addTag } from '../shared/globalState/features/tagsSlice';
import { AddTagBarProps } from '../shared/types';
import { accentButtonOrange, inputStyles } from '../shared/styles';

const Section = styled.section`
  margin: 10px 40px;
  display: flex;
  justify-content: right;
`;

const Form = styled.form`
  display: flex;
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

export const AddTagBar: React.FC<AddTagBarProps> = ({ setIsOpen }) => {
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

        <AddButton type='submit' onClick={handleAddTag}>Create</AddButton>
      </Form>
    </Section>
  )
}
