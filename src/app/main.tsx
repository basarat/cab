import {RootComponent} from "./rootComponent";
import * as React from "react";

// needed for material UI
let injectTapEventPlugin = require("react-tap-event-plugin");

document.addEventListener('DOMContentLoaded', () => {
    React.render(<RootComponent />, document.getElementById('app'));
});
