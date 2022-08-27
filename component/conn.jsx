import axios from "axios";

export async function getData(type, query) {
  try {
    const response =  await axios.post(
      "https://iims.indocement.co.id:7011/dcsserveragg/webresources/dcsserver.additiondcsserver/globalfetch",
      { key: "mju7nhy6bgt5", type: type, payloads: query }
    );
    return await response.data
  } catch (e) {
    console.error(e);
    return [];
  }
}


