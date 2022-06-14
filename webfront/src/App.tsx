import React, { VFC } from "react";
import { ethers } from "ethers";
import artifact from "./abi/TodoList.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const App: VFC = () => {
	const provider = new ethers.providers.JsonRpcProvider();
	const contract = new ethers.Contract(contractAddress, artifact.abi, provider);
	// const { METHOD_NAME } = contract.functions;

	return (<h1>Hello, TodoList Contract.</h1>)
}