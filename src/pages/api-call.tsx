import { useEffect } from "react";

export default function ApiCall() {
  useEffect(() => {
    async function getData() {
      const response = await fetch("");
      const data = await response.json();
      console.log(data);
    }
    getData();
  }, []);
  return <h1>Api Call</h1>;
}
