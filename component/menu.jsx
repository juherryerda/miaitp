import {
  Box,
  Button,
  VStack,
  HStack,
  Spacer,
  Text,
  Center,
  Icon,
  Image,
} from "native-base";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadwolist } from "./controller/wolist";
import { getData } from "./conn";

export default function Menu({ navigation }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.woreducer.username);
  const wolistcount = useSelector((state) => state.woreducer.wolistcount);
  return (
    <Box padding={5}>
      <HStack>
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
      <Text bold></Text>
      <Text> </Text>
      <Text> </Text>
      <VStack space={2} alignItems="center">
        <Box backgroundColor="white" shadow="2">
          <Image alt="h"  source={require("./wo.png")} size="xl"></Image>
          <Button
            onPress={() => {
              navigation.navigate("Wolist");
              
              loadwolist(username, dispatch, getData,15);
            }}
          >
            Workorder
          </Button>
        </Box>
        <Spacer></Spacer>
        <Box shadow="2">
          <Image alt="h" source={require("./inv.jpg")} size="xl"></Image>
          <Button
            onPress={() => {
              navigation.navigate("Item");
              dispatch({
                type: "edit",
                payload: [],
                table: "item",
              });
            }}
          >
            Inventory
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
