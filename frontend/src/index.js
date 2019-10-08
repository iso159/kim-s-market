import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import Root from './Root'
import * as serviceWorker from './serviceWorker'
import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();