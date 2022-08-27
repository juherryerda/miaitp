function clearwolistsearchcount(dispatch) {
  //clear wolistsearchcount
  dispatch({
    type: "edit",
    payload: 15,
    table: "wolistsearchcount",
  });
}
function clearinit(dispatch) {
  clearwolistsearchcount(dispatch);

  // clear wolist
  dispatch({
    type: "edit",
    payload: [],
    table: "wolist",
  });

  // clear wolistsearch
  dispatch({
    type: "edit",
    payload: [],
    table: "wolistsearch",
  });

  //clear wolistfilter
  dispatch({
    type: "edit",
    payload: [],
    table: "wolistfilter",
  });

  //clear wolistisfiltered
  dispatch({
    type: "edit",
    payload: false,
    table: "wolistisfiltered",
  });
}

export function filter(e, dispatch, data, wolistsearchcount) {
  clearwolistsearchcount(dispatch);

  if (e) {
    //filtering process
    let a = data.filter((item) =>
      (
        item.DESCRIPTION +
        " " +
        item.WONUM +
        " " +
        item.STATUS +
        " " +
        item.TARGSTARTDATE +
        " " +
        item.PMNUM +
        " " +
        item.LEAD +
        " " +
        item.ASSETNUM +
        " " +
        item.ASSETDESC +
        " " +
        item.LOCATION
      )
        .toLowerCase()
        .includes(e.toLowerCase())
    );

    //loading wolistisfiltered
    dispatch({
      type: "edit",
      payload: true,
      table: "wolistisfiltered",
    });

    //loading wolistfilter
    dispatch({
      type: "edit",
      payload: a,
      table: "wolistfilter",
    });

    //loading wolistsearch
    let temp = [];
    for (let i = 0; i < wolistsearchcount; i++) {
      if (i < a.length) {
        temp.push(a[i]);
      } else {
        break;
      }
    }
    dispatch({
      type: "edit",
      payload: temp,
      table: "wolistsearch",
    });
    ////////////////////////
  } else {
    //clear wolistisfiltered
    dispatch({
      type: "edit",
      payload: false,
      table: "wolistisfiltered",
    });

    //clear wolistfilter
    dispatch({
      type: "edit",
      payload: [],
      table: "wolistfilter",
    });

    let temp = [];
    for (let i = 0; i < wolistsearchcount; i++) {
      if (i < data.length) {
        temp.push(data[i]);
      } else {
        break;
      }
    }
    dispatch({
      type: "edit",
      payload: temp,
      table: "wolistsearch",
    });
  }
}

export async function loadwolist(input, dispatch, getData, wolistsearchcount) {
  if (input) {
    clearinit(dispatch);

    // loading true
    dispatch({
      type: "edit",
      payload: true,
      table: "spin",
    });

    //fetch data
    let response = await getData("wolist", input);

    //loading false
    dispatch({
      type: "edit",
      payload: false,
      table: "spin",
    });

    if (response.length > 0) {
      //console.log(response)
      //loading wolist
      dispatch({
        type: "edit",
        payload: response,
        table: "wolist",
      });

      //loading wolistsearch
      let temp = [];
      for (var i = 0; i < wolistsearchcount; i++) {
        if (i < response.length) {
          temp.push(response[i]);
        } else {
          break;
        }
      }
      dispatch({
        type: "edit",
        payload: temp,
        table: "wolistsearch",
      });
      //////////////////////
    }
  }
}

export function loadmore(
  wolist,
  wolistsearchcount,
  dispatch,
  wolistfilter,
  wolistisfiltered
) {
  if (wolistisfiltered) {
    //loading wolistsearch from wolistfilter
    let temp = [];
    for (let i = 0; i < wolistsearchcount + 15; i++) {
      //response.length; i++){
      if (i < wolistfilter.length) {
        temp.push(wolistfilter[i]);
      } else {
        break;
      }
    }
    dispatch({
      type: "edit",
      payload: temp,
      table: "wolistsearch",
    });
    ///////////////////////
  } else {
    //loading wolistsearch from wolist
    let temp = [];
    for (let i = 0; i < wolistsearchcount + 15; i++) {
      //response.length; i++){
      if (i < wolist.length) {
        temp.push(wolist[i]);
      } else {
        break;
      }
    }
    dispatch({
      type: "edit",
      payload: temp,
      table: "wolistsearch",
    });
    ///////////////////////
  }

  //update wolistsearchcount
  dispatch({
    type: "edit",
    payload: wolistsearchcount + 15,
    table: "wolistsearchcount",
  });
}
