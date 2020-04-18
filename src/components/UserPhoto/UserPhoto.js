import React from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from "@material-ui/core/Button";
import {NavLink as ToLink} from "react-router-dom";

const UserPhoto = () => {
    return (
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
            
        </div>
    );
};

export default UserPhoto;