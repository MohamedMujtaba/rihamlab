import React from "react";
import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  font-size: 14px;
`;
const TD = styled.td`
  border: 1px solid #f4f4f4;
  padding: 5px 10px;
`;
const TR = styled.tr``;
const TH = styled.th`
  border: 1px solid #f4f4f4;
  padding: 5px 10px;
`;

const ResTable = ({ tests }) => {
  return (
    <Table>
      <thead>
        <TH>Test Name </TH>
        <TH>Test Result</TH>
        <TH>Test Normal</TH>
      </thead>
      <tbody>
        {tests.map((i) => (
          <TR>
            <TD>{i.name}</TD>
            <TD>{i.result}</TD>
            <TD>{i.normal}</TD>
          </TR>
        ))}
      </tbody>
    </Table>
  );
};

export default ResTable;
