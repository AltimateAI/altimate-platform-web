import axios from 'axios';
import {sessionService} from 'redux-react-session';
import { BaseUrl } from '../../BaseUrl';

export const loginUser = (credentials, navigate, setFieldError, setSubmitting) => {
    const params = new URLSearchParams()
    params.append('username', credentials.email)
    params.append('password', credentials.password)

    const url = BaseUrl + "login";

    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      
    axios.post(url, params, config).then((response) => {
        const {data} = response;
        if (data.status === 401) {
            let {message} = data;
            setFieldError("email", message);
            setFieldError("password", message);
        }
        else if (data.status === 403) {
            let {message} = data;
            setFieldError("email", message);
        }
        else if (data.status === 200) {
            const token = data.access_token;
            sessionService.saveSession(token).then(() => {
                sessionService.saveUser(data).then(() => {
                     navigate("/projects")
                }).catch(err => console.error(err))
            }).catch(err => console.error(err))
        }

        setSubmitting(false);

    }).catch(err => console.error(err))
};

export const signupUser = (credentials, navigate, setFieldError, setSubmitting) => {
    axios.post(BaseUrl + "users",
    credentials,
    {
        headers: {
            "content-type": "application/json"
        }
    }
    ).then((response) => {
        const {data} = response;
        if (data.status === 400) {
            const {message} = data;
            setFieldError("email", message);
        }
        else if (data.status === 201) {
            const {email} = credentials;
            navigate("/emailSent", {
                state: {   
                    user_email: email,
                    reset: false
                }
            })
        }

        setSubmitting(false)

    }).catch(err => console.error(err))
};

export const logoutUser = (navigate) => {
    return () => {
        sessionService.deleteSession().then(() => {
            sessionService.deleteUser().then(() => {
                 navigate("/")
            }).catch(err => console.error(err))
        }).catch(err => console.error(err))
    }
};

export const forgottenPassword = (credentials, navigate, setFieldError, setSubmitting) => {
    axios.post(BaseUrl + "forgotPassword",
    credentials,
    {
        headers: {
            "content-type": "application/json"
        }
    }
    ).then((response) => {
        const {data} = response;
        if (data.status === 404) {
            const {message} = data;
            setFieldError("email", message);
        }
        else if (data.status === 200) {
            const {email} = credentials;
            navigate("/emailSent", {
                state: {   
                    user_email: email,
                    reset: true
                }
            })
        }

        setSubmitting(false)

    }).catch(err => console.error(err))
};

export const resetPassword = (credentials, navigate, setFieldError, setSubmitting) => {
    axios.patch(BaseUrl + "resetPassword",
    credentials,
    {
        headers: {
            "content-type": "application/json"
        }
    }
    ).then((response) => {
        const {data} = response;
        if (data.status === 400) {
            const {message} = data;
            setFieldError("new_password", message);
            setFieldError("confirm_new_password", message);
        }
        else if (data.status === 200) {
            navigate("/emailSent", {
                state: {   
                    user_email: null,
                    reset: false
                }
            })
        }

        setSubmitting(false)

    }).catch(err => console.error(err))
};

export const confirmEmail = (confirmation_code) => {
    const body = {
        confirmation_code
    };
    axios.patch(BaseUrl + "confirmAccount",
    body,
    {
        headers: {
            "content-type": "application/json"
        }
    }
    ).then((response) => {
        const {data} = response;
        if (data.status === 400) {
            const {message} = data;
            console.error(message)
        }
        else if (data.status === 200) {
            const {message} = data;
            console.log(message)
        }

    }).catch(err => console.error(err))
};