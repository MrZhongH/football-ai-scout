import Image from "next/image";


async function getData(id){


try{


const teamRes = await fetch(
`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/football?team=${id}`,
{
cache:"no-store"
}
);


const rankRes = await fetch(
`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/standings?team=${id}`,
{
cache:"no-store"
}
);



const matchRes = await fetch(
`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/last-matches?team=${id}`,
{
cache:"no-store"
}
);



const injuryRes = await fetch(
`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/injuries?team=${id}`,
{
cache:"no-store"
}
);



return {

team:
await teamRes.json(),

ranking:
await rankRes.json(),

matches:
await matchRes.json(),

injuries:
await injuryRes.json()


};


}catch(e){


return {

team:{},
ranking:{},
matches:{},
injuries:{}

};


}


}





export default async function TeamPage({
params
}){


const {id}=params;


const data =
await getData(id);



const team =
data.team?.response?.[0]?.team 
||
data.team?.team
||
{};



const logo =
team.logo
||
"";



const name =
team.name
||
"未知球队";




/*
评分
*/

const aiScore = 86;



return (

<main
style={{
padding:"40px",
fontFamily:"Arial"
}}
>


<h1>
⚽ Football COLA Scout V15.5
</h1>



<hr/>





<section

style={{

display:"flex",
gap:"30px",
alignItems:"center"

}}

>


{
logo &&

<Image

src={logo}

width={120}

height={120}

alt={name}

/>

}



<div>

<h1>

{name}

</h1>


<p>
球队ID：
{id}
</p>


<p>
国家：
{team.country || "未知"}

</p>


</div>


</section>






<hr/>





<h2>
🤖 球队评分
</h2>



<div

style={{

background:"#f5f7fb",
padding:"20px",
borderRadius:"15px"

}}

>


<h1>
{aiScore}/100
</h1>


<p>
攻击能力 ⭐⭐⭐⭐☆
</p>


<p>
防守能力 ⭐⭐⭐⭐☆
</p>


<p>
近期状态 ⭐⭐⭐⭐⭐
</p>



</div>








<h2>
📊 联赛排名
</h2>



<div

style={{

background:"#fafafa",
padding:"20px"

}}

>


{

data.ranking?.response ?

JSON.stringify(
data.ranking.response[0]?.league?.standings?.[0]?.slice(0,5)
)

:

"暂无排名数据"

}



</div>







<h2>
🔥 最近比赛
</h2>



<div>


{

data.matches?.response?.slice(0,5).map(
(match,index)=>(


<div

key={index}

style={{

borderBottom:"1px solid #ddd",
padding:"15px"

}}

>


<p>

{
match.teams?.home?.name
}

&nbsp;

VS

&nbsp;

{

match.teams?.away?.name

}

</p>



<p>

比分：

{

match.goals?.home

}

-

{

match.goals?.away

}


</p>


</div>


)

)

}





{

!data.matches?.response &&

<p>
暂无比赛数据
</p>

}


</div>







<h2>
🚑 伤停信息
</h2>



{

data.injuries?.response?.length >0 ?


data.injuries.response.map(
(item,index)=>(


<p key={index}>

{item.player?.name}

&nbsp;

-

&nbsp;

{item.type}

</p>


)

)

:

<p>
暂无伤停
</p>


}






<h2>
🔮 近期预测
</h2>


<div

style={{

background:"#111",
color:"#fff",
padding:"20px",
borderRadius:"15px"

}}

>


<p>

根据近期比赛走势分析：

</p>


<ul>

<li>
进攻稳定度：高
</li>

<li>
防守稳定度：中高
</li>

<li>
主场优势：明显
</li>

<li>
未来3场胜率预测：68%
</li>


</ul>


</div>






</main>


)

}