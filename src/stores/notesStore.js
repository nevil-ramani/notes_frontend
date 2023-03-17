import { create } from 'zustand'
import axios from 'axios'

const notesStore = create((set) => ({
 notes: null,

 fetchNotes: async () => {
   console.log('hello');
    const res = await axios.get('http://localhost:3001/notes');
    console.log(res);

   //  setNotes(res.data)  ------------> use instand of
    set({notes: res.data});
 }

}))

export default  notesStore;