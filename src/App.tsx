import React from "react";
import "./App.css";
import { useEtherBalance, useEthers, useLookupAddress } from "@usedapp/core";
import { Button } from "./components/Button";

const shortenAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 5,
    address.length - 1
  )}`;
};

function App() {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const ens = useLookupAddress();

  return (
    <div className="App bg-black bg-gradient-to-b from-blue-800 h-screen text-white">
      <header className="pt-3 w-11/12 m-auto flex justify-between items-center">
        <div className="w-full text-center">
          <h1 className="text-white font-bold text-3xl">OTC Deal</h1>
        </div>
        <div className="flex border border-purple-300 w-full justify-evenly items-center bg-gray-900 rounded">
          <Button text="Find" selected={true} />
          <Button text="Create" selected={false} />
        </div>
        <div className="w-full text-center">
          {!account ? (
            <button
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-purple-300 rounded"
              onClick={() => activateBrowserWallet()}
            >
              Connect Web3 Account
            </button>
          ) : (
            <button
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-purple-300 rounded"
              onClick={() => deactivate()}
            >
              {ens ?? shortenAddress(account)}
            </button>
          )}
        </div>
      </header>

      {!account && (
        <p className="text-center text-3xl font-light mt-40">
          Please connect your Web3 account.
        </p>
      )}
    </div>
  );
}

export default App;
