import styled from 'styled-components';
import { Tag } from '../shared/types';

interface TagProps {
  color: string,
}

const TagContainer = styled.div<TagProps>`
  width: 32%;
  height: 8px;
  background-color: ${props => props.color};
  border-radius: 5px;
`;

type Props = {
  tag: Tag,
}

export const TagItem: React.FC<Props> = ({ tag }) => {
  return (
    <TagContainer color={tag.color} />
  )
}
