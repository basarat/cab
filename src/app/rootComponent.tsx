import * as React from "react";
import {RaisedButton, getChildContext, childContextTypes} from "./material-ui";

export class RootComponent extends React.Component<{}, {}>{

    static childContextTypes = childContextTypes;
    getChildContext = getChildContext;

    render() {
        return <div>
            <RaisedButton label="Hello World" />
            </div>;
    }

}