import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Loading from "../../components/Loading/Loading";

const TestDit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [normal, setNormal] = useState("");
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(true);

  const getTest = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://reham-api-v1.herokuapp.com/api/v1/tests/${id}`
      );
      const data = await res.json();
      setName(data.testName);
      setNormal(data.normal);
      setPrice(data.price);
      setComments(data.comments);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const updateTest = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reham-api-v1.herokuapp.com/api/v1/tests/${id}`, {
        testName: name,
        normal,
        price,
        comments,
      });
      // window.location.reload();
      history.push("/tests");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTest();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="new-test">
          <h1>Edit Test</h1>
          <form onSubmit={updateTest}>
            <div className="input-area">
              <label htmlFor="name">Test Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
              />
            </div>
            <div className="input-area">
              <label htmlFor="normal">Normal</label>
              <input
                required
                value={normal}
                onChange={(e) => setNormal(e.target.value)}
                type="text"
                name="normal"
              />
            </div>
            <div className="input-area">
              <label htmlFor="price">Price</label>
              <input
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                name="price"
                type="number"
              />
            </div>
            <div className="input-area">
              <label htmlFor="comments">Comments</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                name="comments"
              />
            </div>
            <div className="input-area">
              <button className="btn" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default TestDit;
