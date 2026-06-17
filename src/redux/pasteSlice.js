
import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Note created successfully", {duration:1500});
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if(index >= 0){
        state.pastes[index] = { ...state.pastes[index], ...paste };
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Note updated", {duration:1500});
      }
    },
    togglePin: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if(index >= 0){
        state.pastes[index].pinned = !state.pastes[index].pinned;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success(state.pastes[index].pinned ? "Note pinned" : "Note unpinned", {duration:1500});
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if(index >= 0){
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Note deleted", {duration:1500});
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes, togglePin } = pasteSlice.actions

export default pasteSlice.reducer