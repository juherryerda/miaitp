import React, { useState } from "react";
import { Box, HStack, Button, Text, Spacer, Input, VStack,ScrollView } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { loadtask } from "./controller/wodetailtask";
import { loadlabtrans } from "./controller/wodetaillabtrans";
import { getData } from "./conn";

export default function Wodetail({ navigation, route }) {
  
  const data = useSelector((state) => state.woreducer.wodetail);
  const spin = useSelector((state) => state.woreducer.spin);
  const cachelabtrans = useSelector((state) => state.woreducer.cachelabtrans);
  const cachewodetailtask = useSelector((state) => state.woreducer.cachewodetailtask);

  const dispatch = useDispatch();
  return (
    <Box padding={5}>
    <ScrollView>
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
      <HStack>
        <Button>Complete</Button>
        
      </HStack>
      <Text> </Text>
      <VStack>
        <Text>Wonum : </Text>
        <Input value={route.params.WONUM} isDisabled></Input>
        <Text>Description : </Text>
        <Input value={route.params.DESCRIPTION} isDisabled multiline h={20}></Input>
        <Text>Location : </Text>
        <Input value={route.params.LOCATION} isDisabled></Input>
        <Text>Assetnum : </Text>
        <Input value={route.params.ASSETNUM} isDisabled></Input>
        <Input value={route.params.ASSETDESC} isDisabled></Input>
        <Text>PM : </Text>
        <Input value={route.params.PMNUM} isDisabled></Input>
        <Text>Status : </Text>
        <Input value={route.params.STATUS} isDisabled></Input>
        <Text>Targstartdate : </Text>
        <Input value={route.params.TARGSTARTDATE} isDisabled></Input>
        <Text>Lead : </Text>
        <Input value={route.params.LEAD} isDisabled></Input>
        <Input value={route.params.LEADDESC} isDisabled></Input>
        <Text> </Text>
        <Button onPress={() => {loadtask(navigation,spin,dispatch,route.params.WONUM,getData,cachewodetailtask)}}>Workorder Task</Button>
        <Text> </Text>
        <Button onPress={() => {loadlabtrans(navigation,route.params.WONUM,dispatch,spin,getData,cachelabtrans)}}>Actual Labor</Button>
        <Text> </Text>
        <Button>Planning Material</Button>
      </VStack>
      </ScrollView>
    </Box>
  );
}
