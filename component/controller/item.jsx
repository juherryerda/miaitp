export async function loaditem(input,dispatch,getData,spin){
    if (input && !spin) {
        dispatch({
          type: "edit",
          payload: true,
          table: "spin",
        });
        let response = await getData("item", input.toLowerCase());
        dispatch({
          type: "edit",
          payload: false,
          table: "spin",
        });            
        if (response.length > 0) {
          dispatch({
            type: "edit",
            payload: response,
            table: "item",
          });
        }
        
      }
}

export async function loadinventory(navigation,dispatch,getData,item,setInput,spin){

    navigation.navigate('Inventory')
    dispatch({
        type: "edit",
        payload: [],
        table: "inventory",
      });
    if (!spin) {
    dispatch({
        type: "edit",
        payload: true,
        table: "spin",
      });
      let response = await getData("inventory", item.ITEMNUM);
      dispatch({
        type: "edit",
        payload: false,
        table: "spin",
      });
      
      if (response.length > 0) {
        dispatch({
          type: "edit",
          payload: response,
          table: "inventory",
        });
        //setInput("")
         
        
      //navigation.navigate('Inventory',{"ITEM":item,"INVENTORY":response})
      }
    }
}