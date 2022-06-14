import React, { useEffect, useState, VFC } from "react";
import { ethers } from "ethers";
import artifact from "./abi/TodoList.json";

type Task = {
	id: string,
	content: string,
	isCompleted: boolean
}

const useContent = (
	contract: ethers.Contract
) => {
	const { taskCount, tasks } = contract.functions;
	const [taskCountValue, setTaskCountValue] = useState<string>("");
	const [tasksValue, setTasksValue] = useState<Task[]>([]);
	useEffect(() => {
		const getTasksCount = async () => {
			const _taskCount = await taskCount();
			setTaskCountValue(_taskCount);

			const _tasks = [];
			for (let i = 1; i <= _taskCount; i++) {
				const _task = await tasks(i);
				_tasks.push({
					..._task,
					id: i
				})
			}
			setTasksValue(_tasks);
		}
		getTasksCount();
	}, [])

	return {
		taskCount: taskCountValue,
		tasks: tasksValue,
	}
}

const Content: VFC<{contract: ethers.Contract}> = ({contract}) => {
	const { taskCount } = useContent(contract);
	return (<p>{`taskCount ... ${taskCount}`}</p>);
}

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


export const App: VFC = () => {
	const provider = new ethers.providers.JsonRpcProvider();
	const contract = new ethers.Contract(contractAddress, artifact.abi, provider);

	return (
		<div>
			<h1>Hello, TodoList Contract.</h1>
			<Content contract={contract} />
		</div>
	)
}