class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBook(book) {
    // const container = document.getElementById('container');
    // const form = document.getElementById('book-form');
    const tr = document.createElement('tr');

    tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class ='delete'>X</a></td>
    `
    document.querySelector('.book-list').appendChild(tr);
  }

  showNotification(message, classList) {
    const notification = document.createElement('div');
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');

    notification.classList = `${classList}`;
    notification.textContent = `${message}`;
    container.insertBefore(notification, form);

    setTimeout(() => {
      notification.remove()
    }, 2000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Event Listeners
document.getElementById('submit').addEventListener('click', (e) => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  const ui = new UI;

  if (title === '' || author === '' || isbn === '') {
    ui.showNotification('Please complete all fields', 'error');
  } else {
    ui.showNotification('Book added', 'success');
    ui.addBook(book);
    ui.clearFields();
  }

  e.preventDefault();
});

document.querySelector('.book-list').addEventListener('click', (e) => {
  const ui = new UI();
  ui.deleteBook(e.target);

  // ui.showNotification('Book removed', 'success');
  e.preventDefault(e);
});