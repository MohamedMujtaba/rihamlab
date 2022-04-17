import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import axios from "axios";
import "./NewResult.css";
import { FcCheckmark } from "react-icons/fc";
import FloatButton from "../../components/FloatButton/FloatButton";
import { TN, TableRow } from "./NewResultStyle";
import Loading from "../../components/Loading/Loading";
import {
  HStack,
  Input,
  InputGroup,
  Select,
  TagLabel,
  VStack,
  Table,
  Tr,
  Td,
} from "@chakra-ui/react";

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
  console.log(tests);

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
          <TN>
            <TableRow>
              {/* <p style={{ textAlign: "start", width: "50%" }}>Test Name</p>
              <p>Result</p>
              <p>Normal</p>
              <p>Unit</p> */}
              <HStack justifyContent="space-between" width="100%" h="100%">
                <VStack w="20%" alignItems="flex-start">
                  <p
                    style={{
                      width: "100%",
                      textAlign: "start",
                    }}
                  >
                    Test Name
                  </p>
                </VStack>
                <VStack w="20%">
                  <p>Result</p>
                </VStack>
                <VStack w="20%">
                  <p>Normal</p>
                </VStack>
                <VStack w="20%">
                  <p>Unit</p>
                </VStack>
              </HStack>
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
          </TN>
        </div>
      )}
    </>
  );
};

const Line = ({ test, user }) => {
  // const [res, setRes] = useState("");
  const [com, setCom] = useState(test.comments);
  useEffect(() => {
    // test.result = res;
    test.comment = com;
  }, [com, test]);
  return (
    <>
      <TableRow>
        <p style={{ textAlign: "start", width: "50%" }}>{test.testName}</p>
        {/* <p>{user.gender === "Male" ? test.normal.male : test.normal.female}</p>
        <p>
          <input
            required
            className="result-input"
            type="text"
            onChange={(e) => setRes(e.target.value)}
          />
        </p> */}
      </TableRow>
      {test.wanted.map((i) => (
        <>
          <Sub sTest={i} test={test} user={user} />
        </>
      ))}
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

const Sub = ({ sTest, user }) => {
  const [res, setRes] = useState(sTest.result);
  const [unit, setUnit] = useState(sTest.unit);
  const [normal, setNormal] = useState(
    user.gender === "Male" ? sTest.maleNormal : sTest.femaleNormal
  );
  useEffect(() => {
    sTest.result = res;
    sTest.unit = unit;
    if (user.gender === "Male") {
      sTest.maleNormal = normal;
    } else {
      sTest.femaleNormal = normal;
    }
  }, [res, unit, normal]);
  return (
    <Table marginY="1rem">
      <HStack justifyContent="space-between">
        <VStack w="20%" alignItems="flex-start" paddingLeft="1rem">
          <p>{sTest.name}</p>
        </VStack>
        <VStack w="20%">
          {sTest.results === "" ? (
            <Input type="text" onChange={(e) => setRes(e.target.value)} />
          ) : (
            <Select defaultValue={""} onChange={(e) => setRes(e.target.value)}>
              {sTest.results?.split(",").map((i) => (
                <option value={i}>{i}</option>
              ))}
            </Select>
          )}
        </VStack>
        <VStack w="20%">
          <Input
            defaultValue={normal}
            onChange={(e) => setNormal(e.target.value)}
          />
        </VStack>
        <VStack w="20%">
          <Input
            defaultValue={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </VStack>
      </HStack>
    </Table>
  );
};

export default NewResult;
