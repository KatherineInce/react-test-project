import {ContextProvider} from './context/ContextProvider'
import {Routes, Route} from 'react-router-dom'

import Header from './components/Header'
import List from './components/list-components/List'
import ListDetail from './components/detail-components/ListDetail'
import NotFound from './components/NotFound'

function App() {
  
  return (
    <>
      <Header/>
      <Routes>
        <Route exact path="/" element={<ContextProvider><List /></ContextProvider>}/>
        <Route exact path="/details/:id" element={<ContextProvider><ListDetail /></ContextProvider>}/>
        <Route exact path="*" element={<NotFound />}/>       
      </Routes>
    </>
  )
}

export default App
