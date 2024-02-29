import React, { FormEvent, useState } from 'react'
import styled from 'styled-components';
import { useAppDispatch } from '../shared/globalState/hooks';
import { v4 as uuidv4 } from 'uuid';
import { addTag } from '../shared/globalState/features/tagsSlice';

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

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AddTagBar: React.FC<Props> = ({ setIsOpen }) => {
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

        <label htmlFor='tags-input'>Add a new tag:</label>
        <input
          id='tags-input'
          type='text'
          placeholder='Enter tag name'
          required
          value={tag.name}
          onChange={(event) => setTag({ ...tag, name: event.target.value })}
        />

        <label htmlFor='tags-input-color'>Pick color:</label>
        <input
          id='tags-input-color'
          type='color'
          required
          value={tag.color}
          onChange={(event) => setTag({ ...tag, color: event.target.value })}
        />

        <button type='submit' onClick={handleAddTag}>Create</button>
      </Form>
    </Section>
  )
}
