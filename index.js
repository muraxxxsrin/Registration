document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    retrieveData();
    updateEntriesList();
});

window.onload = updateEntriesList;

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

function retrieveData() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let terms = document.getElementById("terms").checked;

    let age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("Only users between 18 and 55 years old are allowed.");
        return;
    }

    const userData = {
        name,
        email,
        password,
        dob,
        terms
    };

    let storedData = JSON.parse(localStorage.getItem("userList")) || [];
    storedData.push(userData);
    localStorage.setItem("userList", JSON.stringify(storedData));
}

function updateEntriesList() {
    let storedData = JSON.parse(localStorage.getItem("userList")) || [];
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    storedData.forEach((data) => {
        let tableRow = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = data.name;
        tableRow.appendChild(nameCell);

        let emailCell = document.createElement("td");
        emailCell.textContent = data.email;
        tableRow.appendChild(emailCell);

        let passwordCell = document.createElement("td");
        passwordCell.textContent = data.password;
        tableRow.appendChild(passwordCell);

        let dobCell = document.createElement("td");
        dobCell.textContent = data.dob;
        tableRow.appendChild(dobCell);

        let termsCell = document.createElement("td");
        termsCell.textContent = data.terms ? "True" : "False";
        tableRow.appendChild(termsCell);

        tableBody.appendChild(tableRow);
    });
}
