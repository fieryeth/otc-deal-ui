import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App bg-black bg-gradient-to-b from-blue-800 h-screen text-white">
      <header className="pt-3 w-11/12 m-auto flex justify-between items-center">
        <div className="w-full text-center">
          <h1 className="text-white font-bold text-3xl">OTC Deal</h1>
        </div>
        <div className="flex border border-purple-300 w-full justify-evenly items-center bg-gray-900 rounded">
          <p className="w-full py-2 hover:bg-gray-700 font-bold text-center rounded">
            Create
          </p>
          <p className="w-full py-2 hover:bg-gray-700 font-bold text-center rounded">
            Find
          </p>
        </div>
        <div className="w-full text-center">
          <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-purple-300 rounded">
            Connect Wallet
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
