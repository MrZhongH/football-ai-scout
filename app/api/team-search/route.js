import {
    translateTeamName
}
from "./teamAlias";



export async function GET(request){


try{


const {
searchParams
}=new URL(request.url);



const keyword =
searchParams.get("q");



if(!keyword){

return Response.json({

error:"请输入球队"

});

}



// 第一次直接搜索

let teams =
await searchFootballAPI(keyword);



// 中文没找到

if(
teams.length===0
){


const names =
await translateTeamName(keyword);



for(
const name of names
){


teams =
await searchFootballAPI(name);



if(
teams.length>0
){

break;

}


}


}



return Response.json({

keyword,

count:
teams.length,

teams


});



}
catch(error){


console.log(error);



return Response.json({

error:
error.message

},
{
status:500
}
);


}


}






async function searchFootballAPI(name){


const url =
`https://v3.football.api-sports.io/teams?search=${encodeURIComponent(name)}`;



const res =
await fetch(
url,
{

headers:{

"x-apisports-key":
process.env.FOOTBALL_API_KEY

}

}

);



const data =
await res.json();



if(
!data.response
){

return [];

}



return data.response.map(item=>({

id:item.team.id,

name:item.team.name,

country:item.team.country,

logo:item.team.logo,

venue:item.venue


}));



}
