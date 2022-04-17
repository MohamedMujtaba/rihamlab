import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { CloseBtn } from "../NewBillStyle";
import { CgCloseO } from "react-icons/cg";
import SmallTest from "./SmallTest";

const BigTest = ({ i, handelDelete }) => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <HStack>
          <p>{i.testName}</p>
          <Spacer />
          <Badge variant="subtle" colorScheme="green" px="2">
            {i.price}
          </Badge>
          <CloseBtn
            onClick={() => {
              handelDelete(i);
            }}
          >
            <CgCloseO />
          </CloseBtn>
        </HStack>
        {i.subTest.length !== 0 ? (
          <>
            <AccordionButton
              alignItems="center"
              justifyContent="center"
              display="flex"
              outline="none"
            >
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              {i.subTest.map((a) => (
                <SmallTest key={a.id} pId={i._id} a={a} />
              ))}
            </AccordionPanel>
          </>
        ) : (
          <Box h="35px"></Box>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default BigTest;
