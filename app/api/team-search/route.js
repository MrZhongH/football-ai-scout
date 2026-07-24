import { translateTeamName } from "./teamAlias";


export async function GET(request){


const {searchParams}=new URL(request.url);


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


// 没找到，调用AI
if(teams.length===0){


const names =
await translateTeamName(keyword);



for(const name of names){


teams =
await searchFootballAPI(name);


if(teams.length>0){
break;
}


}


}



return Response.json({

keyword,

count:teams.length,

teams

});


}
