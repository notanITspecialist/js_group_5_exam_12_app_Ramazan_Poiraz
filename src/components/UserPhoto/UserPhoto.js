import React, {useEffect, useState} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from "@material-ui/core/Button";
import {NavLink as ToLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserPhoto} from "../../actions/gallery";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import MyModal from "../MyModal/MyModal";

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

    const userPhotoList = userPhoto && userPhoto.map(e => (
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
                            <Chip avatar={<Avatar alt={e.author.username} src={e.author.avatar} />} label={e.author.displayName} onClick={() => props.history.push('/userPhoto/'+e.author._id)} />
                        </CardContent>
                </Card>
            </Box>
        </Grid>
    ));

    return (
        <>
            <div>
                <Button
                    style={{float: 'right'}}
                    variant="contained"
                    color="primary"
                    endIcon={<AddCircleOutlineIcon/>}
                    component={ToLink} to={'/addPhoto'}
                >
                    Add new photo
                </Button>

                <Grid container>
                    {userPhotoList}
                </Grid>
            </div>
            <MyModal
                open={open.open}
                onClose={onCLose}
            >
                <img src={open.image} alt='image' />
            </MyModal>
        </>
    );
};

export default UserPhoto;