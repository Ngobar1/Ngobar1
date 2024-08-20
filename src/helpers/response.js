exports.sendResponse = (
  res,
  status,
  message,
  data = null,
  authorization = null,
) => {
  const layout = {
    status,
    message,
  };

  if (data) {
    layout.data = data;
  }

  if (authorization) {
    layout.authorization = authorization;
  }
  return res.status(status).json(layout);
};
