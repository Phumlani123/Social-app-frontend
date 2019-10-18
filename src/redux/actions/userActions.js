import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from '../type';
import axios from 'axios';

export const loginUser = (userData, history) => (dispacth) => {
    dispacth({type: LOADING_UI });
    axios
        .post('/login', userData)
        .then((res) => {   
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            axios.defaults.header.common['Authorization'] = FBIdToken;
            dispacth(getUserData());
            dispacth({ type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch((err) => {
            dispacth({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const getUserData = () => (dispacth) => {
    axios.get('/user')
        .then(res => {
            dispacth({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}