// JavaScript code
window.addEventListener("DOMContentLoaded", () => {
    fetchAppointmentData();
});

var form = document.getElementById('details');
form.addEventListener('submit', submitUserData);

function submitUserData(e) {
    e.preventDefault();//fetiching data  from input fields and giving it to the variables
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var number = document.getElementById('number').value;



    var userData = {//making object of the data
        name: name,
        email: email,
        number: number
    };

    // Making network call to add a new user to server database
    axios.post("https://localhost:4000/", userData)
        .then((response) => {
            displayDataOnScreen(response.data);//displaying sbmitted data on the screen
        })
        .catch((err) => {
            console.log(err);
        });

    // Reset the form inputs
    form.reset();
}

function deleteUser(event) {
    var li = event.target.parentElement;
    var userID = li.getAttribute('data-user-id');

    // Making axios request to delete details from server
    axios.delete(`https://crudcrud.com/api/26246512261c414db9e719490bd52d6e/AppointmentData/${userID}`)
        .then(() => {
            li.remove();
        })
        .catch((error) => {
            console.log(error);
        });
}

function editdetails(event) {
    var li = event.target.parentElement;
    var userID = li.getAttribute('data-user-id');//taking user id form parent 
    //parent here is <li class="list-group-item" data-user-id = _userID >Dummy USER</li>

    // Fetch the user data from server based on userID
    axios.get(`https://crudcrud.com/api/26246512261c414db9e719490bd52d6e/AppointmentData/${userID}`)
        .then((response) => {
            var userData = response.data;
            document.getElementById('name').value = userData.name;
            document.getElementById('email').value = userData.email;
            document.getElementById('number').value = userData.number;

            // Delete the existing user data from the browser and server
            axios.delete(`https://crudcrud.com/api/26246512261c414db9e719490bd52d6e/AppointmentData/${userID}`)
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
}

function displayDataOnScreen(userData) {
    var li = document.createElement('li');
    li.className = 'list-group-item';

    var name = userData.name;
    var email = userData.email;
    var number = userData.number;
    var userID = userData._id; // Assuming the server returns the ID as "_id". Change this according to your API.

    li.setAttribute('data-user-id', userID); // Add the user's ID as a data attribute to the list item (li)
    /*demonstration
    
    <ul id="users" class="list-group">
        <li class="list-group-item" data-user-id = _userID >Dummy USER</li>
    
    */

    var liname = document.createTextNode(name);
    li.appendChild(liname);
    li.appendChild(document.createElement('br'));

    li.appendChild(document.createTextNode(email));
    li.appendChild(document.createElement('br'));

    li.appendChild(document.createTextNode(number));
    li.appendChild(document.createElement('br'));

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'remove';
    deleteButton.addEventListener('click', deleteUser); // Attach the deleteUser function here
    li.appendChild(deleteButton);

    var editButton = document.createElement('button');
    editButton.textContent = 'edit'; // Corrected the textContent property for editButton
    editButton.addEventListener('click', editdetails);
    li.appendChild(editButton);

    var userList = document.getElementById('users');
    userList.appendChild(li);
}

function fetchAppointmentData() {
    axios.get("https://crudcrud.com/api/26246512261c414db9e719490bd52d6e/AppointmentData")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                displayDataOnScreen(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
