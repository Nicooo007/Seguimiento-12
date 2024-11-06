document.addEventListener("DOMContentLoaded", loadContacts);

const form = document.getElementById("contact-form");
const contactList = document.getElementById("contact-list");
let contacts = [];

form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Validaciones
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

    // Validar que todos los campos estén completos
    if (!nombre || !telefono || !email || !direccion) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Validar que el campo teléfono solo contenga números
    if (!/^\d+$/.test(telefono)) {
        alert("El campo teléfono solo debe contener números.");
        return;
    }

    const contact = { nombre, telefono, email, direccion };
    const index = document.getElementById("index").value;

    if (index === "") {
        addContact(contact);
    } else {
        updateContact(contact, index);
    }

    form.reset();
    document.getElementById("index").value = "";
});

function addContact(contact) {
    contacts.push(contact);
    saveContacts();
    renderContacts();
}

function updateContact(contact, index) {
    contacts[index] = contact;
    saveContacts();
    renderContacts();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
}

function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts() {
    const storedContacts = localStorage.getItem("contacts");
    contacts = storedContacts ? JSON.parse(storedContacts) : [];
    renderContacts();
}

function renderContacts() {
    contactList.innerHTML = "";
    contacts.forEach((contact, index) => {
        const contactCard = document.createElement("div");
        contactCard.classList.add("contact-card");

        const contactInfo = document.createElement("div");
        contactInfo.classList.add("contact-info");
        contactInfo.innerHTML = `
            <strong>${contact.nombre}</strong><br>
            Tel: ${contact.telefono}<br>
            Email: ${contact.email}<br>
            Dirección: ${contact.direccion}
        `;

        const actions = document.createElement("div");
        actions.classList.add("contact-actions");

        const editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => {
            document.getElementById("nombre").value = contact.nombre;
            document.getElementById("telefono").value = contact.telefono;
            document.getElementById("email").value = contact.email;
            document.getElementById("direccion").value = contact.direccion;
            document.getElementById("index").value = index;
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
            deleteContact(index);
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        contactCard.appendChild(contactInfo);
        contactCard.appendChild(actions);
        contactList.appendChild(contactCard);
    });
}
