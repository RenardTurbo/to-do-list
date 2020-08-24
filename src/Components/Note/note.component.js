import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./note.style.scss"
import NoteModalContent from "../ModalContent/noteModalContent.component";


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

const SimpleCard = (props) => {
    const {id, note, updateNote, deleteNote, openModal, toggle}=props;
        const classes = useStyles();


        const openEditModal = (note) => {
            openModal(<NoteModalContent note={note} id={id} onClick={updateNote}/>);
            toggle(true);
        }


        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {note.name}
                    </Typography>
                    {
                        note.tasks.map((task, index) =>
                            <Typography className="task-wrapper" key={index} variant="body2" component="p">
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
                    <Button size="small" variant="outlined" color="primary" onClick={()=>openEditModal(note)}>Редактировать</Button>
                    <Button onClick={() => {
                        deleteNote(id)
                    }} size="small" variant="outlined" color="secondary">Удалить</Button>
                </CardActions>
            </Card>
        );
    }
export default SimpleCard;
