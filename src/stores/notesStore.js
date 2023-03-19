import { create } from 'zustand'
import axios from 'axios'

const notesStore = create((set) => ({
  notes: null,

  formData: {
    title: "",
    body: ""
  },
  updateNote: {
    _id: null,
    title: "",
    body: ""
  },

  //_________________________________________________________________________________________________________________________
  fetchNotes: async () => {
    console.log('hello');
    const res = await axios.get('http://localhost:3001/notes');
    console.log(res);

    //  setNotes(res.data)  ------------> use instand of
    set({ notes: res.data });
  },
  //_________________________________________________________________________________________________________________________

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

  createNote: async (e) => {
    e.preventDefault();

    const { formData, notes } = notesStore.getState();
    const res = await axios.post('http://localhost:3001/notes', formData);
    console.log(res);

    set({
      notes: [...notes, res.data],
      formData: {
        title: "",
        body: ""
      }
    })

  },
  //_________________________________________________________________________________________________________________________


  toggleUpdateForm : (note) => {
    console.log(note)

    set({
      updateNote: {
        title: note.title,
        body: note.body,
        _id: note._id
      },
      
    })
    // const { updateNote } = notesStore.getState();
    // console.log(updateNote)
  },


  updateFormFieldChange: (e) => {
    const { name, value } = e.target;
    console.log({[name] : value});


    set((state) => {
      const {updateNote} = notesStore.getState()
      console.log(updateNote);
      return {
        updateNote: {
          ...state.updateNote,
          [name]: value
        }
      }
    })

  },

  updateNoteINdb: async (e) => {
    e.preventDefault();
    
      const { updateNote, notes } = notesStore.getState();
      console.log(updateNote._id);
      // console.log(updateNote);
      const res = await axios.put(`http://localhost:3001/notes/${updateNote._id}`, updateNote);

      const newNotes = [...notes];

      const IndexOFupdatedNote = notes.findIndex((note) => {
        return note._id == updateNote._id;
      })

      newNotes[IndexOFupdatedNote] = res.data;

      set({ notes: newNotes });


    
    

  }



  //_________________________________________________________________________________________________________________________


}))

export default notesStore;