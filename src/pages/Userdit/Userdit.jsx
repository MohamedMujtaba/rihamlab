import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./Userdit.css";
import axios from "axios";
import {
  UserDit,
  Left,
  Right,
  User,
  Form,
  SubmitBtn,
  Sub,
  List,
  Item,
} from "./userStyle";
import FloatButton from "../../components/FloatButton/FloatButton";
import { AiFillFolderAdd } from "react-icons/ai";
import { FcNext } from "react-icons/fc";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
const Userdit = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userBills, setUserBills] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://reham-api-v1.herokuapp.com/api/v1/users/${id}`
      );
      const data = await res.json();
      setUser(data);
      setName(data.name);
      setAddress(data.address);
      setNumber(data.phone);
      setAge(data.age);
      setGender(data.gender);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserBills = async () => {
    try {
      const res = await fetch(
        `https://reham-api-v1.herokuapp.com/api/v1/bills/userbills/${id}`
      );
      const data = await res.json();
      setUserBills(data.reverse());
    } catch (err) {
      console.log(err);
    }
  };
  const getUserResults = async () => {
    try {
      const res = await fetch(
        `https://reham-api-v1.herokuapp.com/api/v1/results/userres/${id}`
      );
      const data = await res.json();
      setUserResults(data.reverse());
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://reham-api-v1.herokuapp.com/api/v1/users/${user._id}`,
        {
          name,
          address,
          phone: number,
          age,
          gender,
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
    getUserBills();
    getUserResults();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <UserDit>
          <Left>
            <FloatButton
              to={`/newbill/${user._id}`}
              icon={<AiFillFolderAdd />}
              att={"Link"}
              content={"New Bill"}
            />
            <User>
              <Form onSubmit={updateUser}>
                <div className="input-area">
                  <label htmlFor="name">Patient Name</label>
                  <input
                    required
                    value={name}
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-area">
                  <label htmlFor="address">Patient Address</label>
                  <input
                    required
                    value={address}
                    type="text"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="input-area">
                  <label htmlFor="number">Patient Phone Number</label>
                  <input
                    required
                    value={number}
                    type="number"
                    name="number"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div className="input-area">
                  <label htmlFor="age">Patient Age</label>
                  <input
                    required
                    value={age}
                    type="number"
                    name="age"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="input-area">
                  <label htmlFor="gender">Patient Gander</label>
                  <select
                    value={gender}
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">female</option>
                  </select>
                </div>
                <div className="input-area">
                  <SubmitBtn type="submit">Update</SubmitBtn>
                </div>
              </Form>
            </User>
          </Left>
          <Right>
            <Sub>
              <h3>Bills</h3>
              <List>
                {userBills.map((i) => {
                  return (
                    <Item key={i._id} to={`/billdit/${i._id}`}>
                      <p>{i.total}</p>
                      <Link
                        style={{
                          width: "30px",
                          height: "30px",
                          background: "#fff",
                          borderRadius: "50%",
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        to={`/newres/${i._id}`}
                      >
                        <FcNext />
                      </Link>
                    </Item>
                  );
                })}
              </List>
            </Sub>
            <Sub>
              <h3>Results</h3>
              <List>
                {userResults.map((i) => {
                  return (
                    <Item key={i._id} to={`/testres/${i._id}`}>
                      <div
                        style={{
                          maxHeight: "100%",
                          width: "70%",
                          overflowY: "auto",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                        }}
                      >
                        {i.tests.map((i) => {
                          return (
                            <p
                              key={i._id}
                              style={{ width: "100%", maxWidth: "100%" }}
                            >
                              {i.testName}
                            </p>
                          );
                        })}
                      </div>
                      <p>{i.createdAt.split("T")[0]}</p>
                    </Item>
                  );
                })}
              </List>
            </Sub>
          </Right>
        </UserDit>
      )}
    </>
  );
};

export default Userdit;
