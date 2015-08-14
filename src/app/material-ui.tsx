import React = require("react");
let mui = require('material-ui');
export let RaisedButton = mui.RaisedButton;


// http://material-ui.com/#/get-started : 
// Please note that since v0.8.0, you also need to define a theme for components to start working.
let ThemeManager = new mui.Styles.ThemeManager();
function getChildContext() {
    return {
        muiTheme: ThemeManager.getCurrentTheme()
    };
}
let childContextTypes = {
    muiTheme: React.PropTypes.object
};

export class BaseComponent<Props, State> extends React.Component<Props, State>{
    static childContextTypes = childContextTypes;
    getChildContext = getChildContext;
}