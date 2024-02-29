import styled from 'styled-components';
import { FilterBar } from './FilterBar';
import { ChangeMonthSection } from './ChangeMonthSection';
import { useState } from 'react';
import { AddTagBar } from './AddTagBar';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FD9F01;
`;

export const Header = () => {
  const [isBarOpen, setIsBarOpen] = useState(false);

  return (
    <>
      <HeaderContainer>
        <ChangeMonthSection />

        <FilterBar isBarOpen={isBarOpen} setIsOpen={setIsBarOpen} />
      </HeaderContainer>

      {isBarOpen && <AddTagBar setIsOpen={setIsBarOpen} />}
    </>
  )
}
