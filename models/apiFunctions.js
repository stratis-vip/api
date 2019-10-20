const status ={
  success: 'success',
  error: 'error',
  fail: 'fail'
}

const createResponse = err => {
  return err === null
    ? { status: status.success, data: null }
    : { status: status.error, data: null, message: err.message };
};

const createFail = () => {
  return { status: status.fail, data: { title: null } };
};

const createError = () => {
  return { status: status.error, data: { title: null } };
};



module.exports = {
    createResponse: createResponse,
    createFail: createFail,
    createError: createError,
    status: status
}