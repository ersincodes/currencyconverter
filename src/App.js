import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const convert = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
      );
      const data = await res.json();
      setConverted(data.rates[toCur]);
    } catch (error) {
      console.error("There was an error converting the currency:", error);
      setConverted("Error");
    } finally {
      setIsLoading(false);
    }
  };

  // Only run on mount and unmount
  useEffect(() => {
    convert(); // Initial conversion when the component mounts
  }, []);

  return (
    <div className="app-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loader"></div>
        </div>
      )}
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
        placeholder="Enter amount"
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="MXN">MXN</option>
        <option value="TRY">TRY</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="MXN">MXN</option>
        <option value="TRY">TRY</option>
      </select>
      <button onClick={convert} disabled={isLoading}>
        Convert
      </button>
      <p>{isLoading ? "Converting..." : `${converted} ${toCur}`}</p>
    </div>
  );
}
