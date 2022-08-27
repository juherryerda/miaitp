export function filter(e, dispatch, data) {
  if (e) {
    let a = data.filter((item) =>
      item.DESCRIPTION.toLowerCase().includes(e.toLowerCase())
    );
    dispatch({
      type: "edit",
      payload: a,
      table: "wotasksearch",
    });
  } else {
    dispatch({
      type: "edit",
      payload: data,
      table: "wotasksearch",
    });
  }
}

export async function loadtask(
  navigation,
  spin,
  dispatch,
  wonum,
  getData,
  cachewodetailtask
) {
  navigation.navigate("Wodetailtask", wonum);

  if (!spin) {
    //clear wotask
    dispatch({
      type: "edit",
      payload: [],
      table: "wotask",
    });

    //clear wotasksearch
    dispatch({
      type: "edit",
      payload: [],
      table: "wotasksearch",
    });

    //loading true
    dispatch({
      type: "edit",
      payload: true,
      table: "spin",
    });

    let response = [];    

    //check cache exists
    if (cachewodetailtask && wonum in cachewodetailtask) {
      
      response = cachewodetailtask[wonum];
    }

    //cache not exists
    else {
      //fetch data
      response = await getData("wotask", wonum);

      //loading cachewodetailtask
      let copy = {};
      if (!cachewodetailtask) {        
        copy[wonum] = response;        
      } else {        
        Object.assign(copy, cachewodetailtask);
        copy[wonum] = response;        
      }

      dispatch({
        type: "edit",
        payload: copy,
        table: "cachewodetailtask",
      });
      /////////////////////////////
    }

    
    //loading wotask
    dispatch({
      type: "edit",
      payload: response,
      table: "wotask",
    });

    //loading wotasksearch
    dispatch({
      type: "edit",
      payload: response,
      table: "wotasksearch",
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
