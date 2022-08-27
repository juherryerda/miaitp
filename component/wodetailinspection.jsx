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
import { filter } from "./controller/wodetail";
import { loadinspectionform } from "./controller/wodetailinspection";

export default function Wodetailinspection({ navigation,route }) {
  const spin = useSelector((state) => state.woreducer.spin);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.woreducer.woinspection);
  const cacheinspection = useSelector((state) => state.woreducer.cacheinspection);
  
  function render({ item }) {
    return (
      <Box rounded="lg" borderColor="coolGray.200" borderWidth="1" shadow="10">
        <Pressable onPress={() => {
          loadinspectionform(navigation,item,cacheinspection,dispatch)
          
          }}>
        <Box backgroundColor="coolGray.200">
          <Text>{item.DESCRIPTION}</Text>
        </Box>
        <Text>{item.FIELDDESC}</Text>
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
      
      <Text bold>Workorder #{route.params} Inspection Details</Text>
      
      {(data.length > 0) && <Text bold>{data[0].ASSETNUM} {data[0].ASSETDESC}</Text>}
      
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
