import { Calendar } from "./pages/calendar"
import { createGlobalStyle } from 'styled-components'

function App() {
  return (
    <>
      <GlobalStyle />
      <Calendar />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
		*{
				margin: 0;
				padding: 0;
        box-sizing: border-box;
		}
    @media print{
    body{
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
`

export default App
