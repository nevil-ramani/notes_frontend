import { create } from 'zustand'
import axios from 'axios'


const signupStore = create((set) => ({

    login: null,

    formData: {
        email: "",
        password: ""
      },



      
  updateSignupStoreFormFileldChange: (e) => {
    const { name, value } = e.target;
    console.log({[name] : value});


    set((state) => {
      const {formData} = signupStore.getState()
      console.log(formData);
      return {
        formData: {
          ...state.formData,
          [name]: value
        }
      }
    })

  },


  
  signupSubmit: async (e) => {
    e.preventDefault();

    const { formData } = signupStore.getState();
    const res = await axios.post('http://localhost:3001/notes/signup', formData);
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

export default signupStore;