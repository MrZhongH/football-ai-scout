import {NextResponse} from "next/server";

import {
translateTeamName
}
from "./teamAlias";

const API_URL =
"https://v3.football.api-sports.io";



async function searchTeam(name){


const res =
await fetch(

`${API_URL}/teams?search=${encodeURIComponent(name)}`,

{

headers:{

"x-apisports-key":
process.env.FOOTBALL_API_KEY

},

cache:"no-store"

}

);


const data =
await res.json();


return data.response || [];

}





export async function GET(req){


try{


const {searchParams}=new URL(req.url);


const q =
searchParams.get("q");



if(!q){

return NextResponse.json({

error:"请输入球队"

});

}




// 第一次直接搜索

let result =
await searchTeam(q);




// 没找到

// AI识别

if(result.length===0){


const aiName =
await translateTeamName(q);



result =
await searchTeam(aiName);


}



return NextResponse.json({


keyword:q,


count:
result.length,


teams:

result.map(item=>({

id:item.team.id,

name:item.team.name,

country:item.team.country,

logo:item.team.logo,

venue:item.venue

}))


});



}catch(e){


return NextResponse.json({

error:e.message

});


}


}
