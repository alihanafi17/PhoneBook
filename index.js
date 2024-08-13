// js code
"use strict";
function openModal() {
  document.getElementById('myModal').style.display = 'flex';
}

function closeModal(event) {
  if (event.target === document.getElementById('myModal') || event.target === document.getElementById('closeModalBtn')) {
    document.getElementById('myModal').style.display = 'none';
  }
}

let users = [
  {
    name: "ali hanafi",
    number: "0545930714",
    email: "example@example.com"
  },
  {
    name: "bashar safieh",
    number: "0545930714",
    email: "example@example.com"
  },
  {
    name: "john cena",
    number: "0545930321",
    email: "example@example.com"
  },
  {
    name: "hanafi ali",
    number: "0545933432",
    email: "example@example.com"
  }
];

const list = document.querySelector(".list");

function addContact(contact, ind) {
  if (list.innerHTML === `<p> No contacts ! </p>`)
    list.innerHTML = ``;
  const li = document.createElement('li')
  li.classList.add("contact")
  li.innerHTML =
    `
    <div class="contact-info">
    <img src="img/contact.png" alt="">
    <p>${contact.name}</p>
    <p class="detail">${contact.number}</p>
    <p class="detail">${contact.email}</p>
    </div>
    <div class="contact-actions">
        <img onclick="popInfo(${ind})" src="img/info.png" alt="Error 404">
        <img  onclick="popEdit(${ind})" src="img/edit.png" alt="Error 404">
        <img onclick="dltContact(${ind})" src="img/delete.png" alt="Error 404">
    </div>
  `
  list.append(li);
}

users.forEach((contact, ind) => addContact(contact, ind))

function popInfo(ind) {
  openModal();
  const modalCont = document.querySelector(".modal-container");
  const contact = users[ind]
  modalCont.innerHTML =
    `
    <img src="img/contact.png" alt="Error 404">
    <p>Name: ${contact.name}</p><br
    <p>Number: ${contact.number}</p><br
    <p>Email: ${contact.email}</p>
  `
}

function popEdit(ind) {
  openModal();
  const modalCont = document.querySelector(".modal-container");
  const contact = users[ind]
  modalCont.innerHTML =
    `
    <form>
    <img src="img/contact.png" alt="Error 404">
    <label>Name: <input id="editName" type="text" value="${contact.name}"> </label>
    <label>Number: <input id="editNumber" type="number" value="${contact.number}"></label>
    <label>Email: <input id="editEmail" type="email" value="${contact.email}"></label>
    <input type="submit" id="saveBtn" onclick="saveEdit(event,${ind})" value="Save" ></input>
    </form>
  `
}

function dltAll() {
  let isOk=confirm("are you sure?");
  if(isOk)
  {
    list.innerHTML =
    `
    <p id="inner"> no contacts were added  </p>
    
    `
    users = [];
  }
}

function dltContact(ind) {
  let isOk=confirm("are you sure?");
  if(isOk)
  {
    users = users.slice(0, ind).concat(users.slice(ind + 1))
    list.innerHTML = ``;
    users.forEach((contact, ind) => addContact(contact, ind))
    if (users.length === 0)
      list.innerHTML =
        `
        <p id="inner"> no contacts were added  </p>

        `
  }
}

function popAdd() {
  openModal();
  const modalCont = document.querySelector(".modal-container");
  modalCont.innerHTML =
    `
    <img src="img/contact.png" alt="Error 404">
    <p>Name: <input id="addName" type="text" placeholder="name"> </p><br
    <p>Number: <input id="addNumber" type="number" placeholder="number"></p><br
    <p>Email: <input id="addEmail" type="text" placeholder="email"></p>
    <button id="saveBtn" onclick="saveNew()">Save</button>
  `
}

function saveNew() {
  let newName = document.querySelector("#addName").value;
  let newNumber = document.querySelector("#addNumber").value;
  let newEmail = document.querySelector("#addEmail").value;
  if (newName === "" || newNumber === "")
    alert("name or number can't be empty")
  else {
    if (!newEmail.includes('@') || !newEmail.includes('.')) 
      alert("Invalid email address");
    else
      {
      const newUser = { name: newName, number: newNumber, email: newEmail };
      users[ind] = newUser;
      list.innerHTML = ``;
      users.forEach((contact, ind) => addContact(contact, ind));
      document.getElementById('myModal').style.display = 'none';
      }
    }

}

function saveEdit(event,ind) {
  event.preventDefault();
  let newName = document.querySelector("#editName").value;
  let newNumber = document.querySelector("#editNumber").value;
  let newEmail = document.querySelector("#editEmail").value;
  if (newName === "" || newNumber === "")
    alert("name or number can't be empty")
  else {
  if (!newEmail.includes('@') || !newEmail.includes('.')) 
    alert("Invalid email address");
  else
    {
    const newUser = { name: newName, number: newNumber, email: newEmail };
    users[ind] = newUser;
    list.innerHTML = ``;
    users.forEach((contact, ind) => addContact(contact, ind));
    document.getElementById('myModal').style.display = 'none';
    }
  }

}

function searchContact(e) {
  list.innerHTML = ``;
  const filteredList = users
    .filter(user => {
      return user.name.toLowerCase().startsWith(e.target.value.toLowerCase());
    });
    list.innerHTML = ``;
    filteredList.forEach(user => {
    addContact(user);
  })
}

list.addEventListener('mouseover', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.style.fontWeight = 'bold';
    event.target.style.backgroundColor = '#f7f7f7'; // or any other darker shade
  }
});

list.addEventListener('mouseout', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.style.fontWeight = 'normal';
    event.target.style.backgroundColor = ''; // reset to default background color
  }
});

// end of js code
