import './TikTacToe.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class OldTikTacToeContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			winConditions: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6]
			]
		};
	}

	reset = () => {
		this.props.dispatch({ type: 'SET_ALL' });
	};

	checkWin = () => {
		this.state.winConditions.forEach((condition) => {
			let boolClose = condition.every((element) =>
				this.props.winClose.includes(element)
			);
			let boolCircle = condition.every((element) =>
				this.props.winCircle.includes(element)
			);

			if (boolCircle) {
				this.props.dispatch({ type: 'SET_WIN', payload: 'Победил нолик' });
				return;
			}
			if (boolClose) {
				this.props.dispatch({ type: 'SET_WIN', payload: 'Победил крестик' });
				return;
			}
		});

		let bool = this.props.arr.includes(null);
		if (!bool && !this.props.win) {
			this.props.dispatch({ type: 'SET_WIN', payload: 'Ничья' });
		}
	};

	onClickBtn = (i) => {
		const newArr = [...this.props.arr];
		if (newArr[i] !== 'circle' && newArr[i] !== 'close') {
			newArr[i] = this.props.isCircle ? 'circle' : 'close';
			if (newArr[i] === 'close') {
				this.props.dispatch({
					type: 'SET_WIN_CLOSE',
					payload: [...this.props.winClose, i]
				});
				this.props.dispatch({ type: 'SET_ARR', payload: newArr });
				this.props.dispatch({
					type: 'SET_IS_CIRCLE',
					payload: !this.props.isCircle
				});
			} else if (newArr[i] === 'circle') {
				this.props.dispatch({
					type: 'SET_WIN_CIRCLE',
					payload: [...this.props.winCircle, i]
				});
				this.props.dispatch({ type: 'SET_ARR', payload: newArr });
				this.props.dispatch({
					type: 'SET_IS_CIRCLE',
					payload: !this.props.isCircle
				});
			}
			this.checkWin();
		}
	};

	componentDidUpdate() {
		this.checkWin();
	}

	render() {
		return (
			<>
				<h1>Следующий ход у {this.props.isCircle ? 'нолика' : 'крестика'}</h1>
				<div className='wrapper'>
					{this.props.arr.map((elem, i) => {
						return (
							<button
								onClick={() => this.onClickBtn(i)}
								key={i}
								disabled={this.props.win}
							>
								<div className={elem}></div>
							</button>
						);
					})}
				</div>
				{this.props.win ? <h1>{this.props.win}</h1> : null}
				<button onClick={this.reset} className='reset'>
					Начать заново
				</button>
			</>
		);
	}
}
const mapStateToProps = (state) => ({
	isCircle: state.isCircle,
	arr: state.arr,
	win: state.win,
	winCircle: state.winCircle,
	winClose: state.winClose
});

export const OldTikTacToe = connect(mapStateToProps)(OldTikTacToeContainer);
