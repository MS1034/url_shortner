import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "@/commons/types/Tags";

interface tagstate {
  page: number;
  hasMore: boolean;
  tags: Tag[];
  editMode: { id?: string; preview?: string } | null;
}

const initialState: tagstate = {
  page: 1,
  hasMore: true,
  tags: [],
  editMode: null,
};

const tagslice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    settags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    addTag: (state, action: PayloadAction<Tag>) => {
      state.tags.push(action.payload);
    },
    updateTag: (state, action: PayloadAction<Tag>) => {
      state.tags = state.tags.map((tag) =>
        tag.tag_id === action.payload.tag_id ? action.payload : tag
      );
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter((tag) => tag.tag_id !== +action.payload);
    },
    setEditMode: (
      state,
      action: PayloadAction<{ id?: string; preview?: string } | null>
    ) => {
      state.editMode = action.payload;
    },
  },
});

export const {
  setPage,
  setHasMore,
  settags,
  addTag,
  updateTag,
  deleteTag,
  setEditMode,
} = tagslice.actions;

export default tagslice.reducer;
