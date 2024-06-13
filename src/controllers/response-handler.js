export const setResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

export const setResponse1 = (httpStatus, obj, response) => {
  response.status(httpStatus);
  response.json(obj);
}

export const setErrorResponse = (httpStatus, err, response) => {
  let errMsg;
  switch(httpStatus){
      case 400:
          errMsg = 'Bad Request';
          break;
      case 404:
          errMsg = 'Not Found';
          break;
      case 500:
          errMsg = 'Internal Server Error';
          break;
      default:
          errMsg = 'Error';
  }
  const errorObj = {
      code: httpStatus,
      message: errMsg,
      details: err
  };
  console.error("Error details:", err);

  response.status(httpStatus);
  response.json({ error: errorObj });
};
