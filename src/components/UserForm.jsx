import "../Styles/UserForm.css";
import { useState } from "react";

/** 
This is a component for taking in user input
and then passing it to a function that will call the OpenAI
API
**/
function generatePrompt({firstName, funFact, genre}) {
  const prompt = `Generate an interesting, brief (<100 words), and well written ${genre} short story about ${firstName}. An interesting fun fact about ${firstName}: ${funFact}`;
  return prompt;
}

export default function UserForm({ callApi }) {
  const [formData, setFormData] = useState({
    firstName: "",
    funFact: "",
    genre: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);

    const formErrors = {};

    if (!formData.firstName) formErrors.firstName = "First Name is required!";
    if (!formData.funFact) formErrors.funFact = "Fun fact is required!";
    if (!formData.genre) formErrors.genre = "Genre is required!";

    // Check to see if the array of all keys in our formErrors object
    // is greater than 0 (meaning there is at least 1 error)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log("Error");
    } else {
      console.log("Successful Form Submission");
      callApi(generatePrompt(formData));
    }
  }

  return (
    <>
      <form className="user-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}

        <label htmlFor="funFact">Fun Fact:</label>
        <input
          type="text"
          name="funFact"
          id="funFact"
          value={formData.funFact}
          onChange={handleChange}
        />
        {errors.funFact && <div className="error">{errors.funFact}</div>}

        <label htmlFor="genre">Genre:</label>
        <select
          name="genre"
          id="genre"
          value={formData.genre}
          onChange={handleChange}
        >
          <option value={""}>Select a Genre</option>
          <option value={"sci-fi"}>Science Fiction</option>
          <option value={"mystery"}>Mystery</option>
          <option value={"horror"}>Horror</option>
        </select>
        {errors.genre && <div className="error">{errors.genre}</div>}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
