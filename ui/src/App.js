import { useState } from 'react';
import './App.css';

function App() {
  const [localSalesCount, setLocalSalesCount] = useState(0);
  const [foreignSalesCount, setForeignSalesCount] = useState(0);
  const [averageSalesAmount, setAverageSalesAmount] = useState(0);
  const [fcamaraCommission, setFcamaraCommission] = useState(0);
  const [competitorCommission, setCompetitorCommission] = useState(0);

  const handleCalculate = async (e) => {
    e.preventDefault();

    const data = {
      localSalesCount: parseInt(localSalesCount),
      foreignSalesCount: parseInt(foreignSalesCount),
      averageSalesAmount: parseFloat(averageSalesAmount)
    };

    try {
      const response = await fetch('http://localhost:5111/commision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setFcamaraCommission(result.fcamaraCommission);
      setCompetitorCommission(result.competitorCommission);
    } catch (error) {
      console.error("eroor", error);
      setFcamaraCommission(0);
      setCompetitorCommission(0);
    }
  };

  return (
  <div className="App">
  <header className="App-header">
    <div className="form-container">
      <h2 className="form-title">Sales Commission Calculator</h2>
      <form onSubmit={handleCalculate}>
        <div className="input-group">
          <label htmlFor="localSalesCount" className="input-label">
            Local Sales Count
          </label>
          <input
            name="localSalesCount"
            type="number"
            value={localSalesCount}
            onChange={(e) => setLocalSalesCount(e.target.value)}
            className="input-field"
            placeholder="Enter local sales count"
          />
        </div>

        <div className="input-group">
          <label htmlFor="foreignSalesCount" className="input-label">
            Foreign Sales Count
          </label>
          <input
            name="foreignSalesCount"
            type="number"
            value={foreignSalesCount}
            onChange={(e) => setForeignSalesCount(e.target.value)}
            className="input-field"
            placeholder="Enter foreign sales count"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="averageSaleAmount" className="input-label">
            Average Sale Amount
          </label>
          <input
            name="averageSaleAmount"
            type="number"
            value={averageSalesAmount}
            onChange={(e) => setAverageSalesAmount(e.target.value)}
            className="input-field"
            placeholder="Enter average sale amount"
          />
        </div>

        <button type="submit" className="calculate-btn">
          Calculate Commission
        </button>
      </form>
    </div>
  </header>

  <div className="results-container">
    <h3 className="results-title">Results</h3>
    <div className="result-item">
      Total FCamara commission: 
      <span className="commission-amount">
        £{fcamaraCommission !== undefined ? fcamaraCommission.toFixed(2) : '0.00'}
      </span>
    </div>
    <div className="result-item">
      Total Competitor commission: 
      <span className="commission-amount">
        £{competitorCommission !== undefined ? competitorCommission.toFixed(2) : '0.00'}
      </span>
    </div>
  </div>
</div>
  );
}

export default App;