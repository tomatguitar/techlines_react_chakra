import React from "react";
import {
  CloseButton,
  Flex,
  Select,
  useColorModeValue as mode,
  Stack,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addCartItem, removeCartItem } from "../redux/actions/cartActions";

const CartItem = ({ cartItem }) => {
  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch();
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <Stack direction="row" width="full" spacing="5">
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium">{name}</Text>
          </Stack>
        </Box>
      </Stack>
      <Flex
        width="full"
        mt={{ base: "4", md: "0" }}
        align={{ base: "center", md: "baseline" }}
        justify="space-between"
        display="flex"
      >
        <Select
          maxW="64px"
          focusBorderColor={mode("orange.500", "orange.200")}
          value={qty}
          onChange={(e) => {
            dispatch(addCartItem(id, e.target.value));
          }}
        >
          {[...Array(stock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </Select>
        <Text fontWeight='bold'>${price}</Text>
        <CloseButton  onClick={() => dispatch(removeCartItem(id))}/>
      </Flex>
    </Flex>
  );
};

export default CartItem;
