import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllPhoto} from "../../actions/gallery";
import {makeStyles} from "@material-ui/core/styles";
import MyModal from "../MyModal/MyModal";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

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

const AllPhoto = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const allPhoto = useSelector(state => state.gallery.allPhoto);

    const [open, setOpen] = useState({
        open: false,
        image: ''
    });

    const onOpen = image => setOpen({...open, open: true, image: image});
    const onCLose = () => setOpen({...open, open: false, image: ''});

    useEffect(() => {
        dispatch(getAllPhoto())
    }, [dispatch]);

    const allPhotoList = allPhoto && allPhoto.map(e => (
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
                <Grid container>
                    {allPhotoList}
                </Grid>
            </div>
            <MyModal
                open={open.open}
                onClose={onCLose}
            >
                <img src={open.image} alt={open.image} />
            </MyModal>
        </>
    );
};

export default AllPhoto;