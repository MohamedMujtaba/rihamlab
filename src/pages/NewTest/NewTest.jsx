import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "./NewTest.css";
import { nanoid } from "nanoid";
import SubTestsTable from "../../components/SubTestsTable/SubTestsTable";
import { FcCheckmark } from "react-icons/fc";
import {
  Container,
  InputContainer,
  Input,
  Left,
  Textarea,
  Right,
  Top,
  Bottom,
  MainForm,
} from "./NewTestStyle";
import FloatButton from "../../components/FloatButton/FloatButton";
import { Button, Heading, Table, Td, Tr, useToast } from "@chakra-ui/react";
const NewTest = () => {
  const [testName, setTestName] = useState("");
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
  const history = useHistory();
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (subTests.length !== 0) {
        await axios.post("https://reham-api-v1.herokuapp.com/api/v1/tests", {
          testName,
          // FIXME: remove the normal from here and from the server
          normal: {},
          // FIXME: remove the price and set the the price as default 0 in the server
          price: 0,
          comments,
          subTest: subTests,
        });
        toast({
          // position: "top-left",
          title: "Test has been created .",
          description: "Test has been created . ",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        history.push("/tests");
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
    } catch (err) {
      console.log(err);
    }
  };
  const addRow = (event) => {
    event.preventDefault();
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
  return (
    <Container>
      <Top>
        <Heading>Add New Test</Heading>
        <MainForm onSubmit={handleSubmit}>
          <Left>
            <div>
              <InputContainer>
                <label htmlFor="name">Test Name</label>
                <Input
                  required
                  type="text"
                  name="name"
                  onChange={(e) => setTestName(e.target.value)}
                />
              </InputContainer>
            </div>
            <div></div>
          </Left>
          <Right>
            <>
              <img src="../../img/full-screen.png" alt="" />
              <label htmlFor="Comments">Comments</label>
              <Textarea
                name="Comments"
                onChange={(e) => setComments(e.target.value)}
              />
            </>
          </Right>

          <FloatButton icon={<FcCheckmark />} content={"Done"} type="submit" />
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
                  onChange={(e) => setRow({ ...row, results: e.target.value })}
                />
              </Td>
              <Td>
                <Input
                  required
                  placeholder="Enter Male Normal"
                  type="text"
                  onChange={(e) =>
                    setRow({ ...row, maleNormal: e.target.value })
                  }
                />
              </Td>
              <Td>
                <Input
                  required
                  placeholder="Enter Female Normal"
                  type="text"
                  onChange={(e) =>
                    setRow({ ...row, femaleNormal: e.target.value })
                  }
                />
              </Td>
              <Td>
                <Input
                  required
                  placeholder="Enter The Unit"
                  type="text"
                  onChange={(e) => setRow({ ...row, unit: e.target.value })}
                />
              </Td>
              <Td>
                <Input
                  required
                  placeholder="Enter Price"
                  type="number"
                  onChange={(e) => setRow({ ...row, price: +e.target.value })}
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
  );
};

export default NewTest;
