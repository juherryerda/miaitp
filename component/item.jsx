import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getData } from "./conn";
import { Spin } from "./spinner";

import { loaditem, loadinventory } from "./controller/item";

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

export default function Item({ navigation, route }) {
  const [input, setInput] = useState("");
  function render({ item }) {
    return (
      <Box rounded="lg" borderColor="coolGray.200" borderWidth="1" shadow="2">
        <Pressable
          onPress={async () => {
            loadinventory(navigation, dispatch, getData, item, setInput,spin);
          }}
        >
          <VStack>
            <Box backgroundColor="coolGray.200">
              <Text>{item.ITEMNUM}</Text>
            </Box>

            <Spacer />
            <Text>{item.DESCRIPTION}</Text>
          </VStack>
        </Pressable>
      </Box>
    );
  }

  const dispatch = useDispatch();
  const data = useSelector((state) => state.woreducer.item);
  const spin = useSelector((state) => state.woreducer.spin);

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
      <Text bold>Material List</Text>
      <Text> </Text>

      <Input
        placeholder="Material code or description .."
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
      />
      <Text> </Text>
      <Button
        isDisabled={spin}
        onPress={() => {
          loaditem(input, dispatch, getData,spin);
        }}
      >
        Search
      </Button>
      <Text> </Text>
      <FlatList
        data={data}
        renderItem={render}
        ItemSeparatorComponent={() => {
          return <Text> </Text>;
        }}
        keyExtractor={(item, index) => String(index)}
      />
    </Box>
  );
}
