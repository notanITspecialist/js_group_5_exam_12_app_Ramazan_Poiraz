import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Toast from "light-toast";
import {addPhoto} from "../../actions/gallery";

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AddPhoto = () => {

    const classes = useStyles();

    const initAddForm = {
        title: '',
        image: ''
    };
    const [photo, setPhoto] = useState(initAddForm);
    const dispatch = useDispatch();

    const registerUserOnSubmit = async e => {
        e.preventDefault();

        // if(loginForm.username.length < 5) return Toast.fail('Имя пользователя должно содержать больше 5 символов!',2000);
        // if(loginForm.password.length < 5) return Toast.fail('Пароль должен содержать больше 5 символов!',2000);

        const data = new FormData();

        Object.keys(initAddForm).forEach(e => {
            data.append(e, photo[e])
        });

        await dispatch(addPhoto(data));
    };

    const changeLoginForm = e => setPhoto({...photo, [e.target.name]: e.target.value});
    return (
        <Container component="main" maxWidth="xs">
            <Typography variant='h5'>Create new photo</Typography>

            <div className={classes.paper}>

                <form className={classes.form} noValidate onSubmit={registerUserOnSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Title"
                        name="title"
                        autoFocus
                        value={photo.title}
                        onChange={changeLoginForm}
                    />

                    <Grid>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none'}}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={e => setPhoto(photo => ({...photo ,image: e.target.files[0]}))}
                        />
                        <label htmlFor="raised-button-file">
                            <Button type='button' component="span" className={classes.button}>
                                Upload image
                            </Button>
                        </label>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create photo
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default AddPhoto;
