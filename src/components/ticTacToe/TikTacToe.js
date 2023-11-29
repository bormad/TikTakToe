import './TikTacToe.css';
import React from 'react';

const TikTacToe = () => {
	const [isCircle, setIsCircle] = React.useState(false);
	const [arr, setArr] = React.useState([
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null
	]);
	const [win, setWin] = React.useState(false);
	const [winCircle, setWinCircle] = React.useState([]);
	const [winClose, setWinClose] = React.useState([]);

	const winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	const checkWin = () => {
		let bool = arr.includes(null);
		if (!bool) {
			setWin('Ничья');
		}
		winConditions.forEach(condition => {
			let boolClose = condition.every(element => winClose.includes(element));
			let boolCircle = condition.every(element => winCircle.includes(element));

			if (boolCircle) {
				setWin('Победил нолик');
				return;
			}
			if (boolClose) {
				setWin('Победил крестик');
				return;
			}
		});
	};

	const onClickBtn = i => {
		const newArr = [...arr];
		if (newArr[i] !== 'circle' && newArr[i] !== 'close') {
			newArr[i] = isCircle ? 'circle' : 'close';
			if (newArr[i] === 'close') {
				setWinClose([...winClose, i]);
				setArr(newArr);
				setIsCircle(!isCircle);
			} else if (newArr[i] === 'circle') {
				setWinCircle([...winCircle, i]);
				setArr(newArr);
				setIsCircle(!isCircle);
			}
		}
	};

	const reset = () => {
		let newArr = [null, null, null, null, null, null, null, null, null];
		setArr(newArr);
		setWin(false);
		setWinCircle([]);
		setWinClose([]);
		setIsCircle(false);
	};

	React.useEffect(() => {
		checkWin();
	}, [winCircle, winClose]);

	return (
		<>
			<h1>Следующий ход у {isCircle ? 'нолика' : 'крестика'}</h1>
			<div className='wrapper'>
				{arr.map((elem, i) => {
					return (
						<button onClick={() => onClickBtn(i)} key={i}>
							<div className={elem}></div>
						</button>
					);
				})}
			</div>
			{win ? <h1>{win}</h1> : null}
			<button onClick={reset} className='reset'>
				Начать заново
			</button>
		</>
	);
};

export default TikTacToe;
