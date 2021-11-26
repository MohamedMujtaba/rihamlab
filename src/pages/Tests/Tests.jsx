import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
import { FcSearch } from "react-icons/fc";
import "./Tests.css";
import { addComma } from "../../utils/addComma";
import Loading from "../../components/Loading/Loading";
const Tests = () => {
  const [tests, setTests] = useState([]);
  const [theData, setTheData] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = (searchWord) => {
    if (searchWord === "") {
      setTests(theData);
    } else {
      let newF = tests.filter((i) => {
        return i.testName.toLowerCase().includes(searchWord);
      });
      setTests(newF);
    }
  };

  const getTest = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://reham-api-v1.herokuapp.com/api/v1/tests"
      );
      const data = await res.json();
      setTests(
        data.sort(function (a, b) {
          if (a.testName < b.testName) {
            return -1;
          }
          if (a.testName > b.testName) {
            return 1;
          }
          return 0;
        })
      );
      setTheData(
        data.sort(function (a, b) {
          if (a.testName < b.testName) {
            return -1;
          }
          if (a.testName > b.testName) {
            return 1;
          }
          return 0;
        })
      );
      setLoading(false);
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
        <div className="tests">
          <div className="top">
            <Link to="/newtest" className="add">
              <MdOutlineAdd />
              Add Test
            </Link>
            <div className="input-handler">
              <input
                type="text"
                onChange={(e) => search(e.target.value.toLowerCase())}
              />
              <FcSearch className="icon" />
            </div>
          </div>
          <div className="tests-lest">
            {tests.map((test) => {
              return <Test key={test._id} test={test} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};
const Test = ({ test }) => {
  return (
    <Link to={`/test/${test._id}`} className="test">
      <h4>{test.testName}</h4>
      <p className="price">{addComma(test.price)}</p>
    </Link>
  );
};

export default Tests;
