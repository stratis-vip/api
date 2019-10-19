const createResponse = err => {
  return err === null
    ? { status: "success", data: null }
    : { status: "error", data: null, message: err.message };
};

const createFail = () => {
  return { status: "fail", data: { title: null } };
};

module.exports = {
    createResponse: createResponse,
    createFail: createFail
}