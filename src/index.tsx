import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Config, Mainnet, DAppProvider, Hardhat, Kovan, MulticallAddresses } from "@usedapp/core";

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]:
      "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    [Hardhat.chainId]:
      "http://localhost:8545"
  },

  multicallAddresses: {
    [Hardhat.chainId]: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  }
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
