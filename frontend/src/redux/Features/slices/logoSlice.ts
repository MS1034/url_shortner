import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BrandLogo } from "@/commons/types/Logo";

interface LogoState {
  page: number;
  hasMore: boolean;
  logos: BrandLogo[];
  editMode: { id?: string; preview?: string } | null;
}

const initialState: LogoState = {
  page: 1,
  hasMore: true,
  logos: [],
  editMode: null,
};

const logoSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setLogos: (state, action: PayloadAction<BrandLogo[]>) => {
      state.logos = action.payload;
    },
    addLogo: (state, action: PayloadAction<BrandLogo>) => {
      state.logos.push(action.payload);
    },
    updateLogo: (state, action: PayloadAction<BrandLogo>) => {
      state.logos = state.logos.map((logo) =>
        logo.logo_id === action.payload.logo_id ? action.payload : logo
      );
    },
    deleteLogo: (state, action: PayloadAction<string>) => {
      state.logos = state.logos.filter(
        (logo) => logo.logo_id !== action.payload
      );
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
  setLogos,
  addLogo,
  updateLogo,
  deleteLogo,
  setEditMode,
} = logoSlice.actions;

export default logoSlice.reducer;
