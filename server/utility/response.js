const response = (resSuccess, resMessage, resData = {}) => {
    return {
        success: resSuccess,
        message: resMessage,
        data: resData
    }
}

module.exports = response;