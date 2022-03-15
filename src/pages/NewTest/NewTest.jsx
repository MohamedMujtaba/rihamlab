import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "./NewTest.css";
import { nanoid } from "nanoid";
import SubTestsTable from "../../components/SubTestsTable/SubTestsTable";
import {
  Container,
  InputContainer,
  Input,
  Left,
  Textarea,
  Right,
} from "./NewTestStyle";
const NewTest = () => {
  const [testName, setTestName] = useState("");
  const [normal, setNormal] = useState({});
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");
  const [row, setRow] = useState({
    name: "",
    results: "",
    maleNormal: "",
    femaleNormal: "",
    result: "",
  });
  const [subTests, setSubTests] = useState([]);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://reham-api-v1.herokuapp.com/api/v1/tests", {
        testName,
        normal,
        price,
        comments,
        subTest: subTests,
      });
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
      maleNormal: row.maleNormal,
      femaleNormal: row.femaleNormal,
      result: "",
    };
    setSubTests([...subTests, newRow]);
  };
  console.log(subTests);
  return (
    <Container>
      <Left>
        <h1>Add New Test</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <InputContainer>
              <label htmlFor="name">Test Name</label>
              <Input
                required
                type="text"
                name="name"
                onChange={(e) => setTestName(e.target.value)}
              />

              <label htmlFor="Male Normal">Male Normal</label>
              <Input
                required
                type="text"
                name="Male Normal"
                onChange={(e) => setNormal({ ...normal, male: e.target.value })}
              />
            </InputContainer>
          </div>
          <div>
            <InputContainer>
              <label htmlFor="Female Normal">Female Normal</label>
              <Input
                required
                type="text"
                name="Female Normal"
                onChange={(e) =>
                  setNormal({ ...normal, female: e.target.value })
                }
              />

              <label htmlFor="price">Price</label>
              <Input
                required
                type="number"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputContainer>
          </div>
          <InputContainer>
            <img src="../../img/full-screen.png" alt="" />
            <label htmlFor="Comments">Comments</label>
            <Textarea
              name="Comments"
              onChange={(e) => setComments(e.target.value)}
            />
          </InputContainer>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </Left>
      <Right>
        <SubTestsTable subTests={subTests} setSubTests={setSubTests} />
        <form>
          <table>
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
                  onChange={(e) => setRow({ ...row, results: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) =>
                    setRow({ ...row, maleNormal: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) =>
                    setRow({ ...row, femaleNormal: e.target.value })
                  }
                />
              </td>
              <td>
                <button type="button" onClick={addRow}>
                  add
                </button>
              </td>
            </tr>
          </table>
        </form>
      </Right>
    </Container>
  );
};

export default NewTest;
