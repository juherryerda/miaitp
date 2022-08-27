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
import { filter, loadmore } from "./controller/wolist";
import { Spin } from "./spinner";
import { loadwodetail } from "./controller/wodetail";
import { getData } from "./conn";

export default function Wolist({ navigation, route }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.woreducer.wolist);
  const datasearch = useSelector((state) => state.woreducer.wolistsearch);
  const spin = useSelector((state) => state.woreducer.spin);
  const wolistsearchcount = useSelector((state) => state.woreducer.wolistsearchcount);
  const wolistfilter = useSelector((state) => state.woreducer.wolistfilter);
  const wolistisfiltered = useSelector((state) => state.woreducer.wolistisfiltered);


  function render({ item,index }) {
    
    return (
      
      
      <Box rounded="lg" borderColor="coolGray.200" borderWidth="1" shadow= "10">
        <Pressable
          onPress={() => {
            loadwodetail(navigation, dispatch, item, getData,spin);
          }}
        >
          <Box backgroundColor="coolGray.200">
            <Text>{item.LOCATION}  {item.ASSETNUM} {item.ASSETDESC}</Text>
          </Box>
          <Text>
            {item.WONUM} {item.DESCRIPTION}
          </Text>
          
          <HStack>
            
            <Text>Status : {item.STATUS} </Text>
            <Spacer></Spacer>
            <Text>
              Date :{" "}
              {item.TARGSTARTDATE ? item.TARGSTARTDATE.split(" ")[0] : ""}{" "}
            </Text>
            
          </HStack>
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
        placeholder="search ..."
        onChangeText={(e) => {
          filter(e, dispatch, data,wolistsearchcount);
        }}
      ></Input>
      <Text> </Text>
<Text>Total Count : {(!wolistisfiltered) ? data.length : wolistfilter.length}</Text>
      <FlatList
        data={datasearch}
        renderItem={render} ItemSeparatorComponent={() => {return (<Text> </Text>)}}
        keyExtractor={(item, index) => String(index)}
        
      />
      <Text> </Text>
      {((!wolistisfiltered && wolistsearchcount<data.length) || (wolistisfiltered && wolistsearchcount<wolistfilter.length)) && <Button onPress={() => {loadmore(data,wolistsearchcount,dispatch,wolistfilter,wolistisfiltered)}}>Load More</Button>}
    </Box>
  );
}
