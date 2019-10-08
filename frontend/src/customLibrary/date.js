/** 
 * 작성자 : 김지완
 * 
 * 날짜를 문자열로 전달받아 yyyy-mm-dd 형식으로 변환하여 리턴하는 함수
 * 
 * */ 
export const formatDate = (dateStr) => {
    let date = new Date(dateStr);

    let year = date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    
    if(month.length < 2) {
        month = '0' + month;
    }

    if(day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}