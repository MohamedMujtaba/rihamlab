import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import axios from "axios";
import { FcCheckmark, FcSearch } from "react-icons/fc";
import "./NewBill.css";
import { Cart, CloseBtn, Left, List, Right } from "./NewBillStyle";
import { CgCloseO } from "react-icons/cg";
import FloatButton from "../../components/FloatButton/FloatButton";
import Loading from "../../components/Loading/Loading";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useToast,
  Button,
  HStack,
  Spacer,
  Checkbox,
  Badge,
  Stack,
  Input,
} from "@chakra-ui/react";
import BigTest from "./AddBillComponents/BigTest";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../features/cartSlice";

const NewBill = () => {
  const { cartItems, amount } = useSelector((store) => store.cart);

  const { userid } = useParams();
  const history = useHistory();
  const [searchWord, setSearchWord] = useState("");
  const [user, setUser] = useState({});
  const [tests, setTests] = useState([]);
  const [insurance, setInsurance] = useState();
  const [insuranceNumber, setInsuranceNumber] = useState();
  const [theData, setTheData] = useState([]);
  const [have, setHave] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  useEffect(() => {
    if (searchWord === "") {
      setTests(theData);
    }
  }, [searchWord]);

  const getTests = async () => {
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
  const getUser = async () => {
    try {
      const res = await fetch(
        `https://reham-api-v1.herokuapp.com/api/v1/users/${userid}`
      );
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  const add = (test) => {
    dispatch(ADD_TO_CART({ ...test, wanted: [] }));
  };

  const handelDelete = (test) => {
    dispatch(REMOVE_FROM_CART(test));
  };
  useEffect(() => {
    getTests();
    getUser();
  }, []);
  const dispatch = useDispatch();
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (amount > 0) {
      try {
        await axios.post("https://reham-api-v1.herokuapp.com/api/v1/bills", {
          user: user,
          tests: cartItems,
          insurance,
          insuranceNumber,
          total: amount,
        });
        toast({
          // position: "top-left",
          title: "Bill created.",
          description: "Bill have been created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        history.push(`/userdit/${userid}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      toast({
        // position: "top-left",
        title: "Bill not created.",
        description: "There is no tests selected!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="new-bill">
          <Left>
            <FloatButton
              icon={<FcCheckmark />}
              onClick={handelSubmit}
              left={"10%"}
              content={"Done"}
            />

            <Cart>
              {/* FIXME: */}
              {cartItems.map((i) => {
                return (
                  <BigTest key={i._id} i={i} handelDelete={handelDelete} />
                );
              })}
              {amount > 0 && (
                <div className="line">
                  <p>
                    <b>Total</b>
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <p>
                      <b>{amount}</b>
                    </p>
                    <p>
                      <small>SDG</small>
                    </p>
                  </div>
                </div>
              )}
            </Cart>
            <input
              style={{ display: "inline-block", padding: ".1rem" }}
              type="checkbox"
              name="have"
              // value="have"
              onClick={() => setHave(!have)}
            />
            <label htmlFor="have">Have insurance</label>
            {have === true && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="input-area">
                  <label htmlFor="insName">Insurance Company Name</label>
                  <input
                    required
                    type="text"
                    name="number"
                    onChange={(e) => setInsurance(e.target.value)}
                  />
                </div>
                <div className="input-area">
                  <label htmlFor="insName">Insurance Number</label>
                  <input
                    required
                    type="text"
                    name="number"
                    onChange={(e) => setInsuranceNumber(e.target.value)}
                  />
                </div>
              </div>
            )}
          </Left>

          <Right>
            <div className="top" style={{ justifyContent: "flex-end" }}>
              <div className="input-handler">
                <input
                  className="input"
                  type="text"
                  onChange={(e) => setSearchWord(e.target.value)}
                />
                <FcSearch className="icon" />
              </div>
            </div>
            <List>
              {tests
                .filter((t) =>
                  t.testName.toLowerCase().includes(searchWord.toLowerCase())
                )
                .map((test) => {
                  return <Test add={add} key={test._id} test={test} />;
                })}
            </List>
          </Right>
        </div>
      )}
    </>
  );
};

const Test = ({ test, add }) => {
  return (
    <div
      className="test"
      onClick={() => add(test)}
      style={{ cursor: "pointer" }}
    >
      <h4>{test.testName}</h4>
      <p className="price">{test.price}</p>
    </div>
  );
};

export default NewBill;
