import { useState, useEffect } from "react";
import { FcCheckmark, FcNext, FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";
import { addComma } from "../../utils/addComma";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [theData, setTheData] = useState([]);
  const [all, setAll] = useState("notready");
  const getBills = async () => {
    try {
      const res = await fetch(`https://reham-api-v1.herokuapp.com/api/v1/bills/is/${all}`);
      const data = await res.json();
      setBills(data);
      setTheData(data.reverse());
    } catch (err) {
      console.log(err);
    }
  };
  const search = (e) => {
    let searchWord = e.target.value.toLowerCase();
    if (searchWord === "") {
      setBills(theData);
    } else {
      let newF = bills.filter((i) => {
        return i.user.name.toLowerCase().includes(searchWord);
      });
      setBills(newF);
    }
  };
  useEffect(() => {
    getBills();
  }, [all]);
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
        <select style={{
          padding: '1rem',
          backgroun: '#f4f4f4',
          border: 'solid 2px #f4f4f4',
          borderRadius: '5px',
          fontSize: '14px'
        }} onChange={(e) => setAll(e.target.value)}>
          <option value="notready">Not Ready</option>
          <option value="all">ALL</option>
        </select>
        <div className="input-handler">
          <input type="text" onChange={search} />
          <FcSearch className="icon" />
        </div>
      </div>
      <div className="user-list">
        {
          bills.map((bill) => {
            return (
              <Bill key={bill._id} bill={bill} />
            );
          })
        }
      </div>
    </div>
  );
};

function Bill({ bill }) {
  return (
    <Link to={`/billdit/${bill._id}`} className="user">
      <p style={{ width: '60%' }}>{bill.user.name} </p>
      <p style={{ width: '20%', textAlign: "center" }}>0{bill.user.phone}</p>
      <p style={{ width: '20%', textAlign: "center" }}>{addComma(bill.total)}</p>
      {
        !bill.done ?
          <Link
            style={{
              width: '30px',
              height: '30px',
              background: '#fff',
              borderRadius: '50%',
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center'

            }}
            to={`/newres/${bill._id}`}>
            <FcNext />
          </Link>
          :
          <p style={{
            width: '30px',
            height: '30px',
            background: '#fff',
            borderRadius: '50%',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center'

          }}>
            <FcCheckmark />
          </p>
      }
    </Link>
  );
}
export default Bills;
