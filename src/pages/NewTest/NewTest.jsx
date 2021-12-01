import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "./NewTest.css";
import TextEditor from "../../components/TextEditor/TextEditor";
const NewTest = () => {
  const [testName, setTestName] = useState("");
  const [normal, setNormal] = useState({});
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://reham-api-v1.herokuapp.com/api/v1/tests", {
        testName,
        normal,
        price,
        comments,
      });
      history.push("/tests");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(normal);
  return (
    <div className="new-test">
      <h1>Add New Test</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-area">
          <label htmlFor="name">Test Name</label>
          <input
            required
            type="text"
            name="name"
            onChange={(e) => setTestName(e.target.value)}
          />
        </div>
        <div className="input-area">
          <label htmlFor="normal">Male Normal</label>
          <input
            required
            type="text"
            name="normal"
            onChange={(e) => setNormal({ ...normal, male: e.target.value })}
          />
        </div>
        <div className="input-area">
          <label htmlFor="normal">Female Normal</label>
          <input
            required
            type="text"
            name="normal"
            onChange={(e) => setNormal({ ...normal, female: e.target.value })}
          />
        </div>
        <div className="input-area">
          <label htmlFor="price">Price</label>
          <input
            required
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-area">
          <label htmlFor="Comments">Comments</label>
          <textarea
            name="Comments"
            onChange={(e) => setComments(e.target.value)}
          />
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

export default NewTest;
