import React from 'react';
import { Button } from "@app/components/button";
import {ThemeContext} from './theme-context';


function ThemeTogglerButton(props) {
  // The Theme Toggler Button receives not only the theme
  // but also a toggleTheme function from the context
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <Button 
          onClick={toggleTheme}
          style={{backgroundColor: theme.background, color: theme.foreground}}>
          
          {props.children}
        </Button>
      )}
    </ThemeContext.Consumer>
  );
}

class ThemedButton extends React.Component {
  constructor(props) {
    super(props)
    // console.log("this.context.theme", this.context);
  }
  render() {
    let props = this.props;
    let theme = this.context.theme;
    return (
      <Button className=''
        {...props}
        style={{backgroundColor: theme.background, color: theme.foreground}}
      >
        {this.props.children}
      </Button>
    );
  }
}
ThemedButton.contextType = ThemeContext;


export {ThemedButton, ThemeTogglerButton} ;

 