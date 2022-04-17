import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import SubTestsTable from "../../components/SubTestsTable/SubTestsTable";
import { nanoid } from "nanoid";
import { FcCheckmark } from "react-icons/fc";

import {
  Button,
  Heading,
  Input,
  Table,
  Td,
  Textarea,
  Tr,
  useToast,
} from "@chakra-ui/react";
import {
  Bottom,
  Container,
  InputContainer,
  Left,
  MainForm,
  Right,
  Top,
} from "../NewTest/NewTestStyle";
import FloatButton from "../../components/FloatButton/FloatButton";

const TestDit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [row, setRow] = useState({
    name: "",
    results: "",
    maleNormal: "",
    femaleNormal: "",
    unit: "",
    result: "",
    price: 0,
  });
  const [subTests, setSubTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const getTest = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://reham-api-v1.herokuapp.com/api/v1/tests/${id}`
      );
      const data = await res.json();
      setName(data.testName);
      // FIXME: remove the normal from here and from the server
      setComments(data.comments);
      setSubTests(data.subTest);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const push = async () => {
    await axios.put(`https://reham-api-v1.herokuapp.com/api/v1/tests/${id}`, {
      testName: name,
      // FIXME: remove the normal from here and from the server
      normal: {},
      // FIXME: remove the price and set the the price as default 0 in the server
      price: 0,
      comments,
      subTest: subTests,
    });
    history.push("/tests");
  };
  const updateTest = (e) => {
    e.preventDefault();
    try {
      if (subTests.length !== 0) {
        push();
      } else {
        toast({
          // position: "top-left",
          title: "There is no test added.",
          description: "Please add some tests ",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }

      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const addRow = (e) => {
    e.preventDefault();
    const newRow = {
      id: nanoid(),
      name: row.name,
      results: row.results,
      maleNormal: row.maleNormal,
      femaleNormal: row.femaleNormal,
      result: "",
      unit: row.unit,
      price: row.price,
    };
    setSubTests([...subTests, newRow]);
  };
  const deleteRow = (event, id) => {
    event.preventDefault();
    const newSubTests = subTests.filter((i) => i.id !== id);
    setSubTests(newSubTests);
  };
  useEffect(() => {
    getTest();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Top>
            <Heading>Test Details</Heading>
            <MainForm form onSubmit={updateTest}>
              <Left>
                <div>
                  <InputContainer>
                    <label htmlFor="name">Test Name</label>
                    <Input
                      required
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="Male Normal">Male Normal</label>
                  </InputContainer>
                </div>
              </Left>
              <Right>
                <>
                  <img src="../../img/full-screen.png" alt="" />
                  <label htmlFor="Comments">Comments</label>
                  <Textarea
                    name="Comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </>
              </Right>
              <FloatButton
                type="submit"
                icon={<FcCheckmark />}
                content={"Done"}
                left={"5%"}
              />
            </MainForm>
          </Top>
          <Bottom>
            <SubTestsTable
              subTests={subTests}
              setSubTests={setSubTests}
              deleteRow={deleteRow}
            />
            <form onSubmit={(e) => addRow(e)}>
              <Table variant="simple">
                <Tr>
                  <Td>
                    <Input
                      required
                      placeholder="Enter Test Name"
                      type="text"
                      onChange={(e) => setRow({ ...row, name: e.target.value })}
                    />
                  </Td>
                  <Td>
                    <Input
                      required
                      placeholder="Enter Test Results"
                      type="text"
                      onChange={(e) =>
                        setRow({ ...row, results: e.target.value })
                      }
                    />
                  </Td>
                  <Td>
                    <Input
                      required
                      placeholder="Enter Male normal"
                      type="text"
                      onChange={(e) =>
                        setRow({ ...row, maleNormal: e.target.value })
                      }
                    />
                  </Td>
                  <Td>
                    <Input
                      required
                      placeholder="Enter Female normal"
                      type="text"
                      onChange={(e) =>
                        setRow({ ...row, femaleNormal: e.target.value })
                      }
                    />
                  </Td>
                  <Td>
                    <Input
                      required
                      placeholder="Enter Unit"
                      type="text"
                      onChange={(e) => setRow({ ...row, unit: e.target.value })}
                    />
                  </Td>
                  <Td>
                    <Input
                      required
                      placeholder="Enter Price"
                      type="number"
                      onChange={(e) =>
                        setRow({ ...row, price: +e.target.value })
                      }
                    />
                  </Td>
                  <Td>
                    <Button type="submit">add</Button>
                  </Td>
                </Tr>
              </Table>
            </form>
          </Bottom>
        </Container>
      )}
    </>
  );
};

export default TestDit;
