


//save the VoterBackGround input into array.

var c = new Array();
var Voteinput ;
var vetoinput;
var hihi;

window.onload=function(){
  // var mb = document.getElementById("b");
  // mb.addEventListener("click", handler);
  // mb.addEventListener("click", handler2);
  document.querySelector('.btn-vBackGround').addEventListener('click',function(){
    var input = document.getElementById('VoterBG').value;
    Inputbackgrounds = input.split(',');
    // c.append(Inputbackgrounds);
    for(var i =0;i<Inputbackgrounds.length;i++){
      if(Inputbackgrounds[i] == 'true') Inputbackgrounds[i] = true;
     if(Inputbackgrounds[i] == 'false') Inputbackgrounds[i] = false;
      if(typeof(Inputbackgrounds[i])==='string'){
      Inputbackgrounds[i]  = parseInt(Inputbackgrounds[i])
     
      }
      
      c[i] = Inputbackgrounds[i];
      
    }

               //modifier
    if(c[3]==false || c[6] < 18) return;
    
    



document.querySelector('.btn-gvbg').addEventListener('click',function(){


  //getVoterBackGround
  
  document.getElementById("displayVoterBackGround").value = input;

var str = " ";
str  = str+ "numsofCar: "+c[0]+''+"\xa0\xa0\xa0\xa0annual_income: "+c[1]+"\xa0\xa0\xa0\xa0isclimateChange: "+c[2]+"\xa0\xa0\xa0\ recievedClimateChangeEducation: "+c[3]
+"\xa0\xa0\xa0\doYouTravelOften: "+c[4]
+"\xa0\xa0\xa0\isMilitary: "+c[5]
+"\xa0\xa0\xa0\age: "+c[6]



  document.getElementById("displayVoterBackGround").value = str;

});









  });

}



//getVoterBackGround

// window.onload=function(){
//   // var mb = document.getElementById("b");
//   // mb.addEventListener("click", handler);
//   // mb.addEventListener("click", handler2);
//   document.querySelector('.btn-gvbg').addEventListener('click',function(){

//     document.getElementById("displayVoterBackGround").value = input;

//     document.getElementById("displayVoterBackGround").value = "numsofCar: "+Inputbackgrounds[0]+"annual_income: "+Inputbackgrounds[1];

//   });

// }






// document.querySelector('.btn-vBackGround').addEventListener('click', function() {
//   console("hello");
 
// });




App = {

  web3Provider: null,
  contracts: {},
  names: new Array(),
  url: 'http://127.0.0.1:7545',

  
  chairPerson:null,
  currentAccount:null,
  init: function() {
    
    $.getJSON('../proposals.json', function(data) {
      var proposalsRow = $('#proposalsRow');
      var proposalTemplate = $('#proposalTemplate');
      for (i = 0; i < data.length; i ++) {
        proposalTemplate.find('.panel-title').text(data[i].name);
        proposalTemplate.find('img').attr('src', data[i].picture);
        proposalTemplate.find('.btn-vote').attr('data-id', data[i].id);

        proposalsRow.append(proposalTemplate.html());
        App.names.push(data[i].name);
      }
    });
    return App.initWeb3();
  },

  initWeb3: function() {
    
        // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider = new Web3.providers.HttpProvider(App.url);
    }
    web3 = new Web3(App.web3Provider);

    ethereum.enable();




    return App.initContract();
  },


  
  initContract: function() {
      $.getJSON('Ballot.json', function(data) {
    // Get the necessary contract artifact file and instantiate it with truffle-contract
    var voteArtifact = data;
    App.contracts.vote = TruffleContract(voteArtifact);

    // Set the provider for our contract
    App.contracts.vote.setProvider(App.web3Provider);


    return App.bindEvents();
  });
  },

  bindEvents: function() {
;
     $(document).on('click', '.btn-VoterWeight', App.handleVoterWeight);
   $(document).on('click', '.btn-vBackGround', App.handlevBackGround);
    $(document).on('click', '.btn-getWbg', App.handleGetVoteWeight);
    $(document).on('click', '.btn-vote', App.handleVote);
    $(document).on('click', '.btn-MostVote', App.handlemostVoteProposal);
    $(document).on('click', '.btn-vetoRight', App.handlevetoRight);
    $(document).on('click', '.btn-winningprop', App.handlewinningprop);
    $(document).on('click', '.btn-final', App.handlefinal);

//
    //
  },


  handlevBackGround:function(event){

    event.preventDefault();

    var voteInstance;
    web3.eth.getAccounts(function(error, accounts) {
       var account = accounts[0];

      App.contracts.vote.deployed().then(function(instance) {
        voteInstance = instance;
   
var para1 = c[0];
var para2 = c[1];
var para3 = c[2];
var para4 = c[3];
var para5 = c[4];
var para6 = c[5];
var para7 = c[6];
 

  return voteInstance.VoterBackground(para1,para2,para3,para4,para5,para6,para7,{from: account});  
      }).then(function(result, err){
            if(result){
            //    console.log(result.receipt.status);
                if(parseInt(result.receipt.status) == 1)
                alert(account + " voting done successfully")
                else
                alert(account + " voting not done successfully due to revert")
            } else {
                alert(account + " voting failed")
            }   
        });
    });
  }
  ,




handleVoterWeight: function(event) {
 
    event.preventDefault();
    var voteInstance;
    web3.eth.getAccounts(function(error, accounts) {
      var account = accounts[0];

      App.contracts.vote.deployed().then(function(instance) {
        voteInstance = instance;
   

  return voteInstance.VoteWeight( {from: account});
        // return voteInstance.VoteWeight( {from: account});

      }).then(function(result, err){
            if(result){
        //        console.log(result.receipt.status);
                if(parseInt(result.receipt.status) == 1)
                alert(account + " voting done successfully")
                else
                alert(account + " voting not done successfully due to revert")
            } else {
                // alert(account + " voting failed")
            }   
        });
    });
  },





  handleGetVoteWeight : function() {
    var num = 0;
    var voteInstance;
    App.contracts.vote.deployed().then(function(instance) {
      voteInstance = instance;

      zzz= voteInstance.getVoteWeight();
       zzz=instance.getVoteWeight().then(function(data){
   
        document.getElementById("displayVoteWeight").value = data.c;

       });
   //Voteinput

    // console.log(zzz);
   // console.log(App.getVoteWeight());
   //console.log( App.getVoteWeight());

//     var  zzz = instance.getVoteWeight();
// console.log(zzz);
      return voteInstance.getVoteWeight();
      
    }).then(function(res){
   // console.log(res);
    //  alert(App.names[res] + "  is the winner ! :)");
    }).catch(function(err){
     // console.log(err.message);
    })
  
},

handleVote:function(event) {
  event.preventDefault();
 // var proposalId = parseInt($(event.target).data('id'));
 
  var voteInstance;
  Voteinput = document.getElementById('voteInput').value;

  web3.eth.getAccounts(function(error, accounts) {
    var account = accounts[0];

    App.contracts.vote.deployed().then(function(instance) {
      voteInstance = instance;
     console.log(Voteinput);
      return voteInstance.vote(Voteinput, {from: account});
    }).then(function(result, err){
          if(result){
              console.log(result.receipt.status);
              if(parseInt(result.receipt.status) == 1)
              alert(account + " voting done successfully")
              else
              alert(account + " voting not done successfully due to revert")
          } else {
              alert(account + " voting failed")
          }   
      });
  });
},

handlemostVoteProposal:function(event) {

  //var num;
  var voteInstance;
  var mostVoteCount;

      App.contracts.vote.deployed().then(function(instance) {
        voteInstance = instance;
  
        mostVoteCount= voteInstance.MostVotedProposal();
        mostVoteCount=instance.MostVotedProposal().then(function(data){
     
          document.getElementById("mostVoteProposal").value = data.c;
        
         });
      
        return voteInstance.MostVotedProposal();
        
      }).then(function(res){
 // console.log(res);
  //  alert(App.names[res] + "  is the winner ! :)");
  }).catch(function(err){
   // console.log(err.message);
  })

},




handlevetoRight : function(event) {
  var num = 0;
  var voteInstance;
  event.preventDefault();

  var voteInstance;
  web3.eth.getAccounts(function(error, accounts) {
    var account = accounts[0];

    App.contracts.vote.deployed().then(function(instance) {
      voteInstance = instance;

      vetoinput = document.getElementById('veto').value;
     
return voteInstance.vetoRight(vetoinput,{from: account});  
    
  }).then(function(res){
 // console.log(res);
  //  alert(App.names[res] + "  is the winner ! :)");
  }).catch(function(err){
   // console.log(err.message);
  })
  
})

},
 



handlewinningprop:function(event) {

if(vetoinput=='false'){
  console.log("president veto the vote.");
  return;
}


  //var num;
  var voteInstance;

  
      App.contracts.vote.deployed().then(function(instance) {
        voteInstance = instance;
  
        winner= voteInstance.winningProposal();
        winner=instance.winningProposal().then(function(data){
     
          document.getElementById("winprop").value = data.c;
          hihi = data.c
         });
       
        return voteInstance.winningProposal();
        
      }).then(function(res){
 // console.log(res);
  //  alert(App.names[res] + "  is the winner ! :)");
  }).catch(function(err){
   // console.log(err.message);
  })

},



//   handlegvbg : function() {
//     //console.log("hello");
//     var voteInstance;
//     App.contracts.vote.deployed().then(function(instance) {
//       voteInstance = instance;
//       return voteInstance.getBackGround();
//     }).then(function(res){
//    // console.log(res);
//     //  alert(App.names[res] + "  is the winner ! :)");
//     }).catch(function(err){
//     //  console.log(err.message);
//     })
//   }
// };

//handlevetoRight



//   handleWinner : function() {
//     console.log("To get winner");
//     var voteInstance;
//     App.contracts.vote.deployed().then(function(instance) {
//       voteInstance = instance;
//       return voteInstance.reqWinner();
//     }).then(function(res){
//     console.log(res);
//       alert(App.names[res] + "  is the winner ! :)");
//     }).catch(function(err){
//       console.log(err.message);
//     })
//   }
// };

handlefinal:function(event) {

  var winner;
  var zz = 2;

  //winner = document.getElementById('mostVoteProposal').value;
        // document.getElementById("disburtion").value = data.c;
   
      if(hihi == 1){
        document.getElementById('disburtion').value 
        = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0RCP 2.5 and fair" +'\n'+
        "lowerIncomeClass____TaxPercentage = 25"+'\n'+"middleIncomeClass___TaxPercentage = 25"+'\n'
        +"midUpperIncomeClassTaxPercentage = 25"+'\n'
        +"UpperIncomeClass___TaxPercentage = 25"+'\n';
      }
      else if(hihi == 2){
        document.getElementById('disburtion').value ="\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0RCP 2.5 and not fair" +'\n'+"lowerIncomeClass____TaxPercentage = 5"+'\n'+"middleIncomeClass___TaxPercentage = 15"+'\n'
        +"midUpperIncomeClassTaxPercentage = 35"+'\n'
        +"UpperIncomeClass___TaxPercentage = 45"+'\n';
       }
     else  if(hihi == 3){
        document.getElementById('disburtion').value ="\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0RCP 4.5 and fair" +'\n'+"lowerIncomeClass____TaxPercentage = 19"+'\n'+"middleIncomeClass___TaxPercentage = 19"+'\n'
        +"midUpperIncomeClassTaxPercentage = 19"+'\n'
        +"UpperIncomeClass___TaxPercentage = 19"+'\n';
       }
       else  if(hihi == 4){
        document.getElementById('disburtion').value ="\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0RCP 4.5 and not fair" +'\n'+"lowerIncomeClass____TaxPercentage = 5"+'\n'+"middleIncomeClass___TaxPercentage = 15"+'\n'
        +"midUpperIncomeClassTaxPercentage = 25"+'\n'
        +"UpperIncomeClass___TaxPercentage = 30"+'\n';
       }
       else  if(hihi == 5){
        document.getElementById('disburtion').value ="\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0RCP 6 and fair" +'\n'+"lowerIncomeClass____TaxPercentage = 13"+'\n'+"middleIncomeClass___TaxPercentage = 13"+'\n'
        +"midUpperIncomeClassTaxPercentage = 13"+'\n'
        +"UpperIncomeClass___TaxPercentage = 13"+'\n';
       }
       else  if(hihi == 6){
        document.getElementById('disburtion').value ="\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0RCP 6 and not fair" +'\n'+"lowerIncomeClass____TaxPercentage = 5"+'\n'+"middleIncomeClass___TaxPercentage = 10"+'\n'
        +"midUpperIncomeClassTaxPercentage = 15"+'\n'
        +"UpperIncomeClass___TaxPercentage = 20"+'\n';
       }
       else  if(hihi == 7){
        document.getElementById('disburtion').value ="\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0RCP 8.5 and fair" +'\n'+"lowerIncomeClass____TaxPercentage = 7"+'\n'+"middleIncomeClass___TaxPercentage = 7"+'\n'
        +"midUpperIncomeClassTaxPercentage = 7"+'\n'
        +"UpperIncomeClass___TaxPercentage = 7"+'\n';
       }
       else  if(hihi == 8){
        document.getElementById('disburtion').value ="\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0RCP 8.5 and notfair" +'\n'+"lowerIncomeClass____TaxPercentage = 3"+'\n'+"middleIncomeClass___TaxPercentage = 5"+'\n'
        +"midUpperIncomeClassTaxPercentage = 7"+'\n'
        +"UpperIncomeClass___TaxPercentage = 10"+'\n';
       }


},
};



$(function(){
  $(window).load(function() {
    App.init();
  });
});
