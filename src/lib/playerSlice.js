import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "./axios";
import { current } from "@reduxjs/toolkit";

export const searchSongs = createAsyncThunk("searchSongs", async (song) => {
  const { select, songName } = song;
  console.log(select, songName);
  try {
    const response = await client.get(
      `/search/multi?search_type=${select}&offset=0&query=${songName}`,
    );
    return { data: response.data, select };
  } catch (error) {
    console.error(error);
  }
});

const initialState = {
  songs: localStorage.getItem("songs")
    ? JSON.parse(localStorage.getItem("songs"))
    : [],
  artists: localStorage.getItem("artists")
    ? JSON.parse(localStorage.getItem("artists"))
    : [],
  activeSong: {},
  isLoading: localStorage.getItem("songs") ? false : true,
  isPlaying: false,
  song: {},
  error: "",
  currentSongs: [],
  currentIndex: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playPause: (state, action) => {
      //console.log(action);
      if (action?.payload.p === "play") {
        state.isPlaying = true;
        action?.payload.audioRef.current.play();
        return;
      } else {
        state.isPlaying = false;
        action?.payload?.audioRef?.current.pause();
        return;
      }
    },
    clickActiveSong: (state, action) => {
      if (action.payload.repeat) {
        console.log(action.payload.repeat);
      }
      state.activeSong = { i: action?.payload.i, song: action?.payload.song };

      state.currentIndex = action.payload.i;
      state.isPlaying = true;
      playPause();
    },
    prevSong: (state, action) => {
      const tempData = action.payload.data;
      if (action.payload.shuffle) {
        //console.log(action.payload.shuffle);
        let randomInt = Math.floor(Math.random() * 24);
        state.activeSong = {
          i: randomInt,
          song: tempData[randomInt],
        };
        ((state.currentIndex = randomInt), (state.isPlaying = true));
        return;
      }
      if (action?.payload.i === 0) {
        return;
      }

      //console.log(action.payload);

      //console.log(tempData[action.payload.i - 1]);
      state.activeSong = {
        i: action.payload.i - 1,
        song: tempData[action.payload.i - 1],
      };
      state.currentIndex = action.payload.i - 1;
      console.log(state.currentIndex);
      state.isPlaying = true;
    },
    nextSong: (state, action) => {
      //console.log(action.payload);
      const tempData = action.payload.data;
      if (action.payload.shuffle) {
        // console.log(action.payload.shuffle);
        let randomInt = Math.floor(Math.random() * 24);
        state.activeSong = {
          i: randomInt,
          song: tempData[randomInt],
        };
        ((state.currentIndex = randomInt), (state.isPlaying = true));
        return;
      }
      console.log(tempData[action.payload.i + 1]);
      state.activeSong = {
        i: action.payload.i + 1,
        song: tempData[action.payload.i + 1],
      };
      state.currentIndex = action.payload.i + 1;
      console.log(state.currentIndex);
      state.isPlaying = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSongs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.isLoading = false;

        console.log(action);
        if (action.payload.select === "ARTISTS") {
          state.artists = [action?.payload?.data];
          localStorage.setItem("artists", JSON.stringify(state.artists));
        }
        if (action.payload.select === "SONGS") {
          console.log(action.payload.data);
          state.songs = [action?.payload?.data];
          localStorage.setItem("songs", JSON.stringify(state.songs));
        }
      })
      .addCase(searchSongs.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.error = action?.payload.error?.message;
      });
  },
});

export const { clickActiveSong, playPause, prevSong, nextSong } =
  playerSlice.actions;
export default playerSlice.reducer;
