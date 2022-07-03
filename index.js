const mySecret = process.env['AWS_SECRET_ACCESS_KEY']
const mySecret1 = process.env['AWS_ACCESS_KEY_ID']
const mySecret2 = process.env['AWS_REGION']
console.log("AWS Comprehend Medical");
var AWS=require("aws-sdk");
require('dotenv').config();


var comprehendmedical=new AWS.ComprehendMedical({
  comprehendmedical:'2018-10-30'
})

async function getDetails(text){
  var params={
    Text:text
 
};

var data = await comprehendmedical.detectEntitiesV2(params).promise();
console.log(data);

var diseases=[];
var identifyDisease='';
for (let entity of data["Entities"]){
  if(entity["Category"]=="MEDICAL_CONDITION"){
    diseases.push(entity["Text"]);
  }
}

var coldSymptoms=['cough','cold','fever','difficulty breathing','breathlessness','sneezing','congestion','sore','chills','fatigue','runny-nose','wateryeyes','bodyache','sinus','loss of smell','smell loss','headache','throat irritation']

  var count=0;
  for (let i=0; i<diseases.length; i++){
   // console.log(diseases[i]);
   if(coldSymptoms.includes(diseases[i])){
  count++
   }
  }
  if(count>=5){
    identifyDisease='person has cold'
  }
  else{
    identifyDisease='person might or might not have cold'
  }
return("identify diseases are:" + diseases.join(", ") + ". Therefore we can conclude that " + identifyDisease + "." );
}

async function main(text){
  var diseases=await getDetails(text);
  console.log("Getting Details......\n");
  console.log(diseases);
}

// main('Pt is 87 yo woman, highschool teacher with past medical history that includes- status post cardiac catheterization in April 2019.She presents today with palpitations and chest pressure.HPI : Sleeping trouble on present dosage of Clonidine. Severe Rash  on face and leg, slightly itchy  Meds : Vyvanse 50 mgs po at breakfast daily, Clonidine 0.2 mgs -- 1 and 1 / 2 tabs po qhs HEENT : Boggy inferior turbinates, No oropharyngeal lesion ');

main('Maithili is 27 yr old woman, software developer.HPI: She is experiencing cough, cold , fever of 104F and having difficulty breathing. Meds: NyQuil 500gm at breakfast,Mucinex DM 40gms at lunch HEENT: sneezing, congestion and sorethroat');


