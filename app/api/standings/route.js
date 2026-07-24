export async function GET(request){

const {searchParams}=new URL(request.url);

const league=
searchParams.get("league");

const season=
2025;


const res=await fetch(

`https://v3.football.api-sports.io/standings?league=${league}&season=${season}`,

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