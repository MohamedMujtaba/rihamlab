import { HStack, VStack } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  width: 100%;
  margin-bottom: 1rem;
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

const ResTable = ({ tests, gender }) => {
  return (
    <Table>
      <thead>
        <TH>Test Name </TH>
        <TH>Test Result</TH>
        <TH>Test Normal</TH>
        <TH>Test Unit</TH>
      </thead>
      <tbody>
        {tests.map((i) => (
          <TR key={i.id}>
            <TD>{i.name}</TD>
            <TD>{i.result}</TD>
            <TD>{gender === "Male" ? i.maleNormal : i.femaleNormal}</TD>
            <TD>{i.unit}</TD>
          </TR>
        ))}
      </tbody>
    </Table>
    // <>
    //   {tests.map((i) => (
    //     <HStack
    //       justifyContent="space-between"
    //       width="100%"
    //       h="100%"
    //       paddingX="1rem"
    //     >
    //       <VStack w="20%" alignItems="flex-start">
    //         <>{i.name}</>
    //       </VStack>
    //       <VStack w="20%">
    //         <>{i.result}</>
    //       </VStack>
    //       <VStack w="20%" alignItems="flex-start">
    //         <>{gender === "Male" ? i.maleNormal : i.femaleNormal}</>
    //       </VStack>
    //       <VStack w="20%">
    //         <>{i.unit}</>
    //       </VStack>
    //     </HStack>
    //   ))}
    // </>
  );
};

export default ResTable;
