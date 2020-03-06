export function dateParse(date){

    let year = new Date(date).toLocaleDateString()
    let time = new Date(date).toLocaleTimeString()
    return year+time
}

// 节流函数
export function throttle(target,wait){
    let pre = Date.now()
    return function(){
        console.log(...arguments)
        let now = Date.now()
        if(now-pre >= wait){
            target.apply(this,arguments)
            pre = Date.now()
        }
    }
}