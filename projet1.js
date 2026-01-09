// Sélection des éléments
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filters button");

// Charger les tâches sauvegardées
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Afficher les tâches
function render(filter = "all") {
    taskList.innerHTML = "";

    tasks
        .filter(t =>
            filter === "all" ? true :
            filter === "done" ? t.done :
            !t.done
        )
        .forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.done ? "done" : "";

            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="toggle(${index})">✔</button>
                    <span class="delete" onclick="removeTask(${index})">✖</span>
                </div>
            `;

            taskList.appendChild(li);
        });
}

// Ajouter une tâche
addBtn.onclick = () => {
    if (input.value.trim() === "") return;

    tasks.push({ text: input.value, done: false });
    input.value = "";

    save();
    render();
};

// Marquer comme terminée
function toggle(index) {
    tasks[index].done = !tasks[index].done;
    save();
    render();
}

// Supprimer une tâche
function removeTask(index) {
    tasks.splice(index, 1);
    save();
    render();
}

// Sauvegarde locale
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filtres
filters.forEach(btn => {
    btn.onclick = () => {
        document.querySelector(".filters .active").classList.remove("active");
        btn.classList.add("active");
        render(btn.dataset.filter);
    };
});

// Première affichage
render();
