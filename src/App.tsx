import { Paper, styled, Container, Grid, Button } from "@mui/material";
import { useState } from "react";
import { cursorTo } from "readline";
import "./App.css";
import { DigitButton } from "./DigitButton";
import { OperationButton } from "./OperationButton";

const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 15,
}));

const OutPutContainer = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "right",
  padding: theme.spacing(2),
  height: "2em",
  fontSize: "3em",
  overflow: "hidden",
}));

const App = () => {
  const [current, setCurrent] = useState("0");
  const [operation, setOperation] = useState("");
  const [prevValue, setPrevValue] = useState("");
  const [overwrite, setOverwrite] = useState(true);

  const calculate = () => {
    if (!prevValue || !operation) return current;
    const currentValue = parseFloat(current);
    const prevVal = parseFloat(prevValue);

    let result;

    switch (operation) {
      case "/":
        result = prevVal / currentValue;
        break;
      case "*":
        result = prevVal * currentValue;
        break;
      case "-":
        result = prevVal - currentValue;
        break;
      case "+":
        result = prevVal + currentValue;
        break;
    }
    return result;
  };

  const equals = () => {
    const val = calculate();

    setCurrent(`${val}`);
    setPrevValue("");
    setOperation("");
    setOverwrite(true);
  };

  const clear = () => {
    setPrevValue("");
    setOperation("");
    setCurrent("0");
    setOverwrite(true);
  };

  const deleteFunc = () => {
    setCurrent("0");
    setOverwrite(true);
  };

  const percentCalcFunc = () => {
    const currentValue = parseFloat(current);
    setCurrent((currentValue / 100).toString());
  };

  const setDigit = (digit: string) => {
    if (current[0] === "0" && digit === "0") return;

    if (current.includes(".") && digit === ".") return;

    if (overwrite && digit !== ".") {
      setCurrent(digit);
    } else {
      setCurrent(`${current}${digit}`);
    }
    setOverwrite(false);
  };

  const selectOperation = (operation: string) => {
    if (prevValue) {
      const val = calculate();
      setCurrent(`${val}`);
      setPrevValue(`${val}`);
    } else {
      setPrevValue(current);
    }

    setOverwrite(true);
    setOperation(operation);
  };

  return (
    <Container maxWidth="sm">
      <CalculatorBase elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <OutPutContainer>{current}</OutPutContainer>
          </Grid>
          <Grid item container columnSpacing={1}>
            <OperationButton
              operation="AC"
              selectOperation={clear}
              selectedOperation={operation}
            />
            <OperationButton
              operation="C"
              selectOperation={deleteFunc}
              selectedOperation={operation}
            />
            <OperationButton
              operation="%"
              selectOperation={percentCalcFunc}
              selectedOperation={operation}
            />
            <OperationButton
              operation="/"
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <DigitButton digit="7" enterDigit={setDigit} />
            <DigitButton digit="8" enterDigit={setDigit} />
            <DigitButton digit="9" enterDigit={setDigit} />
            <OperationButton
              operation="*"
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <DigitButton digit="4" enterDigit={setDigit} />
            <DigitButton digit="5" enterDigit={setDigit} />
            <DigitButton digit="6" enterDigit={setDigit} />
            <OperationButton
              operation="-"
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <DigitButton digit="1" enterDigit={setDigit} />
            <DigitButton digit="2" enterDigit={setDigit} />
            <DigitButton digit="3" enterDigit={setDigit} />
            <OperationButton
              operation="+"
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <DigitButton digit="0" enterDigit={setDigit} xs={6} />
            <DigitButton digit="1" enterDigit={setDigit} />

            <Grid item xs={3}>
              <Button onClick={equals} fullWidth variant={"contained"}>
                =
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CalculatorBase>
    </Container>
  );
};

export default App;
