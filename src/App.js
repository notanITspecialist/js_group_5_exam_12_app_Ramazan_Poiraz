import React from 'react';
import {Route, Switch} from "react-router";
import NavBar from "./components/NavBar/NavBar";
import Registration from "./components/registration/registration";
import Login from "./components/Login/login";
import Container from "@material-ui/core/Container";
import ProfileUser from "./components/ProfileUser/ProfileUser";
import UserPhoto from "./components/UserPhoto/UserPhoto";
import AllPhoto from "./components/AllPhoto/AllPhoto";
import AddPhoto from "./components/AddPhoto/AddPhoto";

function App() {
    return (
        <div>
            <NavBar/>
            <Container>
                <Switch>
                    <Route path="/" exact component={AllPhoto}/>
                    <Route path="/userPhoto/:id" exact component={UserPhoto}/>
                    <Route path='/addPhoto' exact component={AddPhoto} />
                    <Route path="/profile" exact component={ProfileUser}/>
                    <Route path="/registration" exact component={Registration}/>
                    <Route path="/login" exact component={Login}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;