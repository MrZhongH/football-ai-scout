export async function translateTeamName(name){


const res =
await fetch(
"https://open.bigmodel.cn/api/paas/v4/chat/completions",
{

method:"POST",

headers:{

"Content-Type":"application/json",

"Authorization":
`Bearer ${process.env.OPENAI_API_KEY}`

},


body:JSON.stringify({

model:"glm-4-flash",


messages:[

{

role:"user",

content:
`
你是足球球队名称转换器。

把下面中文球队转换成可能的英文官方名称。

只返回JSON数组，不要解释。

例：
全北现代

返回：
[
"Jeonbuk Motors",
"Jeonbuk Hyundai Motors",
"Jeonbuk FC"
]


球队：
${name}

`

}

]


})

});


const data =
await res.json();



return JSON.parse(
data.choices[0].message.content
);



}
