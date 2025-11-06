// https://legacy.reactjs.org/docs/context.html
'use client';
import * as React from 'react';
import {ThemeContext, themes} from './theme-context';
import {ThemedButton, ThemeTogglerButton} from './themed-button';

// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    <div className='flex gap-4'>
      <ThemeTogglerButton>
        Toggle Theme
      </ThemeTogglerButton>

      <ThemedButton>
        Theme
      </ThemedButton>
      
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // The ThemedButton button inside the ThemeProvider
    // uses the theme from state while the one outside uses
    // the default dark theme
    return (
      <div>
        <ThemeContext.Provider value={this.state}>
          <Toolbar/>
        </ThemeContext.Provider>
        <div className='mt-4 p-4 border'
          style={{backgroundColor: this.state.theme.background, color: this.state.theme.foreground}}>
          hello world
        </div>
      </div>
    );
  }
}

export default App;
 