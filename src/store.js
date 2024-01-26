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
		case 'SET_ALL':
			return { ...initialState };
		default:
			return state;
	}
};

export const store = createStore(reducer);
