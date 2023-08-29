const Sequelize = require('sequelize');//importing the sequelize


//making the data base connection
const sequelize = new Sequelize('practise_db','root','10031998mysql@',{
    host:'localhost',
    dialect: 'mysql'
})

//defining the table in databse
const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true // Add auto-increment option
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    number: Sequelize.STRING
},{
    timestamps:false
});

module.exports = User;