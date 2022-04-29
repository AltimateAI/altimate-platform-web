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

export const get_my_SdkAccessKeys = (setKeys, setLoaded) => {
    const url = BaseUrl + "access_key";

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.get(url, config).then((response) => {
            const {data} = response;
            let {message} = data;
            if (data.status === 401) {            
                console.log(message);
            }
            else if (data.status === 200) {
                setKeys(data.list);
                setLoaded(true);
            }
    
        }).catch(err => console.error(err))
    });    
};

export const generateSdkAccessKey = (setKeys, setLoaded) => {
    const url = BaseUrl + "access_key";

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.post(url, {}, config).then((response) => {
            const {data} = response;
            let {message} = data;
            if (data.status === 404) {           
                console.log(message);
            }
            else if (data.status === 201) {
                get_my_SdkAccessKeys(setKeys, setLoaded);
            }
    
        }).catch(err => console.error(err))
    });    
};

export const get_my_projects = (setProjects, setErrorMessage, setLoaded) => {
    const url = BaseUrl + "project";

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.get(url, config).then((response) => {
            const {data} = response;
            let {message} = data;
            if (data.status === 401) {            
                console.log(message);
                setErrorMessage(message);
            }
            else if (data.status === 200) {
                const projects = data.list;
                setProjects(projects);
                setLoaded(true);
            }
    
        }).catch(err => console.error(err))
    });    
};

export const get_project = (id, setProject) => {
    const url = BaseUrl + "project/" + id;

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.get(url, config).then((response) => {
            const {data} = response;
            let {message} = data;
            if (data.status === 404 || data.status === 403) {            
                console.log(message);
            }
            else if (data.status === 200) {
                setProject(data);
            }
    
        }).catch(err => console.error(err))
    });    
};

export const delete_project = (id, setErrorMessage, setLoaded, setProjects) => {
    const url = BaseUrl + "project/" + id

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.delete(url, config).then((response) => {
            const {data} = response;
            let {message} = data;
            if (data.status === 400) {        
                console.log(message);
                setErrorMessage(message);
            }
            else if (data.status === 200) {
                get_my_projects(setProjects, setErrorMessage, setLoaded);
            }
    
        }).catch(err => console.error(err))
    });    
};

export const update_project = (id, project, setSubmitting, setFieldError, closeModal) => {
    const url = BaseUrl + "project/" + id

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.put(url, project, config).then((response) => {
            const {data} = response;
            let {message, status} = data;
            if (status === 400 || status === 403) {
                setSubmitting(false);
                setFieldError("name", message);
            }
            else if (data.status === 200) {
                setSubmitting(false);
                closeModal();           
            }
    
        }).catch(err => console.error(err))
    });    
};

export const add_project = (project, setSubmitting, setFieldError, closeModal) => {
    const url = BaseUrl + "project"

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.post(url, project, config).then((response) => {
            const {data} = response;
            let {message, status} = data;
            if (status === 400 || status === 403) {  
                setSubmitting(false);
                setFieldError("name", message);
            }
            else if (status === 201) {
                setSubmitting(false);
                closeModal();
            }
    
        }).catch(err => console.error(err))
    });    
};

export const get_notebooks = (setNotebooks, setLoaded) => {
    const url = BaseUrl + "notebook";

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.get(url, config).then((response) => {
            const {data} = response;
            let {message} = data;
            if (data.status === 404 || data.status === 403) {            
                console.log(message);
            }
            else if (data.status === 200) {
                setNotebooks(data.list);
                setLoaded(true);
            }
    
        }).catch(err => console.error(err))
    });    
};

export const get_long_url = (shortUrl) => {
    const url = BaseUrl + "shortenUrl/" + shortUrl;

    const config = {
        headers: {
            "content-type": "application/json"
        }
    }
          
    axios.get(url, config).then((response) => {
        const {data} = response;
        let {message} = data;
        if (data.status === 404) {            
            console.log(message);
        }
        else if (data.status === 200) {
            window.location.replace(data.longUrl)
        }    
    }).catch(err => console.error(err))
};

export const get_comments = (html_id, setComments) => {
    const url = BaseUrl + "comment/" + html_id;

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.get(url, config).then((response) => {
            const {data} = response;
            let {message} = data;
            if (data.status === 404 || data.status === 403) {            
                console.log(message);
            }
            else if (data.status === 200) {
                setComments(data.list);
            }
    
        }).catch(err => console.error(err))
    });    
};

export const add_comment = (values, setComments) => {
    const url = BaseUrl + "comment";

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.post(url, values, config).then((response) => {
            const {data} = response;
            let {message} = data;
            if (data.status === 404 || data.status === 403) {            
                console.log(message);
            }
            else if (data.status === 201) {
                console.log(data);
                get_comments(values.html_id, setComments);
            }
    
        }).catch(err => console.error(err))
    });    
};

export const get_html_table = (public_id, setTable, setHtml_id, setComments) => {
    const url = BaseUrl + "html_table/" + public_id;

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.get(url, config).then((response) => {
            const {data} = response;
            let {message} = data;
            if (data.status === 404 || data.status === 403) {            
                console.log(message);
            }
            else if (data.status === 200) {
                setTable(data.html_content);
                setHtml_id(data.id)
                get_comments(data.id, setComments)
            }
    
        }).catch(err => console.error(err))
    });    
};

export const get_my_reports = (setReports, setErrorMessage, setLoaded) => {
    const url = BaseUrl + "html_table";

    sessionService.loadSession().then(session => {
        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + session
            }
          }
          
        axios.get(url, config).then((response) => {
            const {data} = response;
            let {message} = data;
            if (data.status === 401) {            
                console.log(message);
                setErrorMessage(message);
            }
            else if (data.status === 200) {
                const reports = data.list;
                setReports(reports);
                setLoaded(true);
            }
    
        }).catch(err => console.error(err))
    });    
};
