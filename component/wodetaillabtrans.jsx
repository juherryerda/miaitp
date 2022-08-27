import React, { useState } from "react";
import {
  Box,
  FlatList,
  Input,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  Button,
  Pressable,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { filter, init } from "./controller/wolist";
import { Spin } from "./spinner";
import { loadwodetail } from "./controller/wodetail";
import { getData } from "./conn";

export default function Wolabtrans({ navigation, route }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.woreducer.wolabtrans);
  const spin = useSelector((state) => state.woreducer.spin);
  function render({ item }) {
    return (
      <Box rounded="lg" borderColor="coolGray.200" borderWidth="1" shadow="2">
        <Box backgroundColor="coolGray.200">
          <Text>
            {item.LABORCODE} {item.DISPLAYNAME}
          </Text>
        </Box>
        <Text>Startdate : {item.STARTDATE}</Text>
        <Text>Finishdate : {item.FINISHDATE}</Text>
        <Text>Regular Hours : {item.REGULARHRS}</Text>
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
      <Text bold>Workorder #{route.params} Actual Labor </Text>
      <Text> </Text>
      <Button
        onPress={() => {
          dispatch({
            type: "edit",
            payload: null,
            table: "laborchoosen",
          });
          navigation.navigate("Wodetaillabtransform", route.params);
        }}
      >
        Add New Labor
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
