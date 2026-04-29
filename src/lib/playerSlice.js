import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "./axios";

export const searchSongs = createAsyncThunk("searchSongs", async (songName) => {
  try {
    const response = await client.get(
      `/search/multi?search_type=SONGS&offset=0&query=${songName}`,
    );
    return response;
  } catch (error) {
    console.error(error);
  }
});

const initialState = {
  songs: localStorage.getItem("songs")
    ? JSON.parse(localStorage.getItem("songs"))
    : [],
  activeSong: {},
  isLoading: true,
  song: {},
  error: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    clickActiveSong: (state, action) => {
      console.log(action.payload);
      state.activeSong = { ...action?.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSongs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action?.payload.status === 200) {
          state.songs = [action?.payload.data];
          localStorage.setItem("songs", JSON.stringify(state.songs));
        } else {
          state.error = action?.payload.error.message;
        }
        console.log(action);
      })
      .addCase(searchSongs.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.error = action?.payload.error.message;
      });
  },
});

export const { clickActiveSong } = playerSlice.actions;
export default playerSlice.reducer;
