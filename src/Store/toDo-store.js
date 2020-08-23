import {action, decorate, observable} from "mobx";


class ToDo {
    constructor() {
        this.notes = [
            {
                name: "Name1",
                tasks: [
                    {
                        name: "other name1",
                        isCompleted: true,
                        date: "2020-02-22"
                    },
                    {
                        name: "other name2",
                        isCompleted: false,
                        date: "2020-02-22"
                    },
                    {
                        name: "other name3",
                        isCompleted: false,
                        date: "2020-02-22"
                    }
                ]
            },
            {
                name: "Name2",
                tasks: [
                    {
                        name: "other name",
                        isCompleted: false,
                        date: "2020-02-22"
                    }
                ]
            }
        ]
    }

    updateNote = (name, tasks, id) => {
        const newNotes = [...this.notes];
        newNotes[id] = {name, tasks};
        this.notes = newNotes;
    }

    deleteNote = (id) => {
        this.notes = this.notes.filter((note, noteId) => {
            return noteId !== id
        })
    }

    addNote = (noteName, noteTasks,) => {
        this.notes = [...this.notes, {name: noteName, tasks: noteTasks}]
    }
}

decorate(ToDo, {
    notes: observable,
    updateNote: action,
    deleteNote: action,
    addNote: action,
});
export default new ToDo();
