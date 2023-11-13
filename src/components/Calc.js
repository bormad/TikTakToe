import React from 'react';
import styles from './Calc.module.css';

const number = [
	{ value: '9', type: 'number' },
	{ value: '8', type: 'number' },
	{ value: '7', type: 'number' },
	{ value: '6', type: 'number' },
	{ value: '5', type: 'number' },
	{ value: '4', type: 'number' },
	{ value: '3', type: 'number' },
	{ value: '2', type: 'number' },
	{ value: '1', type: 'number' },
	{ value: '0', type: 'number' }
];

const operations = [
	{ value: 'C', type: 'clear' },
	{ value: '-', type: 'minus' },
	{ value: '+', type: 'plus' },
	{ value: '=', type: 'res' }
];

export const Calc = () => {
	const [current, setCurrent] = React.useState('0');
	const [result, setResult] = React.useState('0');
	let [operation, setOperation] = React.useState(null);
	const onClickNumber = value => {
		if (current.length >= 1 && current[0] === '0') {
			setCurrent(current.substring(1, current.length));
		}
		setCurrent(prev => prev + value);
	};

	const onClickOperation = type => {
		if (type === 'clear') {
			setCurrent('0');
			setResult('0');
			operation = null;
		} else if (type === 'minus') {
			setResult(current);
			setCurrent('0');
			setOperation('-');
		} else if (type === 'plus') {
			setResult(current);
			setCurrent('0');
			setOperation('+');
		} else if (type === 'res') {
			setResult(prev => {
				setCurrent(eval(prev + operation + current));
			});
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.presentValue}>{current}</div>
			<div className={styles.wrapper}>
				<div className={styles.number}>
					{number.map(obj => {
						return (
							<button
								onClick={() => onClickNumber(obj.value)}
								className={styles.btn}
								key={obj.value}
							>
								{obj.value}
							</button>
						);
					})}
				</div>
				<div className={styles.operations}>
					{operations.map(obj => {
						return (
							<button
								onClick={() => onClickOperation(obj.type)}
								className={styles.btn}
								key={obj.value}
							>
								{obj.value}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};
