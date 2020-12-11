import React, { Suspense } from "react";
import {
  Switch,
  Route,
  Link,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import App from "./routes/App";
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
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};
export default SwitchRouter;

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
      <Link to="/">
        <code>Return to the main page</code>
      </Link>
    </div>
  );
}
