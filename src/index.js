import React from 'react'
import ReactDOM  from 'react-dom'

import App from './component/App'
import { store } from './store/index'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import './main.css'

const theme={
    colors:{
      btn_bg_light:"587b7f",
      btn_clr_light:"ffff",
      header_light:"1e2019",
      primary_bg:"d3d0cb"
    }
  }
ReactDOM.render(
<Router>
<Provider store={store}>
<ThemeProvider theme={theme}>
<App />
</ThemeProvider>

</Provider>
</Router>

,document.getElementById('root'))