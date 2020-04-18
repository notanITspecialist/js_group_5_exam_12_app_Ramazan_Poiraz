import React from 'react';
import FacebookLoginBtn from 'react-facebook-login/dist/facebook-login-render-props'
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../actions/user";
import FacebookIcon from '@material-ui/icons/Facebook';
import Button from "@material-ui/core/Button";

const FacebookLogin = props => {
    const dispatch = useDispatch();

    const facebookCallback = data => {
        if(data.id){
            dispatch(loginWithFacebook(data, props.history))
        }
    };
    return (
        <div>
            <FacebookLoginBtn
                appId="2815399871870371"
                callback={facebookCallback}
                fields='name,email, picture'
                readPermissions={['public_profile']}
                render={renderProps => (
                    <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={renderProps.onClick}
                    startIcon={<FacebookIcon />}
                    >
                    Login in facebook
                    </Button>
                )}
            />
        </div>
    );
};

export default FacebookLogin;