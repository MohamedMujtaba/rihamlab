import { useState } from "react";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
import { MdOutlineClose } from "react-icons/md";

const Table = styled.table`
  width: 80%;
  background-color: #f4f4f4;
  border-radius: 8px;
  font-size: 0.9rem;
`;
const TD = styled.td`
  border: 1px solid #f4f4f4;
  height: 30px;
  border: solid 1px #fff;
  padding: 10px;
  text-align: center;
`;
const TR = styled.tr`
  padding: 10px;
`;
const TH = styled.th`
  border: solid 1px #fff;
  padding: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 80%;
  border: none;
  outline: none;
`;
const Select = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  text-align: center;
`;
const Btn = styled.button`
  background: none;
  color: ${(props) => props.bg};
  /* width: 2.5rem;
  height: 2.5rem; */
  margin-right: 5px;
  margin-left: 5px;
  /* padding: 5px; */
  border: none;
  outline: none;
  border-radius: calc(2.5rem / 2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
`;
const SubTestsTable = ({ subTests, setSubTests }) => {
  const [editId, setEditId] = useState();
  const [editFormData, setEditFormData] = useState({
    name: "",
    results: "",
    maleNormal: "",
    femaleNormal: "",
    result: "",
  });
  const handleEditClick = (e, i) => {
    e.preventDefault();
    setEditId(i.id);
    const formValues = {
      name: i.name,
      results: i.results,
      maleNormal: i.maleNormal,
      femaleNormal: i.femaleNormal,
      result: i.result,
    };
    setEditFormData(formValues);
  };
  const handleCancelClick = () => {
    setEditId(null);
  };
  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedRow = {
      id: editId,
      name: editFormData.name,
      results: editFormData.results,
      maleNormal: editFormData.maleNormal,
      femaleNormal: editFormData.femaleNormal,
      result: editFormData.result,
    };

    const newSubTests = [...subTests];

    const index = subTests.findIndex((t) => t.id === editId);

    newSubTests[index] = editedRow;

    setSubTests(newSubTests);
    setEditId(null);
  };

  return (
    <form style={{ width: "100%" }}>
      <Table>
        <thead>
          <TR>
            <TH>Test Name</TH>
            <TH>Results</TH>
            <TH>Male</TH>
            <TH>Female</TH>
            <TH>Actions</TH>
          </TR>
        </thead>
        {subTests.map((i) => {
          return (
            <tbody>
              {editId === i.id ? (
                <Edit
                  key={i.id}
                  editFormData={editFormData}
                  setEditFormData={setEditFormData}
                  handleCancelClick={handleCancelClick}
                  handleEditFormSubmit={handleEditFormSubmit}
                />
              ) : (
                <ReadOnly
                  key={i.id + "row"}
                  i={i}
                  setEditId={setEditId}
                  handleEditClick={handleEditClick}
                />
              )}
            </tbody>
          );
        })}
      </Table>
    </form>
  );
};

const ReadOnly = ({ i, handleEditClick }) => {
  return (
    <TR>
      <TD>{i.name}</TD>
      <TD>
        <Select>
          {i.results?.split(",").map((a) => (
            <option value={a}>{a}</option>
          ))}
        </Select>
      </TD>
      <TD>{i.maleNormal}</TD>
      <TD>{i.femaleNormal}</TD>
      <TD>
        <Btn bg={"#0d6efd"} onClick={(e) => handleEditClick(e, i)}>
          <FiEdit2 />
        </Btn>
        <Btn bg={"#dc3545"}>
          <AiOutlineDelete />
        </Btn>
      </TD>
    </TR>
  );
};
const Edit = ({
  editFormData,
  setEditFormData,
  handleEditFormSubmit,
  handleCancelClick,
}) => {
  return (
    <TR>
      <TD>
        <Input
          placeholder="Enter Test name.."
          type="text"
          value={editFormData.name}
          onChange={(e) =>
            setEditFormData({ ...editFormData, name: e.target.value })
          }
        />
      </TD>
      <TD>
        <Input
          placeholder="Enter Test Results.."
          type="text"
          value={editFormData.results}
          onChange={(e) =>
            setEditFormData({ ...editFormData, results: e.target.value })
          }
        />
      </TD>
      <TD>
        <Input
          type="text"
          value={editFormData.maleNormal}
          onChange={(e) =>
            setEditFormData({ ...editFormData, maleNormal: e.target.value })
          }
        />
      </TD>
      <TD>
        <Input
          type="text"
          value={editFormData.femaleNormal}
          onChange={(e) =>
            setEditFormData({ ...editFormData, femaleNormal: e.target.value })
          }
        />
      </TD>
      <TD>
        <Btn bg={"#20c997"} onClick={(e) => handleEditFormSubmit(e)}>
          <FcCheckmark />
        </Btn>
        <Btn type="button" bg={"#dc3545"} onClick={handleCancelClick}>
          <MdOutlineClose />
        </Btn>
      </TD>
    </TR>
  );
};

export default SubTestsTable;
