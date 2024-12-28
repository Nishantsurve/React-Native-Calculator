import React, { useState } from "react";
import { StyleSheet, View, TextInput, StatusBar, Text, Switch } from "react-native";
import Button from "./Button";

const Home = () => {
  const [input, setInput] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(true); // State for theme

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  

  const caculate = () => {

    if (!input) {
      setInput("0");
      return;
    }
    
    let actualString = "";
    for (let a of input) {
      if (a === "x") actualString = actualString + "*";
      else actualString += a;
    }

    const last = actualString.charAt(actualString.length - 1);
    if (
      last === "/" ||
      last === "+" ||
      last === "-" ||
      last === "x" ||
      last === "."
    ) {
      actualString = actualString.slice(0, actualString.length - 1);
    }

    try {
      const result = eval(actualString) + "";
      setInput(result);
    } catch (error) {
      setInput("Error");
    }
  };

  const addOperator = (op) => {
    let exp = input;
    const last = exp.charAt(exp.length - 1);
    if (last === "x" || last === "+" || last === "-" || last === "/") {
      exp = exp.slice(0, -1) + op;
      setInput(exp);
    } else {
      exp = exp + op;
      setInput(exp);
    }
  };

  const clear = () => {
    setInput(input.slice(0, input.length - 1));
  };

  const percentage = () => {
    if (!input) {
      setInput("0");
      return;
    }

    let exp = input;
    let last = input.charAt(input.length - 1);
    if (last === "/" || last === "x" || last === "-" || last === "+") {
      exp = exp.slice(0, exp.length - 1);
    }
    setInput(eval(exp + "/100") + "");
  };

  // Dynamic styles based on theme
  const currentStyles = isDarkTheme ? styles.dark : styles.light;

  return (
    <View style={[styles.container, currentStyles.container]}>
      <View style={styles.themeSwitch}>
        <Text style={currentStyles.themeText}>
          {isDarkTheme ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
      <TextInput
        maxLength={10}
        value={input}
        keyboardType="number-pad"
        showSoftInputOnFocus={false}
        style={[styles.input, currentStyles.input]}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Button onPress={() => setInput("")} backgroundColor="red">
            AC
          </Button>
          <Button onPress={clear} backgroundColor="red">
            C
          </Button>
          <Button onPress={percentage} backgroundColor="purple">
            %
          </Button>
          <Button onPress={() => addOperator("/")} backgroundColor="#ffa31a">
            /
          </Button>
        </View>
        <View style={styles.row}>
          <Button onPress={() => setInput(input + "7")}>7</Button>
          <Button onPress={() => setInput(input + "8")}>8</Button>
          <Button onPress={() => setInput(input + "9")}>9</Button>
          <Button onPress={() => addOperator("x")} backgroundColor="#ffa31a">
            x
          </Button>
        </View>
        <View style={styles.row}>
          <Button onPress={() => setInput(input + "4")}>4</Button>
          <Button onPress={() => setInput(input + "5")}>5</Button>
          <Button onPress={() => setInput(input + "6")}>6</Button>
          <Button onPress={() => addOperator("-")} backgroundColor="#ffa31a">
            -
          </Button>
        </View>
        <View style={styles.row}>
          <Button onPress={() => setInput(input + "1")}>1</Button>
          <Button onPress={() => setInput(input + "2")}>2</Button>
          <Button onPress={() => setInput(input + "3")}>3</Button>
          <Button onPress={() => addOperator("+")} backgroundColor="#ffa31a">
            +
          </Button>
        </View>
        <View style={styles.row}>
          <Button onPress={() => setInput(input + "0")} width={160}>
            0
          </Button>
          <Button onPress={() => setInput(input + ".")}>.</Button>
          <Button onPress={caculate} backgroundColor="#008000">
            =
          </Button>
        </View>
      </View>
      <Text style={[styles.footer, currentStyles.footer]}>Calc by Nishant Surve</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: StatusBar.currentHeight + 20,
    width: "100%",
  },
  input: {
    width: "100%",
    height: "30%",
    fontSize: 75,
    textAlign: "right",
    fontWeight: "300",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  themeSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  footer: {
    position: "absolute",
    bottom: 2,
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  dark: {
    container: {
      backgroundColor: "black",
    },
    input: {
      color: "white",
    },
    themeText: {
      color: "white",
    },
    footer: {
      color: "gray",
    },
  },
  light: {
    container: {
      backgroundColor: "white",
    },
    input: {
      color: "black",
    },
    themeText: {
      color: "black",
    },
    footer: {
      color: "black",
    },
  },
});

export default Home;