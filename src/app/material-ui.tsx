import React = require("react");
let mui = require('material-ui');
export let RaisedButton = mui.RaisedButton;
export let ThemeManager = new mui.Styles.ThemeManager();


// http://material-ui.com/#/get-started : 
// Please note that since v0.8.0, you also need to define a theme for components to start working.
export function getChildContext() {
    return {
        muiTheme: ThemeManager.getCurrentTheme()
    };
}
export let childContextTypes = {
    muiTheme: React.PropTypes.object
};
