import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function AddBookForm() {
  const [bookData, setBookData] = useState({
    book_name: '',
    author: '',
    genre: [],
    rating: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For the genre field, split the comma-separated values into an array
    if (name === 'genre') {
      const genresArray = value.split(',').map(genre => genre.trim());
      setBookData({
        ...bookData,
        [name]: genresArray,
      });
    } else {
      setBookData({
        ...bookData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(bookData);

    try {
      const response = await axios.post('https://mern1-webapp.onrender.com/addbook', bookData);

      if (response.status === 200) {
        console.log('Book added successfully!');
        // Reset the form after successful submission (optional)
        setBookData({
          book_name: '',
          author: '',
          genre: [],
          rating: 1,
        });
      }
      window.location.reload();

    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <div className='container'>
        <div className="main_container">
          <h1>Add a New Book</h1>
          <form className="form1" onSubmit={handleSubmit}>
            <label htmlFor="book_name">Title:</label><br />
            <input
              type="text"
              id="book_name"
              name="book_name"
              value={bookData.book_name}
              onChange={handleChange}
            /><br />
            <label htmlFor="author">Author:</label><br />
            <input
              type="text"
              id="author"
              name="author"
              value={bookData.author}
              onChange={handleChange}
            /><br />
            <label htmlFor="genre">Genres (Comma-separated):</label><br />
            <input
              type="text"
              id="genre"
              name="genre"
              value={bookData.genre.join(', ')} // Join array into comma-separated string for display
              onChange={handleChange}
            /><br />
            <label htmlFor="rating">Rating:</label><br />
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="10"
              value={bookData.rating}
              onChange={handleChange}
            /><br /><br />
            <input type="submit" value="Add Book" />
          </form>
        </div>

        <img className='bk' src="book.jpg" alt="book"></img>

      </div>
    </div>

  );
}


const View = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://mern1-webapp.onrender.com/display`, {
        method: 'GET',
      });

      if (response.ok) {
        const responseData = await response.json();
        setUserData(responseData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {userData.map((book) => (
            <div key={book._id}>
              <h2>{book.book_name}</h2>
              <p>Author: {book.author}</p>
              <p>Genres: {book.genre.join(', ')}</p>
              <p>Rating: {book.rating}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};






function App() {
  return (
    <div className='go'>
      <div className='heading'><h1>My Book Collection</h1></div>
      <AddBookForm />
      <View/>
    </div>
  );
}
export default App;

