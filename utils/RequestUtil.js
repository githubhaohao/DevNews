import DateUtil from './DateUtil.js';

const dateUtil =new DateUtil();

const delay = (ms) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            reject(new Error('timeout'));
        },ms);
    })
}

const fetchWithTimeOut = (timeout, ...args) => {
    //race 并行执行多个Promise对象，结果由最先结束的Promise对象决定。
    return Promise.race([fetch(...args),delay(timeout)]);

}

const API_DATE = 'http://gank.io/api/day/history';
const API_DAILY = 'http://gank.io/api/day/';
const TIME_OUT = 1000 * 10;


export default class RequestUtil{

    getDateArray(){
        return fetchWithTimeOut(TIME_OUT,API_DATE)
          .then(response => response.json());
    }

    async getStories(dataArray){

        let getStory = (date) =>{
            let url = dateUtil.convertDate(API_DAILY + date);
            return fetchWithTimeOut(TIME_OUT,url)
                .then(response => response.json())
                .then(data => {
                    data.date = date;
                    return data;
                })
        };

        return await Promise.all(dataArray.map(getStory));

    }

}