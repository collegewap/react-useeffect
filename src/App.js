import { useEffect, useState } from "react";

function App() {
  const [price, setPrice] = useState();
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coincap.io/v2/assets/bitcoin"
        );
        const result = await response.json();
        const bitcoinPrice = (+result?.data?.priceUsd).toFixed(2);
        setPrice(bitcoinPrice);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (!price) {
      // Fetch price for the first time when the app is loaded
      fetchData();
    }

    if (autoRefresh) {
      interval = setInterval(() => {
        fetchData();
      }, 5 * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [autoRefresh, price]);

  return (
    <div className="App">
      <h2>{price && `Bitcoin Price: $${price}`}</h2>
      <div className="refresh">
        <div className="refresh-label">Auto refresh:</div>
        <label className="switch">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => {
              setAutoRefresh(e.target.checked);
            }}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default App;
