// let contacts = [
//   {
//     name: "Mr. Freeman",
//     phone: "ххх-ххх-ххх",
//     image:
//       "https://avatars.mds.yandex.net/i?id=61cbab5f39c2ec39445472a274734088f1e6ab4b-9151370-images-thumbs&n=13",
//   },
//   {
//     name: "П.П. Петров",
//     phone: "ххх-ххх-ххх",
//     image: "https://instalook.ru/uploads/dakimakura/mr-freeman-2912.jpg",
//   },
// ];

// ! ====================================================================================================================================================================

let btn = document.querySelector("#btn");
let name = document.querySelector("#name");
let phone = document.querySelector("#phone");
let img = document.querySelector("#image");
let contactList = document.querySelector("#contactList");

let contacts = JSON.parse(localStorage.getItem("contacts-data")) || [];

btn.addEventListener("click", () => {
  let nameValue = name.value.trim();
  let phoneValue = phone.value.trim();
  let imgValue = img.value.trim();

  if (!nameValue || !phoneValue) {
    alert("Заполните все поля");
    return;
  }

  let contact = { name: nameValue, phone: phoneValue };

  // if (imgValue) {
  //   contact.image = imgValue;
  // }

  contact.image = imgValue
    ? imgValue
    : "https://avatars.mds.yandex.net/i?id=61cbab5f39c2ec39445472a274734088f1e6ab4b-9151370-images-thumbs&n=13"; //"https://instalook.ru/uploads/dakimakura/mr-freeman-2912.jpg";

  contacts.push(contact);
  displayContacts();
  setItemToStorage(contacts);

  //  ==================================================================

  name.value = "";
  phone.value = "";
  img.value = "";
});

function setItemToStorage(contacts) {
  localStorage.setItem("contacts-data", JSON.stringify(contacts));
}

function displayContacts() {
  contactList.innerHTML = "";

  contacts.forEach(function (contact) {
    let li = document.createElement("li");
    li.className = "contact";

    let imgElement = document.createElement("img");
    imgElement.src = contact.image || "placeholder-image.png";
    imgElement.alt = contact.name;

    let div = document.createElement("div");
    div.textContent = contact.name;
    let p = document.createElement("p");
    p.textContent = contact.phone;
    div.appendChild(p);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteContact(contact);
    };

    li.appendChild(imgElement);
    li.appendChild(div);
    li.appendChild(deleteButton);

    contactList.appendChild(li);
  });
}

function deleteContact(contact) {
  let index = contacts.indexOf(contact);
  if (index !== -1) {
    contacts.splice(index, 1);
    displayContacts();
    setItemToStorage(contacts);
  }
}

displayContacts();

// const API = "http://localhost:8000";
// fetch(API)
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     data.Search.forEach((elem) => {
//       info.innerHTML += `
//
//        `;
//     });
// });

// const API = "http://localhost:8000/contacts";

// // Функция для получения списка контактов с сервера
// async function getContactsFromServer() {
//   try {
//     const response = await fetch(API);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching contacts:", error);
//   }
// }

// // Функция для отправки контакта на сервер
// async function addContactToServer(contact) {
//   try {
//     const response = await fetch(API, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(contact),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error adding contact:", error);
//   }
// }

// // Функция для удаления контакта с сервера
// async function deleteContactFromServer(contactId) {
//   try {
//     const response = await fetch(`${API}/${1}`, {
//       method: "DELETE",
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error deleting contact:", error);
//   }
// }
