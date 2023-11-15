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
	const [operation, setOperation] = React.useState(null);
	const [clazz, setClazz] = React.useState(false);

	const onClickNumber = value => {
		if (current.length >= 1 && current[0] === '0') {
			setCurrent(current.substring(1, current.length));
		}
		setCurrent(prev => prev + value);
	};

	const calculateExpression = (a, operation, b) => {
		a = Number(a);
		b = Number(b);
		if (operation === '+') {
			return a + b;
		} else {
			return a - b;
		}
	};

	const onClickOperation = type => {
		switch (type) {
			case 'clear':
				setClazz(false);
				setCurrent('0');
				setResult('0');
				break;
			case 'minus':
				setClazz(false);
				setResult(current);
				setCurrent('0');
				setOperation('-');
				break;
			case 'plus':
				setClazz(false);
				setResult(current);
				setCurrent('0');
				setOperation('+');
				break;
			case 'res':
				setClazz(true);
				setCurrent(calculateExpression(result, operation, current));
				break;
			default:
				break;
		}
	};

	return (
		<div className={styles.container}>
			<div
				className={
					clazz
						? styles.presentValue + ' ' + styles.presentValueActive
						: styles.presentValue
				}
			>
				{current}
			</div>
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
