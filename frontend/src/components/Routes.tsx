import { Switch } from "@chakra-ui/switch";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LandingPage from "./LandingPage";
import TutorForm from "./TutorForm";

interface Props {}

const Routes: React.FC = (props: Props) => {
  return (
    <Router>
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/tutorSignUp" component={TutorForm} />
    </Switch>
    </Router>
  );
};

export default Routes;
