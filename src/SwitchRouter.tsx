import React, { Suspense } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NoMatch from "./NoMatch";
import App from "./routes/App";
import Sign from "./routes/logIn/Sign";
import Post from "./routes/post/Post";
import User from "./routes/user/User";
const SwitchRouter = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Router>
        <Switch>
          <Route path="/post/:id">
            <Post />
          </Route>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/user/:username">
            <User />
          </Route>
          <Route path="/sign">
            <Sign />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};
export default SwitchRouter;
