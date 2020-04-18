import React, {useEffect, useState} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from "@material-ui/core/Button";
import {NavLink as ToLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePhoto, getUserPhoto} from "../../actions/gallery";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles} from "@material-ui/core/styles";
import MyModal from "../MyModal/MyModal";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
        width: 300,
        height: '100%',
        textDecoration: 'none'
    },
    media: {
        height: 400
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

const UserPhoto = props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const user = useSelector(state => state.authorization.user);
    const userPhoto = useSelector(state => state.gallery.userGallery);

    const [open, setOpen] = useState({
        open: false,
        image: ''
    });

    const onOpen = image => setOpen({...open, open: true, image: image});
    const onCLose = () => setOpen({...open, open: false, image: ''});

    useEffect(() => {
        dispatch(getUserPhoto(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    const userPhotoList = userPhoto.data && userPhoto.data[0] ? userPhoto.data.map(e => (
        <Grid item xs={3} style={{padding: '5px'}} key={e._id}>
            <Box boxShadow={3} className={classes.root}>
                <Card>
                    <CardActionArea onClick={() => onOpen(e.image)}>
                        <CardMedia
                            className={classes.media}
                            image={e.image}
                            title={e.title}
                        />
                    </CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {e.title}
                        </Typography>
                        {props.match.params.id === user._id && (
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                                onClick={() => dispatch(deletePhoto(e._id))}
                            >
                                Delete
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    )) : <Typography variant='h4'>Photo not found</Typography>;

    return (
        <>
            <div>
                {props.match.params.id === user._id && (
                    <Button
                        style={{float: 'right'}}
                        variant="contained"
                        color="primary"
                        endIcon={<AddCircleOutlineIcon/>}
                        component={ToLink} to={'/addPhoto'}
                    >
                        Add new photo
                    </Button>
                )}

                {userPhoto.author && <Typography
                    variant='h4'>Author: {userPhoto.author.displayName} ({userPhoto.author.username})
                </Typography>}


                <Grid container style={{marginTop: '10px'}}>
                    {userPhotoList}
                </Grid>
            </div>
            <MyModal
                open={open.open}
                onClose={onCLose}
            >
                <img src={open.image} alt={open.image}/>
            </MyModal>
        </>
    );
};

export default UserPhoto;