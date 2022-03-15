import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import SubTestsTable from "../../components/SubTestsTable/SubTestsTable";
import { nanoid } from "nanoid";

const TestDit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [normal, setNormal] = useState({});
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");
  const [row, setRow] = useState({
    name: "",
    results: "",
    normal: "",
    result: "",
  });
  const [subTests, setSubTests] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(subTests);
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
      setSubTests(data.subTest);
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
        subTest: subTests,
      });
      // window.location.reload();
      history.push("/tests");
    } catch (err) {
      console.log(err);
    }
  };
  const addRow = (e) => {
    e.preventDefault();
    const newRow = {
      id: nanoid(),
      name: row.name,
      results: row.results,
      normal: row.normal,
      result: "",
    };
    setSubTests([...subTests, newRow]);
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
          <form onSubmit={updateTest}>
            <h1>Edit Test</h1>
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
              <label htmlFor="normal">Male Normal</label>
              <input
                value={normal.male}
                required
                type="text"
                name="normal"
                onChange={(e) => setNormal({ ...normal, male: e.target.value })}
              />
            </div>
            <div className="input-area">
              <label htmlFor="normal">Female Normal</label>
              <input
                value={normal.female}
                required
                type="text"
                name="normal"
                onChange={(e) =>
                  setNormal({ ...normal, female: e.target.value })
                }
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
          <SubTestsTable subTests={subTests} setSubTests={setSubTests} />
          <form>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => setRow({ ...row, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) =>
                        setRow({ ...row, results: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) =>
                        setRow({ ...row, normal: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button type="button" onClick={addRow}>
                      add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      )}
    </>
  );
};

export default TestDit;
