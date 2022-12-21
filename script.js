const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const addBtn = document.getElementById('add');

//создаем обьект который будет хранить каждую тудушку
let toDoData = [];

const render = function () {
   todoList.innerHTML = '';
   todoCompleted.innerHTML = '';

   toDoData.forEach(function (item) {
      const li = document.createElement('li');

      li.classList.add('todo-item');

      li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
         '<div class="todo-buttons">' +
         '<button class="todo-remove"></button>' +
         '<button class="todo-complete"></button>' +
         '</div>';

      if (item.completed) {
         todoCompleted.append(li);
      } else {
         todoList.append(li);
      }

      li.querySelector('.todo-complete').addEventListener('click', function () {
         item.completed = !item.completed;
         render();
      });

      //Удаление дел на кнопку КОРЗИНА
      li.querySelector('.todo-remove').addEventListener('click', function () {
         toDoData.splice(item, 1);

         render();
      });
   });

   //Дела из localStorage подгружаться должны автоматически при загрузки странице
   localStorage.setItem("toDoData", JSON.stringify(toDoData));

   if (localStorage.getItem('toDoData')) {
      toDoData = JSON.parse(localStorage.getItem('toDoData'));
   }
};

//функция в кот будут добавляться новые тудушки по клику на кнопку сабмит
todoControl.addEventListener('submit', function (event) {

   event.preventDefault();

   const newToDo = {
      text: headerInput.value,
      completed: false
   };

   //3 -Пустые дела добавляться не должны
   if (headerInput.value.trim() !== '') {
      toDoData.push(newToDo);
      headerInput.value = '';

      render();
   }
});