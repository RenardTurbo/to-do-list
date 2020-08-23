import React, {useState} from 'react';
import "./popup.style.scss"
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
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

const useStyles = makeStyles((theme) => ({
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

const SimpleModal = inject("toDo")(
    observer(({note, text, id, onClick}) => {
        const classes = useStyles();
        const [modalStyle] = useState(getModalStyle);
        const [open, setOpen] = useState(false);
        const [nodeName, setNodeName] = useState(toJS(note?.name) || "");
        const [tasks, setTasks] = useState(note?.tasks.map(task => toJS(task)) || [])

        const handleOpen = () => {
            setOpen(true);

        };

        const handleClose = () => {
            setOpen(false);
            setNodeName(toJS(note?.name) || "");
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
            <div>
                <Button size="small" variant="outlined" color="primary" onClick={handleOpen}>{text}</Button>
                {open && <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paper}>
                        <TextField id="standard-basic" label="Название" value={nodeName}
                                   onChange={(e) => setNodeName(e.target.value)}/>
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
                                onClick(nodeName, tasks, id);
                                setOpen(false);
                            }}>Сохранить</Button>
                            <Button size="medium" variant="outlined" color="secondary"
                                    onClick={handleClose}>Отменить</Button>
                        </div>
                    </div>
                </Modal>}
            </div>
        );
    }));
export default SimpleModal;
