import React from "react";
import Election from "./contracts/Election.json"
import getWeb3 from "./getWeb3";
import "./App.css";
import $ from 'jquery';
import Navbar from "./__COMPONENTS/Navbar";
class App extends React.Component {
 
    state = {
        C__name :"" ,
          candidateList:[], 
          hasVoted:false , 
           addresses :'0*0',
            loaded:false
        };

    

  componentDidMount = async () => {
    try {
        
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();   
      this.state.addresses = this.accounts[0]

      // Get the contract instance.
      const networkId = await this.web3.eth.net.getId();

      this.Election = new this.web3.eth.Contract(
        Election.abi,
        Election.networks[networkId] && Election.networks[networkId].address,
      );

      
      
      // load the Candidates
        let count = await this.Election.methods.candidatesCount().call();
            for(let i=1 ;i<=count;i++)
            {
                await this.Election.methods.candidates(i).call().then((res)=>{
                    this.state.candidateList.push({id:res.id,name:res.name,voteCount:res.voteCount})
                    })
                }
            console.log(this.state.candidateList)
            
           
            
            this.setState({ loaded:true , contractInstant:Election });
            console.log(this.state.contractInstant)

    }catch(err){
        alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
        console.log(err)
    };


    // Check for vote has been given or not
    await this.Election.methods.voters(this.accounts[0]).call().then((res)=>{
      console.log(res);
        if(res)
        {
          $('form').hide();
          $('#showVotes').show();
          $("#voteStatus").show();
        }
        else{
          $('form').show();
          $("#voteStatus").hide();
        }
    })
  };


        // handle submit for add candidates to elect 
        addCandidatesToElect = async (e)=> {
            e.preventDefault();
            try{
                     let Name = this.state.C__name.toString();
                     console.log(Name)
                        if(Name){   
                            await this.Election.methods.addCandidate(Name).send({from : this.accounts[0]});
                            window.location.reload();
                            alert(`Candidate Added `);
                            
                        }
                        else{
                            alert(`Enter a Name`);
                        }
                    }catch(err)
                    {
                        console.log(err);
                    }
        };


        // handle submit for add 
        submitToVote = async (e)=>{
            
            e.preventDefault();
            let C__id = Number($('#candidatesSelect').val());
            if(C__id)
            {
                try
                {
                   this.instant =  await this.Election.methods.vote(C__id).send({from:this.accounts[0]});
                        if(this.instant)
                        {alert(`Voting has been Done successfully by : ${this.accounts[0]}`)
                       // await this.Election.methods.voters(this.accounts[0])
                        // $('form').hide();
                        // $('#showVotes').show();
                        // $("#voteStatus").show();
                        window.location.reload();
                      } 
                }
                catch(err){
                    console.log(err)
                }
            }
        };

       



  render() {

    if (!this.state.loaded) { return (<div style={{"textAlign":"center" , position:"absolute" , top:"200px", left:"850px" , fontSize:"80px"}}>Loading ...</div>)}

    return (
        <div id="body">
          <div><Navbar/></div>
        <div className="voting_box">
            <h2 style={{padding:"50px"}} >Organised An Election  ⬇ </h2>
            <input id="txt_name" onChange={ (e)=>{this.setState({C__name: e.target.value})}} value={this.state.C__name} required type="text" style={{ textTransform:"uppercase" , padding:"10px" , margin:"10px" , borderRadius:"5px"}} placeholder="Enter the name of the Contestent"></input>
            <button onClick={this.addCandidatesToElect} style={{padding:"10px" , margin:"10px" , background:"blue" , color:"white" , borderRadius:"5px"}}>Add</button>
        </div>
        <div class="container" style={{"width":"650px" , position:"absolute" , top:"200px",left:"730px"}}>
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <h1 class="text-center"><span id="tag"></span>Lok Sabha Election Results</h1>
              <h2 class="text-end" style={{color:"red"}}>Live🔴</h2>
            </div>
            <hr />
            <br />
            <div id="content" >
              <table id="showVotes" class="table" style={{display:"none"}}>
                <thead>
                  <tr>
                    <th scope="col">#CID</th>
                    <th scope="col">Candidate Name</th>
                    <th scope="col">Votes</th>
                  </tr>
                  
                   {
                       this.state.candidateList.map((res)=>{
                          return(
                              <>
                              <tr>
                              <td scope="col">{res.id}</td>
                              <td scope="col">{res.name}</td>
                              <td scope="col">{res.voteCount}</td>
                              </tr>
                              </>
                          )
                       })
                   }
                </thead>
                <tbody id="candidatesResults">
                </tbody>
              </table>
              <hr />
              <form>
                <div class="form-group">
                  <label id ="label" for="candidatesSelect">Select Candidate 🔽</label>
                  <select class="form-control"  id="candidatesSelect"> 
                  
                  {
                     
                      this.state.candidateList.map((item)=>{
                          return(
                                <option value={item.id}>{item.name}</option>
                          )
                      })
                  }             
                  </select>
                </div>
                <button id="btn" onClick={this.submitToVote} class="btn btn-primary">Vote</button>
                <div id="note">Please note that vote once recorded cannot be changed!</div>
                <hr />
              </form>
              <div id="voteStatus" style={{"display": "none"}}>Your vote has been recorded.</div>
            </div>
          </div>
        </div>
      </div>
              <div id="accountAddress" class="text-center"><span >Your Account :</span> {this.state.addresses}</div>
      </div>
    );
  }
}
export default App;
