const applyPaging = (results, page = 1, limit = 10) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return results.slice(startIndex, endIndex);
};

module.exports = applyPaging;
