import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

export default function Camerapage({ navigation }){
const devices = useCameraDevices()
  const device = devices.back

  
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
      <HStack>
      <Button> Tekan </Button>
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
    </HStack>
    </Box>
  )

}
