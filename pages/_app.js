import { createGlobalStyle, ThemeProvider } from "styled-components";
import "../css/reset.css";
import { MenuContextProvider } from "@components/context/menuContext";
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: black;
    * {
      box-sizing: border-box;
    }
  }
`;

function MyApp({ Component, pageProps }) {
  const theme = {
    space: [
      "4px",
      "8px",
      "12px",
      "16px",
      "20px",
      "24px",
      "32px",
      "40px",
      "48px",
      "56px",
      "64px",
      "72px",
      "80px",
      "92px",
      "120px"
    ]
  };
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MenuContextProvider>
          <Component {...pageProps} />
        </MenuContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
