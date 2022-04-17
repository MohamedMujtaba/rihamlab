import { Badge, Checkbox, HStack, Spacer } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SUBTEST } from "../../../features/cartSlice";

const SmallTest = ({ a, pId }) => {
  const dispatch = useDispatch();
  const [stat, setStat] = useState(false);
  const handelChange = () => {
    if (!stat) {
      dispatch(SUBTEST([a, pId, true]));
      setStat(true);
    }
    if (stat) {
      dispatch(SUBTEST([a, pId, false]));
      setStat(false);
    }
  };
  return (
    <HStack w="100%" alignItems="center" justifyContent="center">
      <Checkbox isChecked={stat} onChange={() => handelChange()}>
        {a.name}
      </Checkbox>
      <Spacer />
      <Badge variant="subtle" colorScheme="green" px="2">
        {a.price}
      </Badge>
    </HStack>
  );
};

export default SmallTest;
