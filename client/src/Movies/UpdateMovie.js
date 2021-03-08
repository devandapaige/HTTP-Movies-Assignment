import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function UpdateMovies({ movieList, setMovieList }) {
  const [item, setItem] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });
  const { push } = useHistory();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };
  const updateMovie = (e) => {
    e.preventDefault();
    const formatStars = {
      ...item,
      stars: item.stars.split(", "),
    };
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formatStars)
      .then((res) => {
        push(`/movies/${id}`);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="addMovieContainer">
      <form onSubmit={updateMovie}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={item.title}
          onChange={handleChange}
        />
        <label htmlFor="director">Director</label>
        <input
          id="director"
          name="director"
          value={item.director}
          onChange={handleChange}
        />
        <label htmlFor="metascore">Metascore</label>
        <input
          id="metascore"
          name="metascore"
          value={item.metascore}
          onChange={handleChange}
        />
        <label htmlFor="stars">Movie Stars</label>
        <input
          id="stars"
          name="stars"
          value={item.stars}
          onChange={handleChange}
        />
        <button className="addMovieBtn" type="submit">
          Update Movie
        </button>
      </form>
    </div>
  );
}

export default UpdateMovies;
