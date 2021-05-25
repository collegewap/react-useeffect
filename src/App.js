import { useEffect, useState } from "react";

function App() {
  const [price, setPrice] = useState();
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    let interval;
    const fetchBitcoinPrice = () => {
      fetch("https://api.coincap.io/v2/assets/bitcoin")
        .then((response) => response.json())
        .then((result) => {
          // Format the price to 2 decimal places
          const bitcoinPrice = (+result?.data?.priceUsd).toFixed(2);
          setPrice(bitcoinPrice);
        })
        .catch((error) => console.log("error", error));
    };
    if (!price) {
      fetchBitcoinPrice();
    }
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchBitcoinPrice();
      }, 5 * 1000);
    }

    return () => {
      // Clear the previous interval before the component gets updated
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
