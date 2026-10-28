// 콜백 지옥
// setTimeout(function() {
//     console.log("A");
//         setTimeout(function() {
//         console.log("B");
//             setTimeout(function() {
//             console.log("C");
//             }, 500);
//         }, 1000);
//     }, 1500);

// 위 콜백 지옥을 회피하기 위해서 프로미스 기반으로 변경. 
const timer = (str, ms = 500 ) => {
    return new Promise(function(resolve, reject) {
        setTimeout(()=>{
            console.log(str);
            if(
                // || : or 
                str === 'A' 
                || str === 'B' 
                || str === 'C' 
            ) {
                resolve({code: "허용", word: str});
            } else {
                reject(new Error("허용하지 않는 문자가 입력됐다."));
            }
        }, ms);
    });
}

timer('A')
.then((result)=>{
    // resolve 일때 실행되는 코드 작성 
    console.log(result.code, result.word);
    return timer('B', 1000); // 동기 처리를 하기위한 방법 
})
.then((result) => {
    console.log(result.code, result.word);
    return timer('C', 1500);
})
.then((result)=>{
    console.log(result.code, result.word);
})
.catch((error)=>{
    // reject 일때 실행되는 코드 작설 
    console.log(error.message);
})
.finally(()=>{
    // resolve, reject 던 무조건 실행되는 코드 
    console.log("마지막에");
})

timer('B')
.then((result)=>{
    // resolve 일때 실행되는 코드 작성 
    console.log(result.code, result.word);
})
.catch((error)=>{
    // reject 일때 실행되는 코드 작설 
    console.log(error.message);
})
.finally(()=>{
    // resolve, reject 던 무조건 실행되는 코드 
    console.log("마지막에");
})