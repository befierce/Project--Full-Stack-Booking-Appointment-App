const db = require('../util/database');



exports.getAllDataFromServer = (req, res) => {
    //get data from the server
    db.execute('SELECT * FROM userdata')
        .then((result) => {
            // console.log("server se aya:",result[0]);
            res.json(result[0]);//and send it to the client
            console.log(result[0]);
        })
        .catch(() => {
            console.log(err);
        })
}

exports.getUserDataFromServer = (req,res)=>{
    const userID = req.params.userID;
    const selectQuery = 'SELECT * FROM userdata WHERE id=?';

    db.execute(selectQuery,[userID]).then(([userData])=>{
        console.log("single user data:",userData);
        return res.json(userData);
    })
}

exports.postDataFromClientToServer = (req, res, next) => {
    // console.log("client se aya:",req.body);//recieve data from client: DONE
     const { name, email, number } = req.body;

    const insertQuery = 'INSERT INTO userdata (name, email, number) VALUES (?, ?, ?)';

    db.execute(insertQuery, [name, email, number])
    .then(([results]) => {
        const id = results.insertId;
        const responseData = {id,name,email,number};
        return res.json(responseData);
    })
    .catch((error) => {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Error saving data' });
    });

}

exports.deleteDataFromServer = (req, res, next)=>{
    const userID = req.params.userID;

    const deleteQuery = 'DELETE FROM userdata WHERE ID = ?';

    db.execute(deleteQuery, [userID])
    .then((results)=>{
        const userId = results.insertId;
        res.json({ userId, message: 'Data deleted successfully' });
    })
    .catch((err)=>{
        console.error('Error deleting data:', err);
        res.status(500).json({ error: 'Error deleting data' });
    })
}

