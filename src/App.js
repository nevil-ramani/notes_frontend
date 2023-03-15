import { useState, useEffect } from "react";
import axios from 'axios';


function App() {


  const [notes, setNotes] = useState();
  const [formData, setFormData] = useState({ title: " ", body: " " });
  const [updateNote, setUpdateNote] = useState({ _id: null, title: " ", body: " " });

  useEffect(() => {
    fetchNotes();
  }, [])


//___________________________________________________________________________________________________________________
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
//___________________________________________________________________________________________________________________
  //create note

  //update formData state
  const updateFormDataField = (e) => {
    const { name, value } = e.target;

    console.log({ name, value });

    setFormData({
      ...formData,
      [name]: value // without [] it's not work

    })
    console.log({ [name]: value });

  }

  //create note in db
  const createNote = async (e) => {

    e.preventDefault();

    console.log(formData);
    console.log(formData.title);
    console.log(formData.body);
    // const res = await axios.post('http://localhost:3001/notes', { title: `${formData.title}`, body:  `${formData.body}` });
    const res = await axios.post('http://localhost:3001/notes', formData);
    console.log(res);

    //change the state & clear the form field
    setNotes([...notes, res.data]);
    setFormData({ title: "", body: "" });

  }
//___________________________________________________________________________________________________________________
  //delete note

  const deleteNote = async (id) => {
   //delete the note
    const res = await axios.delete(`http://localhost:3001/notes/${id}`);
    console.log(res);

    //update state

          //filter data
            // const ages = [32, 33, 16, 40, 50, 1, 2, 3];

            // document.getElementById("demo").innerHTML = ages.filter(checkAdult);

            // function checkAdult(age) {
            //   return age >= 18;
            //  }

    const NewNotes = [...notes].filter((note) => {
      return note._id !== id;
    })
    setNotes(NewNotes);
  }
//___________________________________________________________________________________________________________________
  //update note

  //update formData state
  const updateFormFieldChange = (e) => {
    const { name, value } = e.target;

    console.log({ name, value });

    setUpdateNote({
      ...updateNote,
      [name]: value // without [] it's not work

    })
    console.log({ [name]: value });

  }

  //update note in db
  const updateNoteINdb = async (e) => {
    e.preventDefault();
   
    const res = await axios.put(`http://localhost:3001/notes/${updateNote._id}`, updateNote);
    console.log(res);
    
    //update state & clear form
    
    // fetchNotes(); // not a good way


    setUpdateNote({ _id: null, title: " ", body: " " });

  }
//___________________________________________________________________________________________________________________

  const toggleUpdateForm = (note) => {
    setUpdateNote({ title: note.title, body: note.body, _id: note._id });
  }

//___________________________________________________________________________________________________________________
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
              <button onClick={() => deleteNote(note._id)}>delete note</button>  {/*//Don't directly call functions in onClick event. It will recursively call the method. So make the onClick input as a callback method. */}
              {/* https://stackoverflow.com/questions/44833583/expected-onclick-listener-to-be-a-function-instead-got-type-object-react-redu */}
              <button onClick={() => toggleUpdateForm(note)}>update note</button>
            </div>

          );
        })}
      </div>


      <div>

        {!updateNote._id && ( // must need to wrap in div tag
          <div> 
            <h1>create notes</h1>
            <form onSubmit={createNote}>
              <input onChange={updateFormDataField} value={formData.title} name="title" />
              <textarea onChange={updateFormDataField} value={formData.body} name="body" />
              <button type="submit"> create note</button>
            </form>
          </div>
        )}


        {updateNote._id && (
          <div>
            <h1>update note</h1>
            <form onSubmit={updateNoteINdb}>
              <input onChange={updateFormFieldChange} value={updateNote.title} name="title" />
              <textarea onChange={updateFormFieldChange} value={updateNote.body} name="body" />
              <button onClick="updateNoteINdb" type="submit"> update note</button>
            </form>
          </div>
        )}

      </div>


    </div>
  );
}

export default App;

