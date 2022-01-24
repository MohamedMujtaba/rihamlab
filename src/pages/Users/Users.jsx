import { useState, useEffect } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
import { FcSearch, FcNext } from "react-icons/fc";
import Loading from "../../components/Loading/Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [theData, setTheData] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = (e) => {
    let searchWord = e.target.value.toLowerCase();
    if (searchWord === "") {
      setUsers(theData);
    } else {
      let newF = users.filter((i) => {
        return i.name.toLowerCase().includes(searchWord);
      });
      setUsers(newF);
    }
  };
  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://reham-api-v1.herokuapp.com/api/v1/users"
      );
      const data = await res.json();
      setUsers(data);
      setTheData(data.reverse());
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="users">
          <div className="top">
            <Link to="/newuser" className="add">
              <MdOutlineAdd />
              Add Patient
            </Link>
            <div className="input-handler">
              <input type="text" onChange={search} />
              <FcSearch className="icon" />
            </div>
          </div>
          <div className="user-list">
            {users.map((user) => {
              return <User key={user._id} user={user} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};
function User({ user }) {
  return (
    <Link to={`/userdit/${user._id}`} className="user">
      <p style={{ width: "60%" }}>{user.name}</p>
      <p style={{ width: "20%", textAlign: "center" }}>0{user.phone}</p>
      <p style={{ width: "20%", textAlign: "center" }}>{user.address}</p>
      <p>
        <FcNext />
      </p>
    </Link>
  );
}
export default Users;
