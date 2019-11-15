pragma solidity >=0.4.22 <0.6.0;
contract ReduceCo2Ballot {

//proposal 1    2.5 and fair
//proposal 2    2.5 and not fair
//proposal 3    4.5 and fair
//proposal 4    4.5 and not fair
//proposal 5    6 and fair
//proposal 6    6 and not fair
//proposal 7    8.5 and fair
//proposal 8    8.5 and notfair

 
    struct Voter {
        uint weight;
        bool voted;
        uint8 vote;
        address delegate;
     uint  Annual_income; //**//           //what is the annual_income of the vote? we know their social class by this.
     uint  numsOfCarsOwned; //**//        //how many cars does the vote owned?
     bool climateChangeOrNot;               //does the vote believe on climate change?
     bool recievedClimateChangeEducation;     // does the voter ever recieved some education about the climate change?
     bool doYouTravelOften ;                 //does the voter travel place to place oftenly? 
     bool isMilitary;                       //does the vote serve in the Military ?
     bool isSurvey;                        //does this person already fill out the Survey?
      uint finalVoteWeight;  //**//
      uint age;
    }
  
    
    
    struct Proposal {
        uint voteCount;
        bool president_appoval;
        uint winnerProposal;
      
    }
    
    
    address chairperson;
    
    
    
    mapping(address => Voter) voters;    // czx* this is hashtable
    mapping(address => Proposal)proposal; // ni jia delegate
    Proposal[] proposals;
    uint8  temp;
   


    /// Create a new ballot with $(_numProposals) different proposals.
    constructor(uint8 _numProposals) public {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        proposals.length = _numProposals;
    
    }

 modifier requireBackGround() 

    {   Voter storage sender = voters[msg.sender];          //require voter must to fill out the background Survey before they can do
                                                            // anything else
        require(sender.isSurvey == true);  
        
      _; 
    } 
    
    
    
     modifier require_Knownlege_of_CC () 

    {   Voter storage sender = voters[msg.sender];          //require voter must already recieved climate change education
                                        
        require(sender.recievedClimateChangeEducation == true);  
      _; 
    } 
    
    
      modifier isEighteen () 

    {   Voter storage sender = voters[msg.sender];          //require voter must be eighteen or above to vote
                                                           
        require(sender.age >= 18);  
      _; 
    } 



     modifier onlychair() 
     {require(msg.sender == chairperson);
      _;
     }


    modifier presidentAppoval () 

    {   Proposal storage p = proposal[chairperson];
                                                           
        require(p.president_appoval == true);  
      _; 
    } 
    
    
    
    
    
    
    
    
  function vetoRight(bool president_appoval) onlychair public {    // the chairman (U.S president) have right to veto the final vote result. 
     
  //
     Proposal storage sender = proposal[chairperson];
     Voter storage voter = voters[msg.sender];
    sender.president_appoval = president_appoval;
    
    if(president_appoval == true) {
        sender.president_appoval = president_appoval;
        return;
    }
   
     else  {
            sender.president_appoval = false;
             sender.voteCount = 0;
          
            return;
     
     }
  }



  //president will look at the result to see if veto or not
 
  
 function MostVotedProposal() view public returns(uint mostVotedProposal){  
     
     mostVotedProposal = temp;
   return mostVotedProposal;
     
 }
 
 
  function carbonTaxOnProduct()presidentAppoval public view returns(uint lowerIncomeClass____TaxPercentage, uint middleIncomeClass___TaxPercentage,
  uint midUpperIncomeClassTaxPercentage, uint UpperIncomeClass___TaxPercentage)   {
      uint FinalVoteResult = temp;
    
    if(FinalVoteResult == 1){  
        lowerIncomeClass____TaxPercentage = 25;
        middleIncomeClass___TaxPercentage = 25;
        midUpperIncomeClassTaxPercentage = 25;
        UpperIncomeClass___TaxPercentage =  25;
        
 return(lowerIncomeClass____TaxPercentage,middleIncomeClass___TaxPercentage,midUpperIncomeClassTaxPercentage,UpperIncomeClass___TaxPercentage);
    }
    
    else if(FinalVoteResult == 2){
        lowerIncomeClass____TaxPercentage = 5;
        middleIncomeClass___TaxPercentage = 15;
        midUpperIncomeClassTaxPercentage = 35;
        UpperIncomeClass___TaxPercentage =  45;
 return(lowerIncomeClass____TaxPercentage,middleIncomeClass___TaxPercentage,midUpperIncomeClassTaxPercentage,UpperIncomeClass___TaxPercentage);
    }
    
    else if(FinalVoteResult == 3){
        lowerIncomeClass____TaxPercentage = 19;
        middleIncomeClass___TaxPercentage = 19;
        midUpperIncomeClassTaxPercentage = 19;
        UpperIncomeClass___TaxPercentage =  19;
 return(lowerIncomeClass____TaxPercentage,middleIncomeClass___TaxPercentage,midUpperIncomeClassTaxPercentage,UpperIncomeClass___TaxPercentage);
    }
    
    else if(FinalVoteResult == 4){
         lowerIncomeClass____TaxPercentage = 5;
        middleIncomeClass___TaxPercentage = 15;
        midUpperIncomeClassTaxPercentage = 25;
        UpperIncomeClass___TaxPercentage =  30;
         return(lowerIncomeClass____TaxPercentage,middleIncomeClass___TaxPercentage,midUpperIncomeClassTaxPercentage,UpperIncomeClass___TaxPercentage);
    }
    
    else if(FinalVoteResult == 5){
        lowerIncomeClass____TaxPercentage = 13;
        middleIncomeClass___TaxPercentage = 13;
        midUpperIncomeClassTaxPercentage = 13;
        UpperIncomeClass___TaxPercentage =  13;
 return(lowerIncomeClass____TaxPercentage,middleIncomeClass___TaxPercentage,midUpperIncomeClassTaxPercentage,UpperIncomeClass___TaxPercentage);
    }
    
     else if(FinalVoteResult == 6){
        lowerIncomeClass____TaxPercentage = 5;
        middleIncomeClass___TaxPercentage = 10;
        midUpperIncomeClassTaxPercentage = 15;
        UpperIncomeClass___TaxPercentage =  20;
  return(lowerIncomeClass____TaxPercentage,middleIncomeClass___TaxPercentage,midUpperIncomeClassTaxPercentage,UpperIncomeClass___TaxPercentage);
    }
        
    else if(FinalVoteResult == 7){
        lowerIncomeClass____TaxPercentage = 7;
        middleIncomeClass___TaxPercentage = 7;
        midUpperIncomeClassTaxPercentage = 7;
        UpperIncomeClass___TaxPercentage =  7;
return(lowerIncomeClass____TaxPercentage,middleIncomeClass___TaxPercentage,midUpperIncomeClassTaxPercentage,UpperIncomeClass___TaxPercentage);
        
    }
    else if(FinalVoteResult == 8){
        lowerIncomeClass____TaxPercentage = 3;
        middleIncomeClass___TaxPercentage = 5;
        midUpperIncomeClassTaxPercentage = 7;
        UpperIncomeClass___TaxPercentage =  10; 
return(lowerIncomeClass____TaxPercentage,middleIncomeClass___TaxPercentage,midUpperIncomeClassTaxPercentage,UpperIncomeClass___TaxPercentage);
    }
    
    
    } 
    
 

    function VoterBackground (uint numsofCar, uint annual_income, bool isclimateChange,bool recievedClimateChangeEducation,
bool doYouTravelOften, bool isMilitary, uint age) public {
        Voter storage sender = voters[msg.sender];
     
        sender.numsOfCarsOwned = numsofCar;
        sender.Annual_income = annual_income;
        sender.climateChangeOrNot = isclimateChange;
        sender.recievedClimateChangeEducation = recievedClimateChangeEducation;
        sender.doYouTravelOften = doYouTravelOften;
        sender.isMilitary = isMilitary;
        sender.isSurvey = true;                // already fill out the background Survey;
        sender.age = age;
        
    }
    

     function getBackGround()requireBackGround  view public returns(uint numsofCar,uint annualIncome,bool isClimateChangeBeliver, 
    bool recievedClimateChangeEducation, bool doesVoterTravelOften, bool isMilitary, uint VoterAge)  {
         Voter storage sender = voters[msg.sender];
         numsofCar = sender.numsOfCarsOwned;
         annualIncome = sender.Annual_income;
         isClimateChangeBeliver = sender.climateChangeOrNot;
         recievedClimateChangeEducation = sender.recievedClimateChangeEducation;
         doesVoterTravelOften = sender.doYouTravelOften;
         isMilitary    = sender.isMilitary;
         VoterAge = sender.age;
         
         
 return(numsofCar, annualIncome, isClimateChangeBeliver, recievedClimateChangeEducation, doesVoterTravelOften, isMilitary, VoterAge);
 
        
     }
     
      
     
     
    function VoteWeight () requireBackGround  public{
        Voter storage sender = voters[msg.sender];
        uint carWeight = 0;
        uint annual_income_weight = 0;
        uint cc_Beliver_orNot_weight = 0;
        uint travel_often_Weight = 0;
        uint isMilitary_Weight = 0;
        
        
        if(sender.age < 18 || sender.recievedClimateChangeEducation==false ) return;
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        
        
        if(sender.numsOfCarsOwned > 2)     carWeight = 0;    
        
        else      carWeight = 1;
        
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        
        if(sender.Annual_income < 30000)  annual_income_weight = 3;  //lower class
        
        else if(sender.Annual_income > 30000 && sender.Annual_income < 90000) annual_income_weight=2; // middle class
        
        
        else if(sender.Annual_income > 90000 &&  sender.Annual_income<130000) annual_income_weight = 1; //mid-upper class
        
        
        else  annual_income_weight = 0;    // real upper class
        
        
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if(sender.climateChangeOrNot == true)  cc_Beliver_orNot_weight = 2;
        
        else cc_Beliver_orNot_weight = 1;
        
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if(sender.doYouTravelOften == true)  travel_often_Weight = 2;
        
        else travel_often_Weight =1;
        
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if(sender.isMilitary == true)  isMilitary_Weight = 1;
        
        else isMilitary_Weight = 0;
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    uint temp =  (carWeight + annual_income_weight + isMilitary_Weight - travel_often_Weight) * cc_Beliver_orNot_weight;
    
    if(temp<=0){        // if after voteWeight and the weight of vote is less or equal to zero.
        return; 
    }  
    
    else sender.finalVoteWeight = temp;   
  
    }
  
 function getVoteWeight() requireBackGround require_Knownlege_of_CC isEighteen view public returns(uint){
     Voter storage sender = voters[msg.sender];
     return sender.finalVoteWeight;
     
 }

    /// Give $(toVoter) the right to vote on this ballot.
    /// May only be called by $(chairperson).
    function giveRightToVote(address toVoter) public {
        if (msg.sender != chairperson || voters[toVoter].voted) return;
        voters[toVoter].weight = 1;
    }

    /// Delegate your vote to the voter $(to).
    function delegate(address to) public {
        Voter storage sender = voters[msg.sender]; // assigns reference
        if (sender.voted) return;
        while (voters[to].delegate != address(0) && voters[to].delegate != msg.sender)
            to = voters[to].delegate;
        if (to == msg.sender) return;
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegateTo = voters[to];
        if (delegateTo.voted)
            proposals[delegateTo.vote].voteCount += sender.weight;
        else
            delegateTo.weight += sender.weight;
    }

    /// Give a single vote to proposal $(toProposal).
    function vote(uint8 toProposal) requireBackGround isEighteen require_Knownlege_of_CC  public {
        
        if(toProposal>8 || toProposal == 0 ) return; //must be 1 of proposals out of 8
        
        Voter storage sender = voters[msg.sender];
        if (sender.voted || toProposal >= proposals.length) return;
        sender.voted = true;
        sender.vote = toProposal;
        proposals[toProposal].voteCount += sender.finalVoteWeight;
        
        
        
        Proposal storage p = proposal[chairperson];
        p.president_appoval = true;
        temp = winningProposal();
        p.president_appoval = false;
    }


    function winningProposal()presidentAppoval  public view returns (uint8 _winningProposal) {
        
        uint256 winningVoteCount = 0;
        for (uint8 prop = 0; prop < proposals.length; prop++){
       
            if (proposals[prop].voteCount > winningVoteCount) {
                winningVoteCount = proposals[prop].voteCount;
                _winningProposal = prop;
            }
    }
}

}
