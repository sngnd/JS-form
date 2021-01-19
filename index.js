let array = [];

const submitBtn = document.querySelector("#submitBtn");
const form = document.querySelector("#form");
const cardWrapper = document.querySelector(".card__wrapper");
const modalWrapper = document.querySelector(".modal__wrapper");
const closeBtn = document.querySelector("#closeBtn");
const okBtn = document.querySelector("#okBtn");

let indexToEdit;

const drawCard = () => {
    cardWrapper.innerHTML = "";

    array.forEach((item, index) => {
        cardWrapper.innerHTML += `<div class="card">
            <p>Title: <span class="card__title">${item.title}</span></p>
            <p>Description: <span class="card__description">${item.description}</span></p>
            <button id="deleteBtn">Delete</button>
            <button id="editBtn">Edit</button>
            </div>`;
    });
};

const deleteFromArray = (title, desc) => {
    array.splice(
        array.findIndex(
            (item) => item.title === title && item.description === desc
        ),
        1
    );
};

const deleteInfo = (event) => {
    const card = event.target.closest(".card");
    const title = card.querySelector(".card__title").textContent;
    const description = card.querySelector(".card__description").textContent;

    deleteFromArray(title, description);
    drawCard(array);
};

const openModal = (title, desc) => {
    modalWrapper.style.display = "block";
    const modalInfo = modalWrapper.querySelector(".modal__info");
    modalInfo.innerHTML = `<label for='edit-title'>Title:</label>
    <input id="edit-title" value=${title} required>
    <label for='edit-description'>Description:</label>
    <input id="edit-description" value=${desc} required>`;
};

const editInfo = (event) => {
    const card = event.target.closest(".card");
    const title = card.querySelector(".card__title");
    const description = card.querySelector(".card__description");

    if (isInArray(title, description)) {
        openModal(title.textContent, description.textContent);

        return array.findIndex(
            (item) =>
            item.title === title.textContent &&
            item.description === description.textContent
        ); // return index of element to edit
    }
};

const isInArray = (title, description) => {
    return array.includes(
        array.find(
            (item) =>
            item.title === title.textContent &&
            item.description === description.textContent
        )
    );
};

const closeModal = () => {
    modalWrapper.style.display = "none";
};

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");

    array.push({ title: title.value, description: description.value });

    drawCard();
    cardWrapper.style.display = "flex";
    form.reset();
});

cardWrapper.addEventListener("click", (event) => {
    if (event.target.closest("#deleteBtn")) {
        deleteInfo(event);
    } else if (event.target.closest("#editBtn")) {
        indexToEdit = editInfo(event);
    }
});

closeBtn.addEventListener("click", () => {
    closeModal();
});

okBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const editDescription = document.querySelector("#edit-description").value;
    const editTitle = document.querySelector("#edit-title").value;

    let editObj = {};
    editObj.title = editTitle;
    editObj.description = editDescription;

    array[indexToEdit] = editObj;

    closeModal();
    drawCard();
});

modalWrapper.addEventListener("click", (event) => {
    if (!event.target.closest(".modal__content")) closeModal();
});