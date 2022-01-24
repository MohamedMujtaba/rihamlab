import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import axios from "axios";
import "./NewResult.css";
import { FcCheckmark } from "react-icons/fc";
import FloatButton from "../../components/FloatButton/FloatButton";
import { Table, TableRow } from "./NewResultStyle";
import Loading from "../../components/Loading/Loading";

const NewResult = () => {
  const { id } = useParams();
  const history = useHistory();
  const [bill, setBill] = useState({});
  const [tests, setTests] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const resetBill = async () => {
    try {
      await axios.put(
        `https://reham-api-v1.herokuapp.com/api/v1/bills/${bill._id}`,
        {
          done: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://reham-api-v1.herokuapp.com/api/v1/results", {
        user,
        tests,
      });
      resetBill();
      history.push("/results/");
    } catch (err) {
      console.log(err);
    }
  };

  const getBill = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://reham-api-v1.herokuapp.com/api/v1/bills/${id}`
      );
      const data = await res.json();
      setBill(data);
      setTests(data.tests);
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBill();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Table>
            <TableRow>
              <p style={{ textAlign: "start", width: "50%" }}>Test Name</p>
              <p>Normal</p>
              <p>Result</p>
            </TableRow>
            <form
              onSubmit={handleSubmit}
              style={{
                width: "100%",
              }}
            >
              {tests.map((test) => {
                return <Line test={test} user={user} />;
              })}
              <FloatButton
                icon={<FcCheckmark />}
                type={"submit"}
                att={"button"}
                content={"Done"}
              />
            </form>
          </Table>
        </div>
      )}
    </>
  );
};

const Line = ({ test, user }) => {
  const [res, setRes] = useState("");
  const [com, setCom] = useState(test.comments);
  useEffect(() => {
    test.result = res;
    test.comment = com;
  }, [res, com, test]);
  return (
    <>
      <TableRow>
        <p style={{ textAlign: "start", width: "50%" }}>{test.testName}</p>
        <p>{user.gender === "Male" ? test.normal.male : test.normal.female}</p>
        <p>
          <input
            required
            className="result-input"
            type="text"
            onChange={(e) => setRes(e.target.value)}
          />
        </p>
      </TableRow>
      <textarea
        value={com}
        style={{
          textAlign: "left",
          width: "100%",
          padding: ".5rem",
          fontSize: "15px",
          border: "none",
          borderBottom: "solid 2px #f3f3f3",
        }}
        placeholder="Enter Comment If any..."
        onChange={(e) => setCom(e.target.value)}
      />
    </>
  );
};

export default NewResult;
