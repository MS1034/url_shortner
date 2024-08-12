import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ParamsState {
  page: number;
  pageSize: number;
}

const initialState: ParamsState = {
  page: 1,
  pageSize: 5,
};

const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
  },
});

export const { setPage, setPageSize } = paramsSlice.actions;

export default paramsSlice.reducer;
