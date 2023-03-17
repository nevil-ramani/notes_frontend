import { create } from 'zustand'
import axios from 'axios'

const notesStore = create((set) => ({
  notes: null,
  formData: {
    title: "",
    body: ""
  },

  fetchNotes: async () => {
    console.log('hello');
    const res = await axios.get('http://localhost:3001/notes');
    console.log(res);

    //  setNotes(res.data)  ------------> use instand of
    set({ notes: res.data });
  },

  updateFormDataField: (e) => {
    const { name, value } = e.target;

    console.log({ name, value });

    set((state) => {
      console.log(state);
      return {
        formData: {
          ...state.formData,
          [name]: value
        },
      };

    });
  },

}))

export default notesStore;