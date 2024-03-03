import styled from 'styled-components';
import { TagItemProps } from '../shared/types';

interface TagProps {
  color: string,
}

const TagContainer = styled.div<TagProps>`
  width: 32%;
  height: 8px;
  background-color: ${props => props.color};
  border-radius: 5px;
`;

export const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  return (
    <TagContainer color={tag.color} />
  )
}
