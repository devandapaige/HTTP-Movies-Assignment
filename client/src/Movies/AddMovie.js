import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function AddMovie() {
  const [item, setItem] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });
  const { push } = useHistory();
  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };
  const addFilm = (e) => {
    e.preventDefault();
    const formatStars = {
      ...item,
      id: Date.now(),
      stars: item.stars.split(", "),
    };
    axios
      .post("http://localhost:5000/api/movies", formatStars)
      .then((res) => {
        console.log(res);
        push("/");
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <div className="addMovieContainer">
      <form onSubmit={addFilm}>
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
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
