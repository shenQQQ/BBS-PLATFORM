import { store } from '../const/store';
import Axios from './axios';
import { setConfig } from '../actions/configActions';

export default function getConfigration() {
    const config = {
        menu : []
    }
    Axios.get("/config").then((res) => {
        config.menu = res.data.content
        store.dispatch(setConfig(config))
    }).catch(error => {
        console.log(error);
    })
}