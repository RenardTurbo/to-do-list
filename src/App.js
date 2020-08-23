import React from 'react';
import './App.scss';
import SimpleCard from "./Components/Note/note.component";
import {inject, observer} from "mobx-react";
import SimpleModal from "./Components/Popup/popup.component";

const App = inject("toDo")(
    observer(({toDo}) => {
        const {notes, addNote} = toDo;
        return (
            <div className="App">
                <div className="notes-wrapper">
                    {notes.map((note, index) =>
                        <SimpleCard id={index} key={`${index}${note.name}`} note={note}/>
                    )}
                </div>
                <div><SimpleModal text="Добавить заметку" onClick={addNote}/></div>

            </div>
        );
    }));

export default App;
