import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; //Dont get rid of this
import { convertNumbers } from "../../../functions/convertNumbers";
import TradingViewWidget from "./TradingViewWidget";
import CoinInfo from "../CoinInfo/info";
import "./lineChart.css"; // Add a CSS file for styling
import { useParams } from "react-router-dom";

function LineChart({ chartData, priceType, multiAxis, coinName, coinDesc, coinSymbol }) {
    const { id } = useParams();
    console.log(id);
    
  // console.log("chartData:", chartData.datasets[0].label);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          callback: function (value) {
            if (priceType == "total_volumes") {
              return convertNumbers(value);
            } else if (priceType == "market_caps") {
              return "$" + convertNumbers(value);
            } else {
              return "$" + value.toLocaleString();
            }
          },
        },
      },
      y2: multiAxis && {
        type: "linear",
        display: true,
        position: "right",
        ticks: {
          callback: function (value) {
            if (priceType == "total_volumes") {
              return convertNumbers(value);
            } else if (priceType == "market_caps") {
              return "$" + convertNumbers(value);
            } else {
              return "$" + value.toLocaleString();
            }
          },
        },
      },
    },
  };

  useEffect(() => {
    const tickerScript = document.createElement("script");
    tickerScript.src = "https://widgets.coingecko.com/gecko-coin-ticker-widget.js";
    tickerScript.async = true;
    document.getElementById("ticker-widget").appendChild(tickerScript);

    const converterScript = document.createElement("script");
    converterScript.src = "https://widgets.coingecko.com/gecko-coin-converter-widget.js";
    converterScript.async = true;
    document.getElementById("converter-widget").appendChild(converterScript);
  }, [coinSymbol]);

  useEffect(() => {
    const tickerWidget = document.querySelector('gecko-coin-ticker-widget');
    const converterWidget = document.querySelector('gecko-coin-converter-widget');
    if (tickerWidget) {
      tickerWidget.setAttribute('dark-mode', theme === 'dark');
    }
    if (converterWidget) {
      converterWidget.setAttribute('dark-mode', theme === 'dark');
    }
  }, [theme]);

  return (
    <div className="line-chart-container">
      <div className="ticker-widget-section" id="ticker-widget">
        <gecko-coin-ticker-widget locale="en" outlined="true" initial-currency="usd" coin-id={id}></gecko-coin-ticker-widget>
      </div>
      <div className="chart-section">
        <Line data={chartData} options={options} />
      </div>
      <div className="converter-widget-section" id="converter-widget">
        <gecko-coin-converter-widget locale="en" outlined="true" initial-currency="usd" coin-id={id}></gecko-coin-converter-widget>
      </div>
      <div className="widget-section">
        <TradingViewWidget symbol={chartData.datasets[0].label} />
      </div>
      <div className="info-section">
        <CoinInfo name={coinName} desc={coinDesc} />
      </div>
    </div>
  );
}

export default LineChart;
