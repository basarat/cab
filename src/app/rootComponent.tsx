import * as React from "react";
import {BaseComponent,RaisedButton} from "./material-ui";

export class RootComponent extends BaseComponent<{}, {}>{

    render() {
        return <div>
            <RaisedButton label="Hello World" />
            </div>;
    }

}