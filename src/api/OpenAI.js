import axios from "axios";

const key = process.env.REACT_APP_OPENAI_API_KEY;
const apiUrl = "https://api.openai.com/v1/chat/completions";
const headers = {
	"Content-Type": "application/json",
	Authorization: `Bearer ${key}`,
};

export const GPT3 = {
	askGPT: (ask) =>
		axios
			.post(
				apiUrl,
				JSON.stringify({
					messages: [
						{
							role: "user",
							content: `${ask.url}
    
                이 레포지토리를 설명하는 리드미를 작성할거야. 지금부터 설명하는 내용을 마크다운 문법으로 작성해줘.
                
                프로젝트 제목인 ${ask.title}는 가장 큰 h1으로 맨 위에 써줘.
                제목에 어울리는 것 같은 이모지도 하나 추천해서 제목 왼쪽에 넣어주면 좋겠어.
                
                그 다음으로는 h3(###)로 "프로젝트 개요"라고 쓴 다음, 어울리는 이모지를 하나 제목 왼쪽에 넣어줘.
                그리고 다음에 오는 텍스트를 그대로 넣어줘. unordered list를 사용해서 넣으면 돼.
                ${ask.detail}
                
    
                다음으로는 h3(###)로 "기술 스택"이라고 쓴 다음, 어울리는 이모지를 하나 제목 왼쪽에 넣어줘.
                
                ${ask.tech}를 각각 https://simpleicons.org/ 사이트에서 검색하여 검색 결과를 바탕으로 다음 코드를 채워서 이어 써주면 돼. 줄바꿈 없이 붙여서 써줘야해.
                
                ![Badge](https://img.shields.io/badge/로고이름-색상코드?style=flat&logo=로고이름&logoColor=white)
                로고 이름에는 검색 결과에서 가장 첫번째로 찾은 텍스트를, 색상 코드에서는 검색 결과에 나온 #로 시작하는 컬러 헥사코드 6자리를 #을 제외하고 넣어줘.
                
                
                그 다음으로는 h3(###)로 "참여 팀원"이라고 쓴 다음, 어울리는 이모지를 하나 제목 왼쪽에 넣어줘.
                그리고 아래 오는 내용을 표로 만들어주면 좋겠어.
                1번째 행에 각각의 팀원 이름을 넣어줘.
                2번째 행에는 각 팀원이 맡은 기능을 쓸거야.
                
                팀원 이름과 각 팀원이 맡은 기능은 다음과 같아.
                ${ask.team}`,
						},
					],
					model: "gpt-3.5-turbo",
				}),
				{
					headers,
				}
			)
			.then((response) => {
				//console.log(response);
				return response;
			})
			.catch((error) => {
				//console.log(error);
				return error;
			}),
	getDirectory: (ask) =>
		axios
			.post(
				apiUrl,
				JSON.stringify({
					messages: [
						{
							role: "user",
							content: `지금부터 마크다운 문법으로 리드미를 작성할거야.
		우선 h3(###)로 "디렉토리 구조"라고 쓴 다음, 어울리는 이모지를 하나 제목 왼쪽에 넣어줘.
		그 다음 마크다운 문법의 코드 블럭 내부에 ${ask.url} 레포지토리의 폴더 디렉토리 구조를 설명해줘.
		각 폴더에 대한 설명은 폴더 이름 바로 옆에 주석으로 달아서 써줘.
		폴더 내부에 하위 폴더 또는 파일이 5개 이상이라면 생략해.
		`,
						},
					],
					model: "gpt-3.5-turbo",
				}),
				{
					headers,
				}
			)
			.then((response) => {
				//console.log(response);
				return response;
			})
			.catch((error) => {
				//console.log(error);
				return error;
			}),
};
