import { createSlice } from '@reduxjs/toolkit';
import { Tag } from '../../types';
import { mockedTags } from '../../data';
import { v4 as uuidv4 } from 'uuid';
import { getRandomColor } from '../../helpers';

interface InitialState {
  tagsCreated: Tag[],
  tagSelected: string,
}

const initialState: InitialState = {
  tagsCreated: mockedTags,
  tagSelected: '',
}

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action) => {
      state.tagsCreated = [...state.tagsCreated, action.payload];
    },
    setTagSelected: (state, action) => {
      state.tagSelected = action.payload;
    },
    addTagsFromImportFile: (state, action) => {
      const tagsFromFile = action.payload.flat();
      const currentTags = state.tagsCreated.map(tag => tag.name);
      const tagsToAdd = tagsFromFile.filter((tag: string) => !currentTags.includes(tag))

      const tagsPrepared = tagsToAdd.map((tag: string) => {
        return {
          id: uuidv4(),
          name: tag,
          color: getRandomColor(),
        }
      });

      state.tagsCreated = [...state.tagsCreated, ...tagsPrepared];
    },
  }
});

export const { addTag, setTagSelected, addTagsFromImportFile } = tagsSlice.actions;
export default tagsSlice.reducer;
