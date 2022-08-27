import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getData } from "./conn";
import { Spin } from "./spinner";

import {
  Text,
  Button,
  VStack,
  Pressable,
  Spacer,
  Input,
  FlatList,
  Box,
  HStack,
} from "native-base";

export default function Inventory({ navigation, route }) {
  //route.params.name
  //const [data, setData] = useState([]);
  const data = useSelector((state) => state.woreducer.inventory);
  //setData(route.params.INVENTORY);
  const spin = useSelector((state) => state.woreducer.spin);
  function render({ item }) {
    return (
      <Box rounded="lg" borderColor="coolGray.200" borderWidth="1" shadow="2">
        <Pressable onPress={() => {}}>
          <VStack>
            <Box backgroundColor="coolGray.200">
              <Text>
                {item.ITEMNUM} {item.DESCRIPTION}
              </Text>
            </Box>

            <HStack>
              <Text>Location : </Text>
              <Text>{item.LOCATION}</Text>
            </HStack>
            <HStack>
              <Text>Quantity : </Text>
              <Text>{item.QUANTITY}</Text>
            </HStack>
            <HStack>
              <Text>On the way : </Text>
              <Text>{item.ONTHEWAY}</Text>
            </HStack>
            <HStack>
              <Text>Unit Cost : </Text>
              <Text>{item.UNITCOST}</Text>
            </HStack>
          </VStack>
        </Pressable>
      </Box>
    );
  }
  return (
    <Box padding={5}>
      <HStack>
        {spin && <Spin />}
        <Spacer />
        <Button
          onPress={() => {
            navigation.goBack();
          }}
        >
          Back
        </Button>
      </HStack>
      <Text> </Text>
      <Text bold>Inventory Information</Text>
      <Text> </Text>

      <FlatList
        data={data}
        renderItem={render}
        keyExtractor={(item, index) => String(index)}
      />
    </Box>
  );
}
