//make it all use json object

exports.allAccess = async (req, res) => {
    res.status(200).send({ message: "Public Content." });
  };

exports.userBoard = async (req, res) => {
    res.status(200).send({ message: "User Content." });
};
  
exports.adminBoard = async (req, res) => {
    res.status(200).send({ message: "Admin Content." });
};

exports.moderatorBoard = async (req, res) => {
    res.status(200).send({ message: "Mod Content." });
};