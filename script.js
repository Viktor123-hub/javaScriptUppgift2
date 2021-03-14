const form = document.querySelector('#todoForm');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const knapp = document.querySelector('#knapp');

let todos = [];

const fetchTodos = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(data => {
        todos = data;
        listTodos();
    })
}

fetchTodos();

const listTodos = () => {
    output.innerHTML = '';
    todos.forEach(todo => {
        newTodo(todo);
    })
}

const validateText = () => {
    const error = knapp.nextElementSibling;
  
    if(input.value === '') {
      error.innerText = 'Du måste skriva något!';
      input.classList.add('is-invalid');
      return false;
    } else if(input.value.length > 99) {
      error.innerText = 'Max 100 Tecken!';
      input.classList.add('is-invalid');
      return false;
    } else {
      input.classList.add('is-valid');
      input.classList.remove('is-invalid');
      return true;
    }
  }



  const resetForm = () => {
    document.querySelectorAll('input').forEach(input => {
      input.value = '';
      input.classList.remove('is-valid');
    })
  }
  
const newTodo = (todo) => {

    let card = document.createElement('div');
    card.classList.add('card', 'p-3', 'my-3', 'postit', 'align-items-center');

    let innerCard = document.createElement('div');
    innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'my-3');

    let title = document.createElement('h5');
    title.innerText = todo.title;

    innerCard.appendChild(title);
    card.appendChild(innerCard);
    output.appendChild(card);

}

const createTodo = (title) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title,
            completed: false
        })
    })
    .then(res => res.json())
    .then(data => {
        let newTodo = {
            ...data
        }
        todos.unshift(newTodo);
        listTodos();
        console.log(data);
    })
}


form.addEventListener('submit', e => {
    e.preventDefault();

    if(validateText('input')) {
        createTodo(input.value);
        resetForm();
      }
})
