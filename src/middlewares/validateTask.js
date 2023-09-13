const validateAll = (req, res, next) => {
  const { body } = req;

  if (!body.title || !body.description || !body.status) {
    return res.status(400).json({ message: "All fields are required!" });
  };

  if (body.title == '' || body.description == '' || body.status == '') {
    return res.status(400).json({ message: "Fields cannot be empty!" });
  };

  next();
};

const validateTitle = (req, res, next) => {
  const { body } = req;

  if (!body.title) return res.status(400).json({ message: "Title is required!" });

  if (body.title == '') return res.status(400).json({ message: "Title cannot be empty!" });

  next();
};

const validateDescription = (req, res, next) => {
  const { body } = req;

  if (!body.description) return res.status(400).json({ message: "Description is required!" });

  if (body.description == '') return res.status(400).json({ message: "Description cannot be empty!" });

  next();
};

const validateStatus = (req, res, next) => {
  const { body } = req;

  if (!body.status) return res.status(400).json({ message: "Status is required!" });

  if (body.status == '') return res.status(400).json({ message: "Status cannot be empty!" });

  next();
};

module.exports = {
  validateAll,
  validateTitle,
  validateStatus,
  validateDescription,
};
