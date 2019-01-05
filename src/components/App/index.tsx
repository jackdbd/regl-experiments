import React from "react";
import { RouteComponentProps } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BatchRendering from "../BatchRendering";
import Bunny from "../Bunny";
import Home from "../Home";
import NoMatch from "../NoMatch";
import OneShotRendering from "../OneShotRendering";

class App extends React.Component {
  public render() {
    const rgbColors = [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]];
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route
            exact={true}
            path="/01"
            render={() => (
              <OneShotRendering
                drawingBufferHeight={500}
                drawingBufferWidth={500}
                rgbColors={rgbColors}
                scale={1.0}
              />
            )}
          />
          <Route
            exact={true}
            path="/02"
            render={() => (
              <BatchRendering
                alpha={1.0}
                drawingBufferHeight={500}
                drawingBufferWidth={500}
              />
            )}
          />
          <Route exact={true} path="/03" render={() => <Bunny />} />
          <Route
            render={(props: RouteComponentProps) => <NoMatch {...props} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
