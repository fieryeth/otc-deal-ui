import React from "react";
import { useContractCall, ContractCall } from "@usedapp/core";
import { ethers } from "ethers";
import Deal from "../abis/Deal.json";

export default function useDealInfo(
  dealAddress: string,
) {
  const [user0, user1, token0, token1, amount0, amount1] =
  useContractCall({
    abi: new ethers.utils.Interface(Deal.abi),
    address: dealAddress,
    method: "getDealInfo",
    args: [],
    }
  ) ?? [];

  return [user0, user1, token0, token1, amount0, amount1];
}
