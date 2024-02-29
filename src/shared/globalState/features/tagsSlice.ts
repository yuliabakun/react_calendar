import { createSlice } from '@reduxjs/toolkit';
import { Tag } from '../../types';
import { mockedTags } from '../../data';

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
  }
});

export const { addTag, setTagSelected } = tagsSlice.actions;
export default tagsSlice.reducer;
