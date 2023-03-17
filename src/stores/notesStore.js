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

    console.log({ name, value });     //output: {{name: 'title', value: ' f'}}
    console.log({ [name]: value });  //output:  {title: ' f'}

    set((state) => {
      console.log(state);
      return {
        formData: {
          ...state.formData,
          [name]: value,
        },
      };

    });
  },

  createNote: async (e)=>{
    e.preventDefault();

    const {formData, notes} = notesStore.getState();
    const res = await axios.post('http://localhost:3001/notes', formData);
    console.log(res);

   set({
    notes: [ ...notes,res.data],
    formData: {
      title: "",
      body: ""
    }
  })
    
  }
}))

export default notesStore;