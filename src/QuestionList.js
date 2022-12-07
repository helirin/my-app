import React from 'react';
//haetaan kysymykset Quiz Apista
//otetaan kaikki kysymykset listaan
class QuestionList extends React.Component {
    //konstruktori
    constructor(props) {
        super(props);
        console.log("In QuestinList constructor");
        this.state = {questions: [], aihe:"" };
          //array, johon haetaan koko data
    }

    componentDidMount() {
        console.log("In QuestionList componentDidMount");
        //hakee kysymykset APIsta
        //API puolestaan hakee tiedot SQL Serveriltä tietokannasta
        //fetch('https://localhost:44349/api/Kysy')

        //kun haetaan json tiedostosta, se täytyy olla public-kansiossa
        //ja tarvitaan headerit, muuten samoin
        //
        fetch('data.json'
        ,{
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            }
        })
        //
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ questions: json });
                console.log("Component state has been modified.");
            });
        console.log("Fetch call has been made.");
    }

    //renderoidaan komponentin lahettamat tiedot/näkymä
    render() {
        console.log("In QuestionList render");
        let list = [];
        for (let index = 0; index < this.state.questions.length; index++) {
            const quest = this.state.questions[index];
            //liitetään tiedot listaan
            list.push(<tr key={index}>
            <td><br/><p><b>{index+1}. {quest.question}</b></p>
            <hr></hr>
            <p>{quest.aa}</p>
            <p>{quest.bee}</p>
            <p>{quest.cee}</p>
            <p>{quest.dee}</p> 
            Katso oikea vastaus<div className="vast">{quest.answer}</div>   
            </td> 
            </tr>          
            );
         
        }
        return (
            <div>
               <div className="banner"><h1 class="text-shadow">Tietokilpailukysymyksiä</h1></div>
               <hr className="hr"></hr> 
                <p>Kysymysten määrä yhteensä: {this.state.questions.length}</p>
                <table className="table table-striped table-light">
                   <tbody> 
                {list}
                 </tbody>
                </table>
            </div>);
    }
}

export default QuestionList;