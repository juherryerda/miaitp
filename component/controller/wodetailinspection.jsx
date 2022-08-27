export async function loadinspectionform(
  navigation,
  item,
  cacheinspection,
  dispatch
) {
  //console.log(cacheinspection)
  if (
    cacheinspection &&
    item.WONUM + " " + item.INSPFIELDNUM in cacheinspection
  ) {
    //console.log("ad cache");

    dispatch({
      type: "edit",
      payload: cacheinspection[item.WONUM + " " + item.INSPFIELDNUM],
      table: "tempinspection",
    });

    navigation.navigate(
      "Wodetailinspectionform",
      cacheinspection[item.WONUM + " " + item.INSPFIELDNUM]
    );
  } else {
    //console.log("ndak cache");

    dispatch({
      type: "edit",
      payload: item,
      table: "tempinspection",
    });

    navigation.navigate("Wodetailinspectionform", item);
  }
}

export async function loadinspectionlist(
  navigation,
  spin,
  dispatch,
  wonum,
  getData,
  cacheinspectionlist
) {
  navigation.navigate("Wodetailinspection", wonum);

  if (!spin) {
    //clear woinspection
    dispatch({
      type: "edit",
      payload: [],
      table: "woinspection",
    });

    //loading true
    dispatch({
      type: "edit",
      payload: true,
      table: "spin",
    });

    let response = [];

    //check cache exists
    if (cacheinspectionlist && wonum in cacheinspectionlist) {
      response = cacheinspectionlist[wonum];
    }

    //cache not exists
    else {
      //fetch data
      response = await getData("woinspection", wonum);

      //loading cacheinspectionlist
      let copy = {};
      if (!cacheinspectionlist) {
        copy[wonum] = response;
      } else {
        Object.assign(copy, cacheinspectionlist);
        copy[wonum] = response;
      }

      dispatch({
        type: "edit",
        payload: copy,
        table: "cacheinspectionlist",
      });
      /////////////////////////////
    }

    //loading wo inspection
    dispatch({
      type: "edit",
      payload: response,
      table: "woinspection",
    });

    //loading false
    dispatch({
      type: "edit",
      payload: false,
      table: "spin",
    });
  } else {
  }
}

export async function uploadinspection(
  spin,
  measurement,
  observation,
  route,
  cacheinspection,
  dispatch,
  setAlert,
  setAlertword,
  getData
) {

  if (!spin) {
  
    let save = await saveinspectionbackground(
      spin,
      measurement,
      observation,
      route,
      cacheinspection,
      dispatch,
      setAlert,
      setAlertword
    );
    
    

    dispatch({
      type: "edit",
      payload: true,
      table: "spin",
    });

    

    //fetch data
    if (save) {
      let response = await getData("uploadinspection", {
        key: route.params.WONUM + " " + route.params.INSPFIELDNUM,
        data: save[route.params.WONUM + " " + route.params.INSPFIELDNUM],
      });

      if (response.success) {
        //console.log("success");
        setAlertword("Uploaded");
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      } else {
        setAlertword("Upload Failed");
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      }
    }

    dispatch({
      type: "edit",
      payload: false,
      table: "spin",
    });
    //console.log(response);
  }
}

async function saveinspectionbackground(
  spin,
  measurement,
  observation,
  route,
  cacheinspection,
  dispatch,
  setAlert,
  setAlertword
) {

  if (!spin) {
    if (
      measurement !== route.params.NUMRESPONSE ||
      observation !== route.params.TXTRESPONSE
    ) {
    
      let mer = {};
      Object.assign(mer, route.params);
      mer["NUMRESPONSE"] = measurement;
      mer["TXTRESPONSE"] = observation;
      mer["UPLOADED"] = false;
      let copy = {};

      if (!cacheinspection) {
        copy[route.params.WONUM + " " + route.params.INSPFIELDNUM] = mer;
      } else {
        Object.assign(copy, cacheinspection);
        copy[route.params.WONUM + " " + route.params.INSPFIELDNUM] = mer;
      }

      dispatch({
        type: "edit",
        payload: copy,
        table: "cacheinspection",
      });

      return copy;
    }
  }
}

export async function saveinspection(
  spin,
  measurement,
  observation,
  route,
  cacheinspection,
  dispatch,
  setAlert,
  setAlertword
) {
  await saveinspectionbackground(
    spin,
    measurement,
    observation,
    route,
    cacheinspection,
    dispatch,
    setAlert,
    setAlertword
  );

  setAlertword("Saved");
  setAlert(true);
  setTimeout(() => {
    setAlert(false);
  }, 2000);
}
