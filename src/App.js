import React, { useState } from 'react';
import './App.css';

function CalcButton({ label, onClick }) {
  return (
    <button className="CalcButton" onClick={onClick}>
      {label}
    </button>
  );
}

function CalcDisplay({ display }) {
  return <div className="CalcDisplay">{display}</div>;
}

export default function App() {
  const [display, setDisplay] = useState('0');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState(null);
  const [decimalClicked, setDecimalClicked] = useState(false);

  const handleNumberClick = (value) => {
    if (operator === null) {
      setNum1((prevNum) => prevNum + value);
      setDisplay((prevDisplay) => (prevDisplay === '0' ? value : prevDisplay + value));
    } else {
      setNum2((prevNum) => prevNum + value);
      setDisplay((prevDisplay) => prevDisplay + value);
    }
  };

  const handleOperatorClick = (value) => {
    setOperator(value);
    setDisplay(value);
  };

  const handleDecimalClick = () => {
    if (!decimalClicked) {
      if (operator === null) {
        setNum1((prevNum) => prevNum + '.');
        setDisplay((prevDisplay) => prevDisplay + '.');
      } else {
        setNum2((prevNum) => prevNum + '.');
        setDisplay((prevDisplay) => prevDisplay + '.');
      }
      setDecimalClicked(true);
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setNum1('');
    setNum2('');
    setOperator(null);
    setDecimalClicked(false);
  };

  const handleNegation = () => {
    setDisplay((prevDisplay) => {
      if (prevDisplay === '0') {
        return prevDisplay; // If the display is '0', no need to negate
      } else if (prevDisplay[0] === '-') {
        return prevDisplay.slice(1); // Remove the '-' sign if already negated
      } else {
        return '-' + prevDisplay; // Add '-' sign if not negated
      }
    });
  };
  
  const calculateResult = () => {
    let result;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    switch (operator) {
      case '+':
        result = n1 + n2;
        break;
      case '-':
        result = n1 - n2;
        break;
      case 'x':
        result = n1 * n2;
        break;
      case '÷':
        if (n2 !== 0) {
          result = n1 / n2;
        } else {
          result = 'Error';
        }
        break;
      case 'EXP':
          result = Math.pow(n1, n2);
        break;
      case 'MOD':
          result = n1 % n2;
          break;
      default:
        result = 'Error';
    }
    setDisplay(result.toString());
    setNum1(result.toString());
    setNum2('');
    setOperator(null);
    setDecimalClicked(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Johann Alecksandrei G. Factora - CPE 2A</h1>
      </header>
      <div className="CalcContainer">
        <CalcDisplay display={display} />
        <div className="ButtonContainer">
          <CalcButton label={'÷'} onClick={() => handleOperatorClick('÷')} />
          <CalcButton label={'7'} onClick={() => handleNumberClick('7')} />
          <CalcButton label={'8'} onClick={() => handleNumberClick('8')} />
          <CalcButton label={'9'} onClick={() => handleNumberClick('9')} />
          <CalcButton label={'x'} onClick={() => handleOperatorClick('x')} />
          <CalcButton label={'4'} onClick={() => handleNumberClick('4')} />
          <CalcButton label={'5'} onClick={() => handleNumberClick('5')} />
          <CalcButton label={'6'} onClick={() => handleNumberClick('6')} />
          <CalcButton label={'-'} onClick={() => handleOperatorClick('-')} />
          <CalcButton label={'1'} onClick={() => handleNumberClick('1')} />
          <CalcButton label={'2'} onClick={() => handleNumberClick('2')} />
          <CalcButton label={'3'} onClick={() => handleNumberClick('3')} />
          <CalcButton label={'+'} onClick={() => handleOperatorClick('+')} />
          <CalcButton label={'.'} onClick={() => handleDecimalClick()} />
          <CalcButton label={'0'} onClick={() => handleNumberClick('0')} />
          <CalcButton label={'='} onClick={calculateResult} />
          <CalcButton label={'NEG'} onClick={handleNegation} />
          <CalcButton label={'EXP'} onClick={() => handleOperatorClick('EXP')} />
          <CalcButton label={'MOD'} onClick={() => handleOperatorClick('MOD')} />
          <CalcButton label={'CLR'} onClick={clearDisplay} />
        </div>
      </div>
    </div>
  );
}