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
  Alert,
  CloseIcon,
  IconButton,Modal,FormControl
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { filter, init } from "./controller/wolist";
import { Spin } from "./spinner";
import { loadwodetail } from "./controller/wodetail";
import { uploadlabtrans } from "./controller/wodetaillabtrans";
import { getData } from "./conn";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Platform } from "react-native";
import moment from "moment";

export function Wodetaillabtransform({ navigation, route }) {
  const spin = useSelector((state) => state.woreducer.spin);
  const labor = useSelector((state) => state.woreducer.laborchoosen);
  const wolabtrans = useSelector((state) => state.woreducer.wolabtrans);
  const cachelabtrans = useSelector((state) => state.woreducer.cachelabtrans);
  
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const [alertword,setAlertword] = useState("")
  //console.log(moment(st).format("YYYY-MM-DD HH:mm:ss"));
  //console.log(moment(ft).format("YYYY-MM-DD HH:mm:ss"));


  function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

const [st, setSt] = useState(new Date());
  const [ft, setFt] = useState();
  const [datePicker, setDatePicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  
  //const [mode,setMode] = useState('date')

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
      <Text> </Text>
      <Button
        onPress={() => {
            uploadlabtrans(spin,getData,dispatch,setAlert,st,ft,labor,moment,wolabtrans,setAlertword,route.params,cachelabtrans)
            //console.log(wolabtrans)
          
        }}
      >
        Upload
      </Button>
      <Text> </Text>
      <Box>
        <Text>Labor : </Text>
        <Input isDisabled value={(labor)?labor.PERSONID:""}></Input>
        <Text>{(labor)?labor.DISPLAYNAME:""}</Text>
        <Text> </Text>
        <Button onPress={() => {
            dispatch({
                type: "edit",
                payload: [],
                table: "labor",
              });
            navigation.navigate('Labor')

        }}>Search Labor</Button>
        <Text> </Text>
        
        <Pressable onPress={() => {
        //setDatePicker(true)
        //setSt(moment().format("yyyy-MM-DD HH:mm:ss"))
        }}>
        <HStack>
        <Text>Start Date : </Text>
        
        <Input isReadOnly w="75%" value={moment(st).format("yyyy-MM-DD HH:mm:ss")}></Input>
        
        </HStack>
        </Pressable>

        {datePicker && (
          <Box>
            <DateTimePicker
              value={st}
              mode={'mode'}
              
              is24Hour={true}
            ></DateTimePicker>
          </Box>
        )}
        {timePicker && (
          <Box>
            <DateTimePicker
              value={st}
              mode={'time'}
              onChange={(event,date) => {
              //console.log(moment(date).format("yyyy-MM-DD HH:mm:ss"))
              setSt(date)
              
              setTimePicker(false)
              
              
              }}
              is24Hour={true}
            ></DateTimePicker>
          </Box>
        )}
        
        <Text> </Text>
        <Text>Finish Date : </Text>
        
      </Box>
      <Text> </Text>
      

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
    </Box>
  );
}
