import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  async function fetchData() {
    const response = await axios.get(endpoint);
    setData(response.data);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      /* empty */
    }
    /*   eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [endpoint]);
  return data;
};

export default useFetch;
