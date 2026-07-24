export async function GET(request){


const {searchParams}=new URL(request.url);


const teams=
searchParams.get("teams");



const res=await fetch(

`https://v3.football.api-sports.io/fixtures/headtohead?h2h=${teams}&last=10`,

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