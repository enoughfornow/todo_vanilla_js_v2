const listEl = document.getElementById("list");
const createBtnEl = document.getElementById("create");

let todos = [];

const createNewTodo = () => {
  const item = {
    id: new Date().getTime(),
    text: "",
    complete: false,
  };
  todos.unshift(item);

  const { itemEl, inputEl } = createTodoElem(item);

  listEl.prepend(itemEl);
  inputEl.removeAttribute("disabled");
  inputEl.focus();

  save();
};

const createTodoElem = (item) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");
  ////////////////////////////
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.complete;

  // if (item.complete) {
  //   itemEl.classList.add("complete");
  // }

  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = item.text;
  inputEl.setAttribute("disabled", "");
  /////////////////////////////
  const actionsEl = document.createElement("div");
  actionsEl.classList.add("actions");

  const editBtnEl = document.createElement("button");
  editBtnEl.classList.add("material-icons");
  editBtnEl.innerText = "edit";

  const deleteBtnEl = document.createElement("button");
  deleteBtnEl.classList.add("material-icons", "remove-btn");
  deleteBtnEl.innerText = "delete";

  actionsEl.appendChild(editBtnEl);
  actionsEl.appendChild(deleteBtnEl);
  //////////////////////////
  itemEl.append(checkbox);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  // Events
  checkbox.addEventListener("change", () => {
    item.complete = checkbox.checked;

    if (item.complete) {
      itemEl.classList.add("complete");
    } else {
      itemEl.classList.remove("complete");
    }

    save();
  });

  inputEl.addEventListener("input", () => {
    item.text = inputEl.value;
  });
  inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", "");

    save();
  });

  editBtnEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
  });
  deleteBtnEl.addEventListener("click", () => {
    todos = todos.filter((t) => t.id != item.id);
    itemEl.remove();

    save();
  });
  return { itemEl, inputEl, editBtnEl, deleteBtnEl };
};
//

const save = () => {
  const saved = JSON.stringify(todos);
  localStorage.setItem("todos", saved);
};
const load = () => {
  const data = localStorage.getItem("todos");
  if (data) {
    todos = JSON.parse(data);
  }
};

const displayTodos = () => {
  load();

  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];
    const { itemEl } = createTodoElem(item);
    listEl.append(itemEl);
  }
};

displayTodos();

createBtnEl.addEventListener("click", createNewTodo);