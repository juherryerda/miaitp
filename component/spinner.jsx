import React from "react";
import {
  Spinner,
  HStack,Text,
  Heading,
  Center,
  NativeBaseProvider,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";

export const Spin = () => {
  const data = useSelector((state) => state.woreducer.spin);
  return (
    
    <HStack space={2} justifyContent="center">
    
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        
      </Heading>
      
    </HStack>
    
  );
};
