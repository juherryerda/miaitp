export async function loadlabor(getData, dispatch, spin, desc) {
  if (!spin) {
    dispatch({
      type: "edit",
      payload: [],
      table: "labor",
    });
    dispatch({
      type: "edit",
      payload: true,
      table: "spin",
    });

    let response = await getData("labor", desc.toLowerCase());

    //console.log(response)
    //navigation.navigate("Wodetail", item);

    dispatch({
      type: "edit",
      payload: response,
      table: "labor",
    });

    dispatch({
      type: "edit",
      payload: false,
      table: "spin",
    });
  } else {
  }
}
