import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {

	const [toDos, setToDos] = useState(null);
	//  const [newTodoL, setNewTodoL] = useState([]);
	const [url] = useState("https://assets.breatheco.de/apis/fake/todos/user/rtapias");

	useEffect(() => {
		getTodo(url);
	}, [])

	const getTodo = (url) => {
		fetch(url, {})
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				setToDos(data);
			})
	};
	// console.log("Testing this ->", getTodo)

	// const createUser = () => {
	// 	fetch("https://assets.breatheco.de/apis/fake/todos/user/rtapias", {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify([])
	// 	})
	// 		.then((response) => response.json())
	// 		.then(data => {
	// 			console.log(data)
	// 		})
	// }

	const updateTodo = (toDos) => {
		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(toDos)
		})
			.then((response) => response.json())
			.then(data => {
				if (data) {
					getTodo();
				}
			})
	}

	const handleKey = e => {
		if (e.keyCode === 13 && e.target.value !== "") {
			let newTodo = [...toDos].concat({ label: e.target.value, done: false })
			updateTodo(newTodo)
			e.target.value = ""
		}
	};

	const handleDelete = i => {
		var array = [...toDos];
		array.splice(i, 1);
		updateTodo(array)
	};

	// const removeAll = async () => {
	// 	setToDos([])
	// }
	const deleteTodo = () => {
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(toDos)
		})
			.then((response) => response.json())
			.then(data => {
				if (data) {
					setToDos([]);
				}
			})
	}

		return (
		<>
			<h1>To-Do List</h1>
			<div className="container">
				<input type="text" placeholder={!!toDos && toDos.length === 0 ? "There aren't any tasks, please add one." : "What needs to be done"} onKeyUp={handleKey} />
				<ul>
					{!!toDos && toDos.length > 0 && toDos.map((toDos, i) => {
						return <li className="list" key={i}>{toDos.label}
							<button className="close" onClick={() => handleDelete(i)}>X</button>
						</li>
					})}
					<li id="itemLeft">{!!toDos && toDos.length} items left</li>
					<button className="rmvAll" onClick={() => deleteTodo()}>Remove tasks</button>
				</ul>
			</div>
		</>
	);
};

export default Home;