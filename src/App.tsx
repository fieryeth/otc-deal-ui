import React, { useState } from "react";
import "./App.css";
import { useEtherBalance, useEthers, useLookupAddress } from "@usedapp/core";
import {ethers} from "ethers";
import { Button } from "./components/Button";
import { DealInfo } from "./components/DealInfo";
import Deal from "./abis/Deal.json"

const shortenAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
    address.length
  )}`;
};

function App() {
  const { activateBrowserWallet, account, deactivate, chainId, library } = useEthers();
  const etherBalance = useEtherBalance(account);
  const ens = useLookupAddress();
  const [tab, setTab] = useState({ find: true, create: false });
  const [address, setAddress] = useState("")
  const [user0, setUser0] = useState("")
  const [user1, setUser1] = useState("")
  const [token0, setToken0] = useState("")
  const [token1, setToken1] = useState("")
  const [amount0, setAmount0] = useState("")
  const [amount1, setAmount1] = useState("")


  const handleClickTab = (newTab: string) => {
    if (newTab === "find") setTab({ find: true, create: false });
    if (newTab === "create") setTab({ find: false, create: true });
  };

  const checkAddresses = (addresses: string[]) => {
    return addresses.map(addy => ethers.utils.isAddress(addy)).every((t) => t)
  }

  const handleDealDeployment = async () => {
    console.log("Started deployment")

    if (!library || !checkAddresses([user0, user1, token0, token1])) {
      console.log("Addresses not valid")
      return
    }

    const factory = new ethers.ContractFactory(
      new ethers.utils.Interface(Deal.abi),
      Deal.bytecode,
      library.getSigner()
    )

    const dealContract = await factory.deploy(
      user0,
      user1,
      token0,
      token1,
      parseInt(amount0),
      parseInt(amount1)
    )

    console.log("Deploying Deal...")
    console.log(`Address will be ${dealContract.address}`)

    await dealContract.deployed()

    console.log("Deployed")
  }

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
          {tab["find"] && <div>
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
          </div>}

          {tab["create"] && <div>
            <p className="text-center text-4xl">Create a Deal</p>
            <p className="text-center text-xl">
              Create a brand new deal
            </p>
            <div className="flex flex-col w-4/5 m-auto mt-5">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="address"
              >
                User 1 (Address)
              </label>
              <input
                className="shadow appearance-none rounded w-full m-auto py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="user0"
                type="text"
                placeholder="0x..."
                onChange={(e) => setUser0(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-4/5 m-auto mt-5">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="address"
              >
                User 2 (Address)
              </label>
              <input
                className="shadow appearance-none rounded w-full m-auto py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="user1"
                type="text"
                placeholder="0x..."
                onChange={(e) => setUser1(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-4/5 m-auto mt-5">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="address"
              >
                Token 1 (Address of the token to be sent by User 1)
              </label>
              <input
                className="shadow appearance-none rounded w-full m-auto py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="token0"
                type="text"
                placeholder="0x..."
                onChange={(e) => setToken0(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-4/5 m-auto mt-5">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="address"
              >
                Token 2 (Address of the token to be sent by User 2)
              </label>
              <input
                className="shadow appearance-none rounded w-full m-auto py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="token1"
                type="text"
                placeholder="0x..."
                onChange={(e) => setToken1(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-4/5 m-auto mt-5">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="address"
              >
                Amount 1 (amount of Token 1 in the Deal)
              </label>
              <input
                className="shadow appearance-none rounded w-full m-auto py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amount0"
                type="text"
                placeholder="100"
                onChange={(e) => setAmount0(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-4/5 m-auto mt-5">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="address"
              >
                Amount 2 (amount of Token 2 in the Deal)
              </label>
              <input
                className="shadow appearance-none rounded w-full m-auto py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amount1"
                type="text"
                placeholder="200"
                onChange={(e) => setAmount1(e.target.value)}
              />
            </div>

            <div className="w-1/3 m-auto mt-8">
              <Button
                text="Create"
                selected={false}
                onClick={() => handleDealDeployment()}
              />
            </div>
          </div>}
        </div>
      )}
    </div>
  );
}

export default App;
