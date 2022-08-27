import React, { useState } from "react";
import {
  Box,
  HStack,
  Button,
  Text,
  Spacer,
  Input,
  VStack,
  FlatList,
  Pressable,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "./spinner";
import { filter } from "./controller/wodetailtask";
import { loadinspectionlist } from "./controller/wodetailinspection";
import { getData } from "./conn";

export default function Wodetailtask({ navigation,route }) {
  const spin = useSelector((state) => state.woreducer.spin);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.woreducer.wotask);
  const datasearch = useSelector((state) => state.woreducer.wotasksearch);
  const cacheinspectionlist = useSelector((state) => state.woreducer.cacheinspectionlist);

  function render({ item }) {
    return (
      <Box rounded="lg" borderColor="coolGray.200" borderWidth="1" shadow="10">
        <Pressable
          onPress={() => {
            loadinspectionlist(navigation, spin, dispatch, item.WONUM, getData,cacheinspectionlist);
          }}
        >
          <Box backgroundColor="coolGray.200">
            <Text>{item.ASSETNUM}</Text>
          </Box>
          <Text>{item.DESCRIPTION}</Text>
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
      <Text bold>Workorder #{route.params} Task</Text>
      <Text> </Text>
      <VStack>
      <Button>Upload All</Button>
      <Text> </Text>
      <Button>Add New Task</Button>
      </VStack>
      <Text> </Text>
      <Text> </Text>
      <Input
        placeholder="Search ..."
        onChangeText={(e) => filter(e, dispatch, data)}
      ></Input>
      <Text> </Text>
      
      <FlatList
        data={datasearch}
        renderItem={render}
        ItemSeparatorComponent={() => {
          return <Text> </Text>;
        }}
        keyExtractor={(item, index) => String(index)}
      />
    </Box>
  );
}
