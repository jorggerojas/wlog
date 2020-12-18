import React, { Suspense } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NoMatch from "./routes/NoMatch";
import App from "./routes/App";
import Sign from "./routes/logIn/Sign";
import Post from "./routes/post/Post";
import User from "./routes/user/User";
import EmptyPost from "./routes/post/components/EmptyPost";
const SwitchRouter = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Router>
        <Switch>
          <Route exact path="/users/:user/post/:id">
            <Post />
          </Route>
          <Route exact path="/">
            <App />
          </Route>
          <Route exact path="/user/:username">
            <User />
          </Route>
          <Route exact path="/create">
            <EmptyPost />
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
