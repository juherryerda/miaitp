import {
  Box,
  Button,
  Input,
  Spacer,
  HStack,
  VStack,
  IconButton,
  CloseIcon,
  Text,
  Image,
  Alert,
  Center,
} from "native-base";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getData } from "./conn";
import { Spin } from "./spinner";

import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';

export default function Login({ navigation }) {
  //const [username, setUsername] = useState("");
  const spin = useSelector((state) => state.woreducer.spin);
  const [alert, setAlert] = useState(false);
  //const [processing, setProcessing] = useState(false);
  const username = useSelector((state) => state.woreducer.username);
  const dispatch = useDispatch();
  
  useEffect(() => {
  async function perm(){
  const cameraPermission = await Camera.getCameraPermissionStatus()
const microphonePermission = await Camera.getMicrophonePermissionStatus()

    const newCameraPermission = await Camera.requestCameraPermission()
	const newMicrophonePermission = await Camera.requestMicrophonePermission()
	
	}
	perm()
  }, []);
  
  
  return (
    <Box padding={5}>
      <HStack>
        {spin && <Spin />}
        <Spacer />
        
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
                    There is a newer version available, please update your apps
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
      <Input
        placeholder="Username" keyboardType="numeric"
        onChangeText={(e) => {
          //setUsername(e.target.value);
          dispatch({
            type: "edit",
            payload: e,
            table: "username",
          });
          
        }}
        value={username}
      />
      <Input placeholder="Password" />
      <Text> </Text>
      <Button
        onPress={async () => {
        
            
          if (username && !spin) {
          
            dispatch({
                type: "edit",
                payload: true,
                table: "spin",
              });
            //setProcessing(true);
            let version = await (
              await fetch("https://iims.indocement.co.id:7011/dcsserveragg")
            ).json();
            
            
            //setProcessing(false);
            dispatch({
                type: "edit",
                payload: false,
                table: "spin",
              });
            if (version && version.mia === "2.3.5") {
              navigation.navigate("Menu");
            } else {
              setAlert(true);
            }
          }
        }}
      >
        Login
      </Button>
      <Text> </Text>
      <Image alt="h"
        source={require("./11V1.jpeg")}
        width= {400} height= {400}
        
      ></Image>
      <Text> </Text>
      
      <Center><Text>Version 2.3.6</Text></Center>
      <Center><Text>-----------</Text></Center>
    </Box>
  );
}
