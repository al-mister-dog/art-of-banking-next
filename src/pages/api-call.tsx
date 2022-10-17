import { useEffect } from "react";

export default function ApiCall() {
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        ""
        // "https://financialmodelingprep.com/api/v3/financial-statement-symbol-lists?apikey=f9ed739169f2c423e88b9742abd61b6f"
      );
      const data = await response.json();
      console.log(data);
    }
    getData();
  }, []);
  return <h1>Api Call</h1>;
}
