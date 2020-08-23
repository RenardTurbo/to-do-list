import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./note.style.scss"
import SimpleModal from "../Popup/popup.component";
import {inject, observer} from "mobx-react";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const SimpleCard = inject("toDo")(
    observer(({toDo, id, note}) => {
        const {deleteNote, updateNote} = toDo;

        const classes = useStyles();

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {note.name}
                    </Typography>
                    {
                        note.tasks.map((task) =>
                            <Typography variant="body2" component="p">
                                <hr/>
                                {task.name}
                                <br/>
                                Задача {task.isCompleted ? "выполнена" : "в процессе"}
                                <br/>
                                {task.date}
                            </Typography>
                        )
                    }
                </CardContent>
                <CardActions>
                    <SimpleModal id={id} text="Редактировать" note={note} onClick={updateNote}/>
                    <Button onClick={() => {
                        deleteNote(id)
                    }} size="small" variant="outlined" color="secondary">Удалить</Button>
                </CardActions>
            </Card>
        );
    }))
export default SimpleCard;
