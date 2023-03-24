
import { react, useEffect } from 'react';
import notesStore from '../stores/notesStore';




const NotesPage = () => {


  const store = notesStore();
  
  useEffect(() => {
    store.fetchNotes();
  }, [])
  

    return (
        <div>
    
    
          <h1>Notes:</h1>
          <div>
            
            {/* //fetch notes */}
            {store.notes && store.notes.map((note) => { // without 'is notes' condition it's not work
              return (
                <div key={note._id}>
                  <h3>{note.title}</h3>
                  <h5>{note.body}</h5>
                  <button onClick={() => store.deleteNote(note._id)}>delete note</button>  {/*//Don't directly call functions in onClick event. It will recursively call the method. So make the onClick input as a callback method. */}
                  {/* https://stackoverflow.com/questions/44833583/expected-onclick-listener-to-be-a-function-instead-got-type-object-react-redu */}
                  <button onClick={() => store.toggleUpdateForm(note)}>update note</button>
                </div>
    
              );
            })}
          </div>
    
    
          <div>
    
            {!store.updateNote._id && ( // must need to wrap in div tag
            console.log(store.updateNote._id),
              <div> 
                
                <h1>create notes</h1>
                <form onSubmit={store.createNote}>
                  <input onChange={store.updateFormDataField} value={store.formData.title} name="title" />
                  <textarea onChange={store.updateFormDataField} value={store.formData.body} name="body" />
                  <button type="submit"> create note</button>
                </form>
              </div>
            )} 
    
    
            {store.updateNote._id && (
              <div>
                <h1>update note</h1>
                <form onSubmit={store.updateNoteINdb}>
                  <input onChange={store.updateFormFieldChange} value={store.updateNote.title} name="title" />
                  <textarea onChange={store.updateFormFieldChange} value={store.updateNote.body} name="body" />
                  <button type="submit"> update note</button>
                </form>
              </div>
            )}
    
          </div>
    
    
        </div>
      );
}

export default NotesPage