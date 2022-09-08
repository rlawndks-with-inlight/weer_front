import axios from 'axios';
// 웹뷰에서 RN으로 데이터를 보낼때 사용합니다.
export function sendToRN(num) {
    if (window.ReactNativeWebView) {
        // RN에서 데이터는 반드시 문자열로 받을 수 있기 때문에 
        // JSON.stringify를 사용합니다.
        window.ReactNativeWebView.postMessage(
            JSON.stringify({ data: num })
        );
    } else {
        // -- 
    }
};
export function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
export function range(start, end) {
    let array = [];
    for (let i = start; i <= end; ++i) {
        array.push(i);
    }
    return array;
}
export const addItem = async (type, obj) => {
    const { data: response } = await axios.post(`/api/add${type}`, obj)
    alert(response.message);
    if (response.result > 0) {
        window.history.back();
    }
}
export const updateItem = async (type, obj) => {
    const { data: response } = await axios.post(`/api/update${type}`, obj)
    alert(response.message);
    if (response.result > 0) {
        window.history.back();
    }
}
export const deleteItem = async (type, obj) => {

}
export const commarNumber = (num) => {
    let str = "";
    if (typeof num == "number") {
        str = num.toString();
    } else {
        str = num;
    }
    let result = "";
    let count = 0;
    for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) result = "," + result;
        result = str[i] + result;
        count++;
    }
    console.log(result)
    return result;
}
export const returnMoment = (num,type) => {//num 0: 오늘, num -1: 어제 ,  type=date 날짜만, type=moment 시간까지 다 나오게
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;
    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);
    var timeString = hours + ':' + minutes + ':' + seconds;
    let moment = dateString + ' ' + timeString;
    return moment;
}
export const getIframeLinkByLink = (str) =>{
    let ans = "";
    for(var i = 0;i<str.length;i++){
        if(str[i]=='v'&&str[i+1]=='='){
            for(var j=i+2;j<str.length;j++){
                if(str[j]=='&') break;
                ans += str[j];
            }
        }
    }
    
    return ans;
}