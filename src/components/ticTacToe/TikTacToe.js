import './TikTacToe.css';
import React from 'react';
import { createStore } from 'redux';

const initialState = {
	isCircle: false,
	arr: [null, null, null, null, null, null, null, null, null],
	win: false,
	winCircle: [],
	winClose: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_IS_CIRCLE':
			return {
				...state,
				isCircle: action.payload
			};
		case 'SET_ARR':
			return {
				...state,
				arr: action.payload
			};
		case 'SET_WIN':
			return {
				...state,
				win: action.payload
			};
		case 'SET_WIN_CIRCLE':
			return {
				...state,
				winCircle: action.payload
			};
		case 'SET_WIN_CLOSE':
			return {
				...state,
				winClose: action.payload
			};
		default:
			return state;
	}
};

const store = createStore(reducer);

const TikTacToe = () => {
	const [forceUpdate, triggerForceUpdate] = React.useState(0);
	const { isCircle, arr, win, winCircle, winClose } = store.getState();
	const dispatch = store.dispatch;
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
		winConditions.forEach((condition) => {
			let boolClose = condition.every((element) => winClose.includes(element));
			let boolCircle = condition.every((element) =>
				winCircle.includes(element)
			);

			if (boolCircle) {
				dispatch({ type: 'SET_WIN', payload: 'Победил нолик' });
				return;
			}
			if (boolClose) {
				dispatch({ type: 'SET_WIN', payload: 'Победил крестик' });
				return;
			}
		});

		let bool = arr.includes(null);
		if (!bool && !win) {
			dispatch({ type: 'SET_WIN', payload: 'Ничья' });
		}
		triggerForceUpdate(forceUpdate + 1);
	};

	const onClickBtn = (i) => {
		const newArr = [...arr];
		if (newArr[i] !== 'circle' && newArr[i] !== 'close') {
			newArr[i] = isCircle ? 'circle' : 'close';
			if (newArr[i] === 'close') {
				dispatch({ type: 'SET_WIN_CLOSE', payload: [...winClose, i] });
				dispatch({ type: 'SET_ARR', payload: newArr });
				dispatch({ type: 'SET_IS_CIRCLE', payload: !isCircle });
			} else if (newArr[i] === 'circle') {
				dispatch({ type: 'SET_WIN_CIRCLE', payload: [...winCircle, i] });
				dispatch({ type: 'SET_ARR', payload: newArr });
				dispatch({ type: 'SET_IS_CIRCLE', payload: !isCircle });
			}
			checkWin();
			triggerForceUpdate(forceUpdate + 1);
		}
	};

	const reset = () => {
		let newArr = [null, null, null, null, null, null, null, null, null];
		dispatch({ type: 'SET_ARR', payload: newArr });
		dispatch({ type: 'SET_WIN', payload: false });
		dispatch({ type: 'SET_WIN_CIRCLE', payload: [] });
		dispatch({ type: 'SET_WIN_CLOSE', payload: [] });
		dispatch({ type: 'SET_IS_CIRCLE', payload: false });
		triggerForceUpdate(forceUpdate + 1);
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
