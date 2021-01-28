import {
  Switch,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Characters from "./pages/Characters";

export default function MainRoutes(){
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/characters" exact component={Characters} />
		</Switch>
	)
}