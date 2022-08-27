function diff_hours(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

export async function loadlabtrans(
  navigation,
  wonum,
  dispatch,
  spin,
  getData,
  cachelabtrans
) {
  navigation.navigate("Wodetaillabtrans", wonum);
  if (!spin) {
    dispatch({
      type: "edit",
      payload: [],
      table: "wolabtrans",
    });
    dispatch({
      type: "edit",
      payload: true,
      table: "spin",
    });

    let response = [];
    
    if (cachelabtrans && wonum in cachelabtrans) {
      
      response = cachelabtrans[wonum];
    } else {
      
      response = await getData("wolabtrans", wonum);
    }

    console.log(response)

    dispatch({
      type: "edit",
      payload: response,
      table: "wolabtrans",
    });

    dispatch({
      type: "edit",
      payload: false,
      table: "spin",
    });
  } else {
  }
}

export async function uploadlabtrans(
  spin,
  getData,
  dispatch,
  setAlert,
  st,
  ft,
  labor,
  moment,
  wolabtrans,
  setAlertword,
  wonum,
  cachelabtrans
) {
  const error =
    "Error occured, finish date must be greater than start date and labor code is not null";
  const success = "Upload Success";

  if (!spin) {
    if (labor && ft > st) {
      let result = {
        LABORCODE: labor.PERSONID,
        DISPLAYNAME: labor.DISPLAYNAME,
        STARTDATE: moment(st).format("YYYY-MM-DD HH:mm:ss"),
        FINISHDATE: moment(ft).format("YYYY-MM-DD HH:mm:ss"),
        REGULARHRS: diff_hours(st, ft),
        ADDITIONAL: true
      };
      dispatch({
        type: "edit",
        payload: true,
        table: "spin",
      });
      setTimeout(() => {
        dispatch({
          type: "edit",
          payload: false,
          table: "spin",
        });

        //let a = wolabtrans.push(result)
        //console.log([...wolabtrans,result])
        let mer = [...wolabtrans, result];
        dispatch({
          type: "edit",
          payload: mer,
          table: "wolabtrans",
        });

        if (!cachelabtrans) {
          let copy = {};
          copy[wonum] = mer;
          dispatch({
            type: "edit",
            payload: copy,
            table: "cachelabtrans",
          });
        } else {
          let copy = {};
          Object.assign(copy, cachelabtrans);
          copy[wonum] = mer;
          dispatch({
            type: "edit",
            payload: copy,
            table: "cachelabtrans",
          });
        }

        setAlertword(success);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      }, 2000);
      //console.log(result);
    } else {
      setAlertword(error);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  } else {
    console.log("lagi muter");
  }
}
