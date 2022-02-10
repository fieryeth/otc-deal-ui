import React, { useState } from "react";
import "./App.css";
import { useEtherBalance, useEthers, useLookupAddress } from "@usedapp/core";
import {ethers} from "ethers";
import { Button } from "./components/Button";
import { DealInfo } from "./components/DealInfo";

const shortenAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 5,
    address.length - 1
  )}`;
};

function App() {
  const { activateBrowserWallet, account, deactivate, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const ens = useLookupAddress();
  const [tab, setTab] = useState({ find: true, create: false });
  const [address, setAddress] = useState("")


  const handleClickTab = (newTab: string) => {
    if (newTab === "find") setTab({ find: true, create: false });
    if (newTab === "create") setTab({ find: false, create: true });
  };

  return (
    <div className="App bg-black bg-gradient-to-b from-blue-800 h-screen text-white">
      <header className="pt-3 w-11/12 m-auto flex justify-between items-center">
        <div className="w-full text-center">
          <h1 className="text-white font-bold text-3xl">OTC Deal</h1>
        </div>
        <div className="flex w-full justify-evenly items-center bg-gray-900 rounded">
          <Button
            text="Find"
            selected={tab["find"]}
            onClick={() => handleClickTab("find")}
          />
          <Button
            text="Create"
            selected={tab["create"]}
            onClick={() => handleClickTab("create")}
          />
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

      {account && (
        <div className="w-3/5 m-auto mt-20 bg-gray-900 border border-purple-300 py-5 px-10">
          <p className="text-center text-4xl">Find a Deal</p>
          <p className="text-center text-xl">
            Find an existing deal you're part of
          </p>
          <div className="flex flex-col w-4/5 m-auto mt-5">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="address"
            >
              Deal address
            </label>
            <input
              className="shadow appearance-none rounded w-full m-auto py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="0x..."
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {ethers.utils.isAddress(address) && <DealInfo address={ethers.utils.getAddress(address)} chainId={chainId} />}
        </div>
      )}
    </div>
  );
}

export default App;
