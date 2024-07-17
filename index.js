"use strict";
function openModal() {
  document.getElementById('myModal').style.display = 'flex';
}

function closeModal(event) {
  if (event.target === document.getElementById('myModal') || event.target === document.getElementById('closeModalBtn')) {
    document.getElementById('myModal').style.display = 'none';
  }
  // document.getElementById('myModal').style.display = 'none';
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
    <img src="img/contact.png" alt="">
    <p>${contact.name}</p>
    <p class="detail">${contact.number}</p>
    <p class="detail">${contact.email}</p>
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
    <p>name: ${contact.name}</p><br
    <p>number: ${contact.number}</p><br
    <p>email: ${contact.email}</p>
  `
}

function popEdit(ind) {
  openModal();
  const modalCont = document.querySelector(".modal-container");
  const contact = users[ind]
  modalCont.innerHTML =
    `
    <img src="img/contact.png" alt="Error 404">
    <p>Name: <input id="editName" type="text" value="${contact.name}"> </p><br
    <p>Number: <input id="editNumber" type="text" value="${contact.number}"></p><br
    <p>Email: <input id="editEmail" type="text" value="${contact.email}"></p>
    <button id="saveBtn" onclick="saveEdit(${ind})">Save</button>
  `
}

function dltAll() {
  list.innerHTML =
    `
    <p id="inner"> No contacts ! </p>
    
    `
  users = [];
}

function dltContact(ind) {
  users = users.slice(0, ind).concat(users.slice(ind + 1))
  list.innerHTML = ``;
  users.forEach((contact, ind) => addContact(contact, ind))
  if (users.length === 0)
    list.innerHTML =
      `
      <p id="inner"> No contacts ! </p>

      `
}

function popAdd() {
  openModal();
  const modalCont = document.querySelector(".modal-container");
  modalCont.innerHTML =
    `
    <img src="img/contact.png" alt="Error 404">
    <p>Name: <input id="addName" type="text" placeholder="name"> </p><br
    <p>Number: <input id="addNumber" type="text" placeholder="number"></p><br
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
    const newUser = { name: newName, number: newNumber, email: newEmail };
    users.push(newUser);
    list.innerHTML = ``;
    users.forEach((contact, ind) => addContact(contact, ind))
    document.getElementById('myModal').style.display = 'none';
  }
}

function saveEdit(ind) {
  let newName = document.querySelector("#editName").value;
  let newNumber = document.querySelector("#editNumber").value;
  let newEmail = document.querySelector("#editEmail").value;
  if (newName === "" || newNumber === "")
    alert("name or number can't be empty")
  else {
    const newUser = { name: newName, number: newNumber, email: newEmail };
    users[ind] = newUser;
    list.innerHTML = ``;
    users.forEach((contact, ind) => addContact(contact, ind));
    document.getElementById('myModal').style.display = 'none';
  }
}

function searchContact(e) {
  list.innerHTML = ``;
  const filteredList = users
    .filter(user => {
      return user.name.toLowerCase().startsWith(e.target.value.toLowerCase());
    });
  filteredList.forEach(user => {
    addContact(user);
  })
}
