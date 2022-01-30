const response = (resMessage, resData = {}) => {
    return {
        message: resMessage,
        data: resData
    }
}

module.exports = response;