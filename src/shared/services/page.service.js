



export function Pagination(nPage, nLimit) {
    let page = isNaN(Number(nPage)) ? 0 : Number(nPage);
    let limit = isNaN(Number(nLimit)) ? 10 : Number(nLimit);

    if (limit > 100) {
        limit = 10;
    }

    const offset = page * limit;

    return {
        offset,
        limit
    }
}
