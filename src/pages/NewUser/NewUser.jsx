import { useState } from "react";
import axios from "axios";
import "./NewUser.css";
import { useHistory } from "react-router";
const NewUser = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Male");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://reham-api-v1.herokuapp.com/api/v1/users", {
        name,
        address,
        age,
        gender,
        phone: number
      });
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new-user">
      <h1>Add Patient Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-area">
          <label htmlFor="name">Patient Name</label>
          <input required
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-area">
          <label htmlFor="address">Patient Address</label>
          <input required
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="input-area">
          <label htmlFor="number">Patient Phone Number</label>
          <input required
            type="number"
            name="number"
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="input-area">
          <label htmlFor="age">Patient Age</label>
          <input required
            type="number"
            name="age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="input-area">
          <label htmlFor="gender">Patient Gander</label>
          <select required name="gender" onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className="input-area">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
