function arrayToPagination(arry:any[],countForPage:number){
    let pages = []
    let i = 0;
    while(i< arry.length){
        let page = arry.slice(i,countForPage+i);
        pages.push(page);
        i = i + countForPage;
    }


    return pages;
}


export {arrayToPagination};
