/**
 * 字符串是否为经度格式
 * @param s 字符串
 * @returns 是否为经度格式
 * */
export const isLongitude = (s:string): boolean => {
    let r = /^-?[0-9]+.?[0-9]*$/;
    return r.test(s) && Number(s)>=-180 && Number(s)<=180
};
/**
 * 字符串是否为纬度格式
 * @param s 字符串
 * @returns 是否为纬度格式
 * */
export const isLatitude = (s:string): boolean => {
    let r = /^-?[0-9]+.?[0-9]*$/;
    return r.test(s) && Number(s)>=-90 && Number(s)<=90
};

/**
 * 字符串是否为数字
 */
export const isValidInt = (s:string, min ?: number, max ?:number): boolean => {
    let r = /^-?[0-9]+/;
    return r.test(s) && (!min || Number(s) >= min) && (!max || Number(s)<=max);

};

export const arrayEquals = (a: any[], b: any[]) => {
    if(a.length!==b.length) {
        return false;
    }
    for(let i=0; i<a.length; i++) {
        if(a[i]!==b[i]) {
            return false;
        }
    }
    return true;
}
