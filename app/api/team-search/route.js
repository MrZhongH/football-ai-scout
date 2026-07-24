import { teamAlias } from "./teamAlias";


export async function GET(request){


const {searchParams}=new URL(request.url);


let keyword=
searchParams.get("q");


if(!keyword){

return Response.json({
error:"请输入球队"
});

}



keyword=
teamAlias[keyword] || keyword;



const res =
await fetch(

`https://v3.football.api-sports.io/teams?search=${encodeURIComponent(keyword)}`,

{

headers:{

"x-apisports-key":
process.env.FOOTBALL_API_KEY

}

}

);



const data=
await res.json();



return Response.json(data);



}
