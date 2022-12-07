import React, { useState } from 'react'
import QuestionList from './QuestionList'
import Question from './Question'
//import ReactDOM from 'react-dom'

const Home = () => (
    <div className="sivu">
        <div className="banner"> <h1 className="text-shadow">Tietokilpailu</h1> </div>
        <div className="reuna"><br/><p>Tämä on tietokilpailu-demo, joka on toteutettu React-ohjelmistokehyksen avulla. Demoa varten 
            on tehty myös backend API, joka tuottaa SQL-tietokannasta haetut tietokilpailukysymykset json-muodossa. 
            Mutta API ei ole enää käytettvissä, joten se on korvattu tässä versiossa json-tiedostolla.
            Kysymysten aiheet liittyvät luontoon.
         </p>
         <p>Sovellus sisältää kaksi erilaista toimintoa. Lista-painikkeesta saa kaikki tietokannassa olevat kysymykset esiin listana. 
           Listan avulla voi pitää vaikka kotitietokilpailun. Kilpailu-painikkeen takaa löytyy 10 kysymyksen testi, 
           jossa voin testata tietojaan luonnosta.</p>
           <p> <img src={"tammi3.jpg"} className="image" alt="tammi" /></p>
        </div>
    </div>
  )
  
  
  const RouterApp = () => {
    const [page, setPage] = useState('home')
  
   const  toPage = (page) => (event) => {
      event.preventDefault()
      setPage(page)
    }
  
    const content = () => {
      if (page === 'home') {
        return <Home />
      } else if (page === 'lista') {
        return <QuestionList />
      } else if (page === 'kilpailu') {
        return <Question />
      }
    }
  
    const padding = {
      padding: 5
    }
  
    return (
      <div>
        <div className="navipalkki">
          <button onClick={toPage('home')} style={padding} className="navi">
            Etusivu
          </button>
          <button onClick={toPage('lista')} style={padding} className="navi">
            Lista
          </button>
          <button onClick={toPage('kilpailu')} style={padding} className="navi">
            Kilpailu
          </button>
        </div>
  
        {content()}
      </div>
    )
  }
  export default RouterApp;