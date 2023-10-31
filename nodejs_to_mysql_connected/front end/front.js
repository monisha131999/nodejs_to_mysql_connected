const form = document.getElementById("form");
const FirstnameInput = document.getElementById("fname");
const LastnameInput = document.getElementById("lname");
const EmailInput = document.getElementById("email");
const phonenumberInput = document.getElementById("phone");

const dataList = document.getElementById("data-list");

const apiUrl = "http://localhost:1999/get/student";

// Function to fetch and render data
function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            dataList.innerHTML = "";
            data.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.innerHTML = `
                <p><strong>Firstname:</strong> ${item.Firstname}</p>
                <p><strong>Lastname:</strong> ${item.Lastname}</p>
                <p><strong>Email:</strong> ${item.Email}</p>
                <p><strong>phonenumber:</strong> ${item.phonenumber}</p>

                <button onclick="editItem('${item._id}')">Edit</button>
                <button onclick="deleteItem('${item._id}')">Delete</button>
            `;
                dataList.appendChild(itemDiv);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Function to add a new item
function addItem() {
    const Firstname = FirstnameInput.value;
    const Lastname = LastnameInput.value;
    const Email = EmailInput.value;
    const phonenumber = phonenumberInput.value;
    const data = { Firstname, Lastname,Email,phonenumber };
console.log(data);
    fetch('http://localhost:1999/post/student/add', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(() => {
        fetchData();
        clearForm();
    })
    .catch(error => console.error("Error adding data:", error));
}
// Function to edit an existing item


function editItem(id) {
    const updatedFirstname = prompt("Enter updated fname:");
    const updatedLastname = prompt("Enter updated lname:");
    const updatedEmail = prompt("Enter updated email:");
    const updatedphonenumber = prompt("Enter updated phonenumber:");

    if (updatedFirstname !== null && updatedLastname !== null && updatedEmail !== null && updatedphonenumber !== null) 
    {
        const data = { Firstname: updatedFirstname, Lastname: updatedLastname, Email:updatedEmail, phonenumber:updatedphonenumber };
console.log(data);
        fetch(`http://localhost:1999/put/student/update/:id${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(() => fetchData())
        .catch(error => console.error("Error editing data:", error));
    }
}

// Function to delete an item
function deleteItem(id) {
    console.log(id);
    fetch(`http://localhost:1999/delete/student/delete/:id${id}`, {
        method: "DELETE"
    })
    .then(() => fetchData())
    .catch(error => console.error("Error deleting data:", error));
}



// Function to clear the form

function clearForm() {
    FirstnameInput.value = "";
    LastnameInput.value = "";
    EmailInput.value="";
    phonenumberInput.value="";
    
}

// Event listener for form submission
from.addEventListener("submit", function (e) {
    e.preventDefault();
    addItem();
    // editItem(id);
});

// Initial fetching of data
fetchData();