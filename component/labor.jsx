import React, { useState } from "react";
import {
  Box,
  HStack,
  Spacer,
  Button,
  Text,
  Input,
  FlatList,
  Pressable,
} from "native-base";
import { Spin } from "./spinner";
import { getData } from "./conn";
import { useSelector, useDispatch } from "react-redux";
import { loadlabor } from "./controller/labor";

export function Labor({ navigation }) {
  const spin = useSelector((state) => state.woreducer.spin);
  const data = useSelector((state) => state.woreducer.labor);
  const [se, setSe] = useState("");
  const dispatch = useDispatch();

  function render({ item }) {
    return (
      <Box rounded="lg" borderColor="coolGray.200" borderWidth="1" shadow="10">
        <Pressable onPress={() => {
            dispatch({
                type: "edit",
                payload: item,
                table: "laborchoosen",
              });
              navigation.goBack()
        }}>
        <Box backgroundColor="coolGray.200">
          <Text>{item.PERSONID}</Text>
        </Box>
        <Text>{item.DISPLAYNAME}</Text>
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
      <Input
        placeholder="Search nik or name ..."
        value={se}
        onChangeText={(e) => {
          setSe(e);
        }}
      ></Input>
      <Text> </Text>
      <Button
        onPress={() => {
          loadlabor(getData, dispatch, spin, se);
        }}
      >
        Search Labor
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
