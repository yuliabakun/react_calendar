import styled, { css } from 'styled-components'
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/globalState/hooks';
import { setSearchQuery } from '../shared/globalState/features/taskSlice';
import { setTagSelected } from '../shared/globalState/features/tagsSlice';
import icon from '../shared/assets/icon-plus-gray.svg';
import { inputStyles } from '../shared/styles';
import { FilterBarProps } from '../shared/types';

const Section = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Search = styled.input`
  ${inputStyles}

  &::placeholder {
    font-family: 'Montserrat', sans-serif;
    color: #000000;
  }
`;

const Dropdown = styled.select`
  ${inputStyles}
  font-family: 'Montserrat', sans-serif;
`;

interface OptionProps {
  textColor: string,
}

const DropdownItem = styled.option<OptionProps>`
  color: ${props => props.textColor || '#000000'};
  font-size: 16px;
  font-weight: 500;
`;

const AddButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: #FDB700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IconProps {
  isOpen: boolean,
}

const Icon = styled.img<IconProps>`
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(45deg);
    `}
`;

export const FilterBar: React.FC<FilterBarProps> = ({ isBarOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const { tagsCreated } = useAppSelector(state => state.tag);
  const [query, setQuery] = useState('');

  const handleSearchKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const pressedKey = event.key;

    if (pressedKey === 'Enter') {
      dispatch(setSearchQuery(query));
    }

    if (pressedKey === 'Escape') {
      setQuery('');
      dispatch(setSearchQuery(''));
    }
  };

  return (
    <Section>
      <Search
        id='search-tasks-by-name'
        type='text'
        placeholder='Find a task'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onBlur={() => dispatch(setSearchQuery(query))}
        onKeyUp={handleSearchKeyUp}
      />

      <Dropdown
        id='tags-select'
        onChange={(event) => dispatch(setTagSelected(event.target.value))}
      >
        <option value=''>Filter by tag</option>

        {tagsCreated.map(tag => (
          <DropdownItem
            key={tag.id}
            value={tag.name}
            textColor={tag.color}
          >
            {tag.name}
          </DropdownItem>
        ))}
      </Dropdown>

      <AddButton
        onClick={() => { isBarOpen ? setIsOpen(false) : setIsOpen(true) }}
      >
        <Icon isOpen={isBarOpen} src={icon} />
      </AddButton>
    </Section >
  )
}
