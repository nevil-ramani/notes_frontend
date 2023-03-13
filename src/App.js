import { useState, useEffect } from "react";
import axios from 'axios';


function App() {
  const [notes, setNotes] = useState();
  const [formData, setFormData] = useState({title: " ", body: " "});

  useEffect(() => {
    fetchNotes();
  }, [])



  // fetch notes

  const fetchNotes = async () => {
    //fetch the notes & set the state
    try {
      const res = await axios.get('http://localhost:3001/notes')
      // console.log(res);
      setNotes(res.data)
    } catch (error) {
      console.log(error)
    }
  };


  //create note

  //update createNote field
  const updateFormDataField = (e) => {
    const {name, value} = e.target;

    console.log({name, value});

    setFormData({
      ...formData,
      [name] : value // without [] it's not work
      
    })
    console.log( {[name] : value});

  }

  const createNote = async (e) => {
    
    e.preventDefault();

    console.log(formData.title);
    console.log(formData.body);
    // const res = await axios.post('http://localhost:3001/notes', `{title: "${formData.title}", body: "${formData.body}"}`);
    const res = await axios.post('http://localhost:3001/notes', formData);
    console.log(res);

    
    setNotes([...notes, res.data ]);
    setFormData({title: "", body: ""});
    
  }


return (
    <div className="App">
      <h1>Notes:</h1>

  <div>
  {/* //fetch notes */}
      {notes && notes.map((note) => { // without 'is notes' condition it's not work
        return (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <h5>{note.body}</h5>
          </div>
          
        );
      })}
   </div>

       <div>
      <h1>create notes</h1>
      <form onSubmit={createNote}>
        <input onChange={updateFormDataField} value={createNote.title} name="title" />
        <textarea onChange={updateFormDataField} value={createNote.body} name="body" />
        <button type="submit"> create note</button>
      </form>
      </div>


    </div>
);
}

export default App;

