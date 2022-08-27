import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Button,
  Text,
  Spacer,
  Input,
  VStack,
  FlatList,Center,Alert,CloseIcon,IconButton
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "./spinner";
import { saveinspection, uploadinspection } from "./controller/wodetailinspection";
import { getData } from "./conn";

import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';


export default function Wodetailinspectionform({ navigation, route }) {
  //console.log(route.params)
  const spin = useSelector((state) => state.woreducer.spin);
  //const [measurement, setMeasurement] = useState(0);
  //const [observation, setObservation] = useState("");
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const [alertword,setAlertword] = useState("")

  const cacheinspection = useSelector((state) => state.woreducer.cacheinspection);

  const tempinspection = useSelector((state) => state.woreducer.tempinspection);

  

  
  
  
  return (
    <Box padding={5}>
      <HStack>
        {spin && <Spin />}
        <Spacer />
        <Button
          onPress={() => {
            if (!spin) {
            navigation.goBack();
            }
          }}
        >
          Back
        </Button>
      </HStack>
      <Text> </Text>
      {alert && (
        <Center>
          <Alert w="90%" maxW="400" status="info" colorScheme="info">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    {alertword}
                  </Text>
                </HStack>
                <IconButton
                  onPress={() => {
                    setAlert(false);
                  }}
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                  icon={<CloseIcon size="3" color="coolGray.600" />}
                />
              </HStack>
            </VStack>
          </Alert>
          <Text> </Text>
        </Center>
      )}
      <Text bold>{route.params.DESCRIPTION}</Text>
      <Text>{route.params.FIELDDESC}</Text>
      <Text> </Text>
      <Text>Measurement : </Text>
      <Input keyboardType="numeric" value={tempinspection["NUMRESPONSE"]} onChangeText={(e) => {
        //setMeasurement(e.target.value)

        let copy = {};           
        Object.assign(copy, tempinspection);
        copy["NUMRESPONSE"] = e;        
      
        dispatch({
          type: "edit",
          payload: copy,
          table: "tempinspection",
        });

        }}></Input>
      <Text>Last reading : {route.params.LASTREADING}</Text>
      <Text>Last reading date :{route.params.LASTREADINGDATE}</Text>
      <Text> </Text>
      <Text>Observation : </Text>
      <Input h={20} multiline value={tempinspection["TXTRESPONSE"]} onChangeText={(e) => {
        //setObservation(e.target.value)
        
        let copy = {};           
        Object.assign(copy, tempinspection);
        copy["TXTRESPONSE"] = e;        
      
        dispatch({
          type: "edit",
          payload: copy,
          table: "tempinspection",
        });

        }}></Input>

      <Text> </Text>
      <Button onPress={async () => {}}>Take Photo</Button>
      <Text> </Text>
      <Button onPress={() => {saveinspection(spin,tempinspection["NUMRESPONSE"],tempinspection["TXTRESPONSE"],route,cacheinspection,dispatch,setAlert,setAlertword)}}>Save</Button>
      <Text> </Text>
      <Button onPress={() => {uploadinspection(spin,tempinspection["NUMRESPONSE"],tempinspection["TXTRESPONSE"],route,cacheinspection,dispatch,setAlert,setAlertword,getData)}}>Upload</Button>
      <Text> </Text>
      
    </Box>
  );
}
