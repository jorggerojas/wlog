import React, { Suspense, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import NoMatch from "./routes/NoMatch";
import App from "./routes/App";
import Sign from "./routes/logIn/Sign";
import Post from "./routes/post/Post";
import User from "./routes/user/User";
import EmptyPost from "./routes/post/components/EmptyPost";
import { GlobalStyle } from "./styles/global";
import { lightTheme, darkTheme } from "./styles/themes";
import t from "typy";
import { loadStorage } from "./config";
const SwitchRouter = () => {
  const [useDarkTheme, setUseDarkTheme] = useState(
    loadStorage("theme") === "true" || false
  );
  const theme = t(useDarkTheme).isTrue ? darkTheme : lightTheme;
  return (
    <div>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle />
          <Suspense fallback={<h1>Loading...</h1>}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <App theme={useDarkTheme} handle={setUseDarkTheme} />
                </Route>
                <Route exact path="/user/:user/post/:id">
                  <Post theme={useDarkTheme} handle={setUseDarkTheme} />
                </Route>
                <Route exact path="/user/:username">
                  <User theme={useDarkTheme} handle={setUseDarkTheme} />
                </Route>
                <Route exact path="/create">
                  <EmptyPost theme={useDarkTheme} handle={setUseDarkTheme} />
                </Route>
                <Route exact path="/sign">
                  <Sign />
                </Route>
                <Route path="*">
                  <NoMatch theme={useDarkTheme} handle={setUseDarkTheme} />
                </Route>
              </Switch>
            </Router>
          </Suspense>
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
};
const theme = loadStorage("theme") === "true" ? darkTheme : lightTheme;
type ThemeType = typeof theme;
export { SwitchRouter };
export type { ThemeType };
