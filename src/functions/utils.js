// 웹뷰에서 RN으로 데이터를 보낼때 사용합니다.
export function sendToRN(num){
    if (window.ReactNativeWebView) {
        // RN에서 데이터는 반드시 문자열로 받을 수 있기 때문에 
        // JSON.stringify를 사용합니다.
        window.ReactNativeWebView.postMessage(
            JSON.stringify({data: num})
        );
    } else {
        // -- 
    }
};
export function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}