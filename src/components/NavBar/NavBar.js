import React from 'react';
import UserBar from "./UserBar";
import AnonimusBar from "./AnonimusBar";
import {useSelector} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {NavLink as ToLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

const NavBar = () => {
    const user = useSelector(state => state.authorization.user);

    const useStyles = makeStyles(() => ({
        root: {
            flexGrow: 1,
            marginBottom: '5px'
        }
    }));

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Container>
                    <Toolbar >
                        <Button color="inherit" component={ToLink} to='/'>Gallery</Button>
                        {user.token ? (
                            <UserBar/>
                        ) : (
                            <AnonimusBar/>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default NavBar;