import React from 'react'
import ReactDOM  from 'react-dom'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import App from './component/App'
import { store } from './store/index'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import './main.css'
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme={
    colors:{
      btn_bg_light:"587b7f",
      btn_clr_light:"ffff",
      header_light:"1e2019",
      primary_bg:"d3d0cb"
    }
  }

  TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
  root.render(
<Router>
<Provider store={store}>
<ThemeProvider theme={theme}>
<App />
</ThemeProvider>

</Provider>
</Router>

)