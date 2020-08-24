import React from 'react';
import './App.scss';
import SimpleCard from "./Components/Note/note.component";
import {inject, observer} from "mobx-react";
import {CustomModal} from "./Components/Modal/modal.component";
import Button from "@material-ui/core/Button";
import NoteModalContent from "./Components/ModalContent/noteModalContent.component";


const App = inject("ToDo", "ModalStore")(
    observer(({ToDo, ModalStore}) => {
        const {notes, addNote, deleteNote, updateNote} = ToDo;
        const {openModal, toggle} = ModalStore;

        const openCreateModal = () => {
            openModal(<NoteModalContent   onClick={addNote}/>);
            toggle(true);
        }

        return (
            <div className="App">
                <div className="notes-wrapper">
                    {notes.map((note, index) =>
                        <SimpleCard toggle={toggle} openModal={openModal} deleteNote={deleteNote} updateNote={updateNote} id={index}
                                    key={`${index}${note.name}`} note={note}/>
                    )}
                </div>
                <div>
                    <Button size="small" variant="outlined" color="primary" onClick={()=>openCreateModal()}>Добавить заметку</Button>
                </div>
                <div>
                    <CustomModal/>
                </div>

            </div>
        );
    }));

export default App;
