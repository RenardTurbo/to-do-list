import React, {useState} from 'react';
import "./noteModalContent.style.scss"
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Task from "../Task/task.component";
import {inject, observer} from "mobx-react";
import {toJS} from "mobx";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useModalStyle = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: "flex",
        flexDirection: "column"
    },
}));


const NoteModalContent = inject("ModalStore")(
    observer(({ModalStore, note,  id, onClick}) => {
        const {toggle} = ModalStore;
        const [name, setName] = useState(toJS(note?.name) || "");
        const [tasks, setTasks] = useState(note?.tasks.map(task => toJS(task)) || [])

        const modalClasses = useModalStyle();
        const [modalStyle] = useState(getModalStyle);


        const handleClose = () => {
            toggle(false);
            setName(toJS(note?.name) || "");
            setTasks(note?.tasks.map(task => toJS(task)) || []);
        };

        const deleteTask = (taskId) => {
            setTasks(tasks.filter((e, index) => index !== taskId))
        }

        const changeTask = (id, task) => {
            setTasks(() => {
                tasks[id] = task
                return tasks
            })
        }

        const addTask = () => {
            setTasks([...tasks, {name: "", isCompleted: false, date: ""}])
        }

        return (
            <div style={modalStyle} className={modalClasses.paper}>
                <TextField id="standard-basic" label="Название" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                {
                    tasks?.map((task, index) =>
                        <Task key={`${index}${task.name}`} task={task} id={index}
                              deleteTask={() => deleteTask(index)}
                              onChange={changeTask}/>
                    )
                }
                <Button size="medium" variant="outlined" color="primary" onClick={addTask}>Добавить
                    задачу</Button>
                <div className="button-wrapper">
                    <Button size="medium" variant="outlined" color="primary" onClick={() => {
                        onClick(name, tasks, id);
                        toggle(false);
                    }}>Сохранить</Button>
                    <Button size="medium" variant="outlined" color="secondary"
                            onClick={handleClose}>Отменить</Button>
                </div>
            </div>
        );
    }));
export default NoteModalContent;
