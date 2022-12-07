import React from 'react'
//haetaan kysymykset Apista
//näytetään kysymykset yksitellen vastattaviksi ja tallennetaan pisteet
class Question extends React.Component {
    //konstruktori
    constructor(props) {
        super(props);
        console.log("In Question constructor");
        this.state = {questions: [], vastaus:"", selitys:"", count:0, i:0 };
          
          this.input = React.createRef();       //create a ref to the DOM node
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.onClickNext = this.onClickNext.bind(this);
    }

    componentDidMount() {
        console.log("In Question componentDidMount");
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
    //kun muutetaan vastaus valikosta
      handleChange(e) {
        this.setState({vastaus: e.target.value});
        console.log("muutos:",e.target.value );
    }
     //submit painiketta painettaessa muutetaan tilaa selitys ja count
      handleSubmit(e){
        e.preventDefault();
        console.log("lähetettiin:", this.state.vastaus);
        console.log("lähetettiin hidden:", this.input.current.value);
        this.input.current.value = this.input.current.value.replace(/\s/g, '');  //otetaan tyhjä tila pois
        if(this.state.vastaus===this.input.current.value){
            let selitys = 'Oikein! ' + this.state.vastaus + ' on oikea vaihtoehto' ;
            let piste = this.state.count + 1;
            //alert('Vastauksesi ' + this.state.vastaus + ' oli oikein');
            this.setState({selitys: selitys});
            this.setState({count: piste});
            console.log("pisteet: ", this.state.count);
        }
        else {
            let selitys = 'Väärin! Oikea vaihtoehto on ' + this.input.current.value;
            //alert('Väärin. Oikea vastaus on ' + this.input.current.value);
            this.setState({selitys: selitys});
        }
        document.getElementById("submit").disabled = true;
    } 
       //siirtyminen seuraavaan kysymykseen
      onClickNext(){
        let nextq = this.state.i + 1;  //lisää nykyiseen indeksiin 1 
        this.setState({i: nextq});      //asetetaan uusi indeksi
        this.setState({selitys: ""});   //asetetaan selityspalkki tyhjäksi
        this.setState({vastaus: ""});   //vastaus tyhjäksi
    }
    
    //renderoidaan komponentin lahettamat tiedot/näkymä
    render() {
        console.log("In Question render");
        //kerätään luontoaiheiset kysymykset listaan
        let list = [];
        for (let index = 0; index < this.state.questions.length; index++) {
            const quest = this.state.questions[index];
                if(quest.topicId ==="Luo" && quest!==false){ 
            //this.setState({oikein: quest.answer});                       //& index<10
                list.push(<tr key={index}>
                <td><br/><p><b>{index+1}. {quest.question}</b></p>
                <hr></hr>
                <p>{quest.aa}</p>
                <p>{quest.bee}</p>
                <p>{quest.cee}</p>
                <p>{quest.dee}</p>
                <form onSubmit={this.handleSubmit}>
                <label>
                Valinta<br/>
                <select value={this.state.vastaus} onChange={this.handleChange}>
                <option value="">Valitse</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C </option>
                <option value="D">D </option>
                </select>&nbsp;&nbsp;
                </label>
                <input name="oikein" type="hidden" ref={this.input} value={quest.answer}/>
                <input type="submit" value="Vastaa" id="submit" className="submit"/>  
                </form>
                <br/>
                <div className="selitys"><b> {this.state.selitys}</b> &nbsp;&nbsp;</div>
                <div><button type="button" className="button" onClick={this.onClickNext}>Seuraava kysymys </button></div> 
                </td> 
                </tr>);         
            }  
            else {
                list.push(<tr><td><p>Kysymyksiä ei ole saatavilla. Kiitos osallistumisesta.</p></td></tr>)
               
            }
        
        }
        list.push(<tr><td><p><b>Kilpailu päättyi. Kiitos osallistumisesta, sait {this.state.count} pistettä</b></p></td></tr>)
        return (
            <div className="sivu">
                
               <div className="banner"><h1 className="text-shadow">Testaa tietosi</h1></div>
               <hr className="hr"></hr> 
                <table className="table table-striped table-light">
                <thead ><tr><th id="viiva"></th></tr></thead>
                   <tbody>
                    <tr><td></td></tr> 
                {list[this.state.i]}
                 </tbody>
                 <tfoot><tr><td></td></tr></tfoot>
                </table>     
                <div className="alapalkki"></div> 
            </div>);
    }
}

export default Question;