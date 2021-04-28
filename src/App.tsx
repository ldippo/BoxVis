import "./styles.css";
import React from "react";
import faker from "faker";
import slugify from "slugify";
import { motion, AnimatePresence, MotionStyle } from "framer-motion";
import useDimensions from "react-use-dimensions";
const colors = [
  // Neon Yellow:
  // "#FFFF00",
  // "#FFFF33",
  // "#F2EA02",
  "#E6FB04",
  //Neon Red:
  // "#FF0000",
  "#FD1C03",
  // "#FF3300",
  "#FF6600",
  //Neon Green:
  "#00FF00",
  // "#00FF33",
  // "#00FF66",
  "#33FF00",
  //Neon Blue:
  // "#00FFFF",
  // "#099FFF",
  // "#0062FF",
  "#0033FF",
  //Neon Pink:
  // "#FF00FF",
  // "#FF00CC",
  // "#FF0099",
  "#CC00FF",
  //Neon Purple:
  // "#9D00FF",
  "#CC00FF",
  // "#6E0DD0",
  "#9900FF"
];

const TEST_DATA = Array(30)
  .fill(0)
  .map((x, i) => {
    faker.seed(i);
    const p = faker.commerce.price();
    const quantity = faker.random.number({ min: 1, max: 100 });
    const color = faker.random.arrayElement(colors);
    return {
      tsymbol: faker.company.companyName().slice(0, 3).toUpperCase(),
      price: p,
      quantity,
      value: p * quantity,
      color
    };
  })
  .sort((a, b) => b.value - a.value);

const sum = TEST_DATA.reduce((acc, cur) => acc + cur.value, 0);

const MINSIZE = 105;

export default function App() {
  const sharedStyles: MotionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: "0 0 auto",
    color: "white",
    background: "transparent",
    borderStyle: "solid",
    borderWidth: 3,
    margin: 0,
    boxSizing: "border-box",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };
  const containerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "flex-start",
    alignContent: "flex-start"
  };
  const [ref, dimensions] = useDimensions();
  const pct = React.useMemo(
    () =>
      TEST_DATA.map((t) => ({
        ...t,
        s: (t.value / sum) * Math.min(dimensions.width, dimensions.height) * 4
      })).filter((t) => true),
    [dimensions]
  );
  const notShown = Math.abs(pct.length - TEST_DATA.length);
  return (
    <div ref={ref} style={containerStyle}>
      {pct.map((t, i) => {
        return (
          <AnimatePresence>
            <motion.div
              layout
              initial={{ x: -10, y: -10, opacity: 0, scale: 1.5 }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  delay: (i / 1000) * 50 + 1
                }
              }}
              style={{
                width: t.s,
                height: t.s,
                ...sharedStyles,
                color: "white",
                textAlign: "center",
                borderColor: t.color,
                fontSize: t.s + "%"
              }}
            >
              <div
                style={{
                  fontWeight: 100,
                  padding: 16
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {t.tsymbol}
                </div>
                <div>${t.value}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        );
      })}
      {notShown && (
        <AnimatePresence>
          <motion.div
            layout
            initial={{ x: -10, y: -10, opacity: 0, scale: 1.5 }}
            animate={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              transition: {
                delay: (pct.length / 1000) * 50 + 1
              }
            }}
            style={{
              width: MINSIZE,
              height: MINSIZE,
              ...sharedStyles,
              fontSize: "75%"
            }}
          >
            <>
              <div>+{notShown} Others</div>
            </>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
