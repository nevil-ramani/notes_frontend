import { create } from 'zustand'
import axios from 'axios'


const loginStore = create((set) => ({

    login: null,

    formData: {
        email: "",
        password: ""
      },



      
  updateLoginFormFileldChange: (e) => {
    const { name, value } = e.target;
    console.log({[name] : value});


    set((state) => {
      const {formData} = loginStore.getState()
      console.log(formData);
      return {
        formData: {
          ...state.formData,
          [name]: value
        }
      }
    })

  },


  
  loginSubmit: async (e) => {
    e.preventDefault();

    const { formData, login } = loginStore.getState();
    const res = await axios.post('http://localhost:3001/notes/login', formData);
    console.log(res);
    console.log(formData)

    set({
      formData: {
        email: "",
        password: ""
      }
    })

  },
    
})
)

export default loginStore;