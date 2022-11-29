function getCurrentAge(date: string): number {
    var d = date.split('.');
    if( typeof d[2] !== "undefined" ) {
        date = d[2]+'.'+d[1]+'.'+d[0];
        return ((new Date().getTime() - +new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }
    return 0;
}

export default getCurrentAge;