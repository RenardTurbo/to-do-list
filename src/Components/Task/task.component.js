import React, {useEffect, useState} from 'react';
import "./task.style.scss"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


export default function Task(props) {
    const [nameTask, setNameTask] = useState(props.task.name)
    const [isCompleted, setIsCompleted] = useState(props.task.isCompleted)
    const [dateTask, setDateTasks] = useState(props.task.date)

    useEffect(() => {
        props.onChange(props.id, {name: nameTask, isCompleted: isCompleted, date: dateTask})
    }, [nameTask, isCompleted, dateTask])

    return (
        <div className="task-wrapper">
            <hr/>
            <TextField id="standard-basic" label="Название задачи" value={nameTask}
                       onChange={(e) => setNameTask(e.target.value)}/>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.value)}
                >
                    <MenuItem value={true}>Задача выполнена</MenuItem>
                    <MenuItem value={false}>Задача в процессе</MenuItem>
                </Select>
            </FormControl>
            <TextField type="date" id="standard-basic" label="Дата выполнения" value={dateTask}
                       onChange={(e) => {
                           setDateTasks(e.target.value)
                       }}/>
            <Button onClick={props.deleteTask} size="small" variant="outlined" color="secondary">Удалить задачу</Button>
        </div>
    );
}
