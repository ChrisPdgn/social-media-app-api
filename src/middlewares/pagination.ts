
function paginate(page: number, limit: number, array: any) {

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let result = {"next": {} , "previous": {}, "results": [] };

    if(endIndex < array.length) {
        result.next = {
            page: page + 1,
            limit: limit
        };
    }
    
    if(startIndex > 0) {
        result.previous = {
            page: page - 1,
            limit: limit
        };
    }

    result.results = array.slice(startIndex, endIndex);
    return result;
}

export default paginate;