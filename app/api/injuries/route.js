export async function GET(request){


const {searchParams}=new URL(request.url);


const team=
searchParams.get("team");



const res=await fetch(

`https://v3.football.api-sports.io/injuries?team=${team}`,

{

headers:{
"x-apisports-key":
process.env.FOOTBALL_API_KEY
}

}

);


const data=await res.json();


return Response.json(data);


}