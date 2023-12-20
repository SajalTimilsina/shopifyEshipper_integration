import React, { useEffect, useState } from "react";
function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api/eshipper/getData")
      .then((response) => response.json())
      .then((data) => setBackendData(data));
  }, []);
  return <div>Hello</div>;
}

export default App;
