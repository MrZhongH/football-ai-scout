export async function translateTeamName(name) {

    try {

        const response = await fetch(
            "https://open.bigmodel.cn/api/paas/v4/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    "Authorization":
                    `Bearer ${process.env.OPENAI_API_KEY}`
                },


                body: JSON.stringify({

                    model: "glm-4-flash",

                    messages: [
                        {
                            role: "user",

                            content:
`
你是足球数据库搜索助手。

把用户输入的球队中文名转换成可能的英文官方球队名称。

只返回JSON数组。

不要解释。

例如:

输入:
全北现代

输出:
[
"Jeonbuk Motors",
"Jeonbuk Hyundai Motors",
"Jeonbuk FC"
]


输入:
皇马

输出:
[
"Real Madrid"
]


现在转换:

${name}

`
                        }
                    ]

                })

            }
        );


        const data = await response.json();


        if(
            !data.choices ||
            !data.choices[0]
        ){

            return [];

        }



        let text =
        data.choices[0]
        .message
        .content
        .trim();



        // 防止AI带markdown

        text =
        text
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();



        return JSON.parse(text);



    } catch(error){

        console.log(
            "AI translate error:",
            error
        );


        return [];

    }

}
