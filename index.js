
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json()); 
let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 2, title: "The Lord of the Rings", author: "J.R.R. Tolkien" }
];
app.get('/books', (req, res) => {
  res.json(books);
});
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required." });
  }

  const newBook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) {
    return res.status(404).json({ message: "Book not found." });
  }
  books.splice(index, 1);
  res.json({ message: "Book deleted successfully." });
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
