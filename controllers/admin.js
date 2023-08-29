const db = require('../util/database');
const User = require('../models/user');

exports.getAllDataFromServer = (req, res) => {
    User.findAll()
        .then((users) => {
            res.json(users); // Sending the retrieved data to the client
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Error retrieving data' });
        });
};

exports.getUserDataFromServer = (req, res) => {
    const userID = req.params.userID;

    User.findByPk(userID)
        .then((userData) => {
            if (userData) {
                console.log("single user data:", userData);
                res.json([userData]);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Error retrieving user data' });
        });
};

exports.postDataFromClientToServer = (req, res, next) => {
    const { name, email, number } = req.body;

    User.create({ name, email, number })
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Error saving data' });
        });
};

exports.deleteDataFromServer = (req, res, next) => {
    const userID = req.params.userID;

    User.destroy({
        where: { id: userID }
    })
        .then((deletedRows) => {
            if (deletedRows > 0) {
                res.json({ userId: userID, message: 'Data deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch((err) => {
            console.error('Error deleting data:', err);
            res.status(500).json({ error: 'Error deleting data' });
        });
};
