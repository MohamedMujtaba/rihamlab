import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import axios from 'axios';
import './NewResult.css';
import { FcCheckmark } from 'react-icons/fc';
import FloatButton from '../../components/FloatButton/FloatButton';
import { Table, TableRow } from './NewResultStyle';



const NewResult = () => {
  const { id } = useParams();
  const history = useHistory();
  const [bill, setBill] = useState({});
  const [tests, setTests] = useState([]);
  const [user, setUser] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reham-api-v1.herokuapp.com/api/v1/results/${id}`, {
        user,
        tests
      });
      history.push(`/testres/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const getBill = async () => {
    try {
      const res = await fetch(`https://reham-api-v1.herokuapp.com/api/v1/results/${id}`);
      const data = await res.json();
      setTests(data.tests);
      console.log(tests);
      setUser(data.user);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBill();
  }, []);
  return (
    <div >
      <Table>
        <TableRow >
          <p style={{ textAlign: "start", width: "50%" }}>Test Name</p>
          <p>Normal</p>
          <p>Result</p>
        </TableRow>
        <form onSubmit={handleSubmit}
          style={{
            width: "100%"
          }}
        >
          {tests.map((test) => {
            return (
              <Line test={test} />
            );
          })}
          <FloatButton
            icon={<FcCheckmark />}
            type={'submit'}
            att={"button"}
          />


        </form>
      </Table>
    </div>
  );
};



const Line = ({ test }) => {
  const [res, setRes] = useState("");
  const [com, setCom] = useState("");
  useEffect(() => {
    setRes(test.result);
    setCom(test.comment);
  }, []);
  useEffect(() => {
    test.result = res;
    test.comment = com;
  }, [res, com, test]);
  return (
    <>
      <TableRow >
        <p style={{ textAlign: "start", width: "50%" }}>
          {test.testName}
        </p>
        <p>{test.normal}</p>
        <p> <input required value={res} className="result-input" type="text" onChange={(e) => setRes(e.target.value)} /></p>
      </TableRow>
      <textarea value={com} type="text" style={{
        textAlign: 'left',
        width: '100%',
        padding: '.5rem',
        fontSize: '15px',
        border: 'none',
        borderBottom: 'solid 2px #f3f3f3'
      }}
        placeholder="Enter Comment If any..."
        onChange={(e) => setCom(e.target.value)}
      />
    </>
  );
};


export default NewResult;


















