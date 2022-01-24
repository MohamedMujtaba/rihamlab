import { useState, useEffect } from "react";
import { FcNext, FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";

const Results = () => {
  const [theData, setTheData] = useState([]);
  const [results, setResults] = useState([]);
  const search = (e) => {
    let searchWord = e.target.value.toLowerCase();
    if (searchWord === "") {
      setResults(theData);
    } else {
      let newF = results.filter((i) => {
        return i.user.name.toLowerCase().includes(searchWord);
      });
      setResults(newF);
    }
  };

  const getResults = async () => {
    try {
      const res = await fetch(`https://reham-api-v1.herokuapp.com/api/v1/results`);
      const data = await res.json();
      setResults(data);
      setTheData(data.reverse());
    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    getResults();
  }, []);

  const sortRes = (isAll) => {
    if (isAll === "") {
      setResults(theData);
      console.log(results);
    } else {
      let newF = theData.filter((a) => {
        return a.createdAt.split('T')[0] === isAll;
      });
      setResults(newF);
    }
  };

  return (
    <div className="users">
      <div
        className="top"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{
            padding: '.8rem',
            backgroun: '#f4f4f4',
            border: 'solid 2px #f4f4f4',
            borderRadius: '5px',
            fontSize: '14px'
          }} type="date" onChange={(e) => sortRes(e.target.value)} />
        <div className="input-handler">
          <input type="text" onChange={search} />
          <FcSearch className="icon" />
        </div>
      </div>
      <div className="user-list">
        {
          results.map((result) => {
            return (
              <Result key={result._id} result={result} />
            );
          })
        }
      </div>
    </div>
  );
};

function Result({ result }) {

  return (
    <Link style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }} to={`/testres/${result._id}`} className="user">
      <p style={{ width: '30%' }}>{result.user.name}</p>
      <div style={{
        maxHeight: '60%',
        width: '40%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {result.tests.map((i) => {
          return (
            <p key={i._id} style={{ width: '100%', maxWidth: '100%' }}>{i.testName}</p>
          );
        })}
      </div>
      {/* <p style={{ width: '10%', textAlign: "center" }}>0{result.user.phone}</p> */}
      <p>
        {result.createdAt.split('T')[0]}
      </p>
      <p>
        <FcNext />
      </p>
    </Link>
  );
}
export default Results;
