import { store } from '../const/store';
import Axios from './axios';
import { setGlobalConfig } from '../actions/globalConfigActions';

export default function getGlobalConfig() {
    const globalConfig = {
        menu : []
    }
    Axios.get("/systemconfig").then((res) => {
        globalConfig.menu = res.data.content
        store.dispatch(setGlobalConfig(globalConfig))
    }).catch(error => {
        console.log(error);
    })
}