import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./TestRes.css";
import { AiOutlinePrinter } from "react-icons/ai";
import FloatButton from "../../components/FloatButton/FloatButton";
import DisplayText from "./DisplayText";
import {
  Top,
  Dit,
  Table,
  TableRow
} from './TestResStyle';
import { FcEditImage } from "react-icons/fc";
const TestRes = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [tests, setTests] = useState([]);
  const [resID, setResID] = useState("");

  const getRes = async () => {
    try {
      const res = await fetch(`https://reham-api-v1.herokuapp.com/api/v1/results/${id}`);
      const data = await res.json();
      setUser(data.user);
      setTests(data.tests);
      setResID(data._id);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRes();
  }, []);
  return (
    <div className="test-res" id="ts">
      <FloatButton
        onClick={() => window.print()}
        att={'button'}
        icon={<AiOutlinePrinter />}
        content={'Print'}
      />
      <FloatButton
        icon={<FcEditImage />}
        att={"Link"}
        to={`/updateres/${resID}`}
        left={'10%'}
        content={'Edit'}
      />
      <Top>
        <div>
          <h4> معمل رهام الطبي</h4>
          <h4> عطبره شارع الدكاتره</h4>
          <h4> 0912345678</h4>
        </div>
        <div>
          <h1
            style={{
              marginRight: '2rem'
            }}>Logo</h1>
        </div>
      </Top>
      <Dit>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Number:</b> 0{user.phone}</p>
        <p><b>Gender:</b> {user.gender}</p>
        <p><b>age</b>: {user.age}</p>
      </Dit>
      <Table>
        <TableRow >
          <p style={{ textAlign: "start", width: "50%" }}><b>Test Name</b></p>
          <p><b>Normal</b></p>
          <p><b>Result</b></p>
        </TableRow>
        <>
          {tests.map((test) => {
            return (
              <>
                <TableRow >
                  <p style={{ textAlign: "start", width: "50%" }}>
                    {test.testName}
                  </p>
                  <p>{test.normal}</p>
                  <p>{test.result}</p>
                </TableRow>
                {test.comment &&
                  <DisplayText text={test.comment} />
                }
              </>
            );
          })}
        </>
      </Table>
    </div>
  );
};

export default TestRes;
