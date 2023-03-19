import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoIosCopy } from "react-icons/io";

const teststring = `# 🎉 2022 대동제 안내 사이트

### 프로젝트 개요 🚀
- 부스 위치 조회 기능
- 부스 이름, 메뉴 검색 기능
- TF팀 공지 게시판
- 관심 부스 좋아요 기능
- 댓글을 통한 커뮤니티 기능
- 교내 쓰레기통 위치 안내 기능
- 대동제 행사 안내

### 참여 팀원 👥
| 이름 | 맡은 기능 |
|------|----------|
| 이서진 | 메인페이지, 페이지1 |
| 김서진 | 페이지2, 마이페이지 |

### 기술 스택 💻
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white) ![styled-components](https://img.shields.io/badge/styled--components-DB7093?style=flat&logo=styled-components&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-1ABC9C?style=flat&logo=Prettier&logoColor=white)
`;

const Result = (props) => {
	const { result } = props;
	const ref = useRef(null);
	const scrollToBottom = () => {
		ref.current.scrollIntoView({ behavior: "smooth" });
	};
	const [codestring, setCodestring] = useState("");
	const onChangeContentInput = useCallback(
		(e) => {
			setCodestring(e.target.value);
		},
		[codestring]
	);
	useEffect(() => {
		setCodestring(result);
	}, []);
	useEffect(() => {
		scrollToBottom();
	}, [codestring]);
	return (
		<>
			<Border />
			<Title>생성된 리드미</Title>
			<BoxWrapper>
				{codestring && (
					<>
						<PreviewBox>
							<ReactMarkdown
								children={codestring}
								remarkPlugins={[remarkGfm]}
							/>
						</PreviewBox>
						<CodeBox
							name="code"
							onChange={onChangeContentInput}
							autoComplete="off"
						>
							{codestring}
						</CodeBox>
						<CopyToClipboard
							text={codestring}
							onCopy={() =>
								alert(
									"마크다운 코드를 복사하였습니다. 리드미에 붙여넣어 바로 사용해보세요!"
								)
							}
						>
							<CopyButton>
								<IoIosCopy fill="#051027" size="25" />
							</CopyButton>
						</CopyToClipboard>
					</>
				)}
			</BoxWrapper>
			<div ref={ref}> </div>
		</>
	);
};

export default Result;

const Border = styled.div`
	border-bottom: 1px solid #ffffff;
	width: 90%;
	margin-top: 50px;
`;

const Title = styled.div`
	color: #ffffff;
	font-family: "Pretendard";
	font-size: 30px;
	font-weight: 600;
	margin: 30px 0;
`;

const BoxWrapper = styled.div`
	width: 90%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 100px;
	position: relative;
	@media (max-width: 760px) {
		flex-direction: column;
		align-items: center;
	}
`;

const PreviewBox = styled.div`
	width: 45%;
	word-break: keep-all;
	font-family: "Pretendard";
	padding: 15px;
	background-color: #ffffff;
	@media (max-width: 760px) {
		width: 90%;
		height: auto;
	}
`;

const CodeBox = styled.textarea`
	width: 45%;
	white-space: pre-wrap;
	font-family: "Pretendard";
	padding: 15px;
	background-color: #ffffff;
	border: 0;
	outline: 0;
	resize: none;
	@media (max-width: 760px) {
		width: 90%;
		height: 300px;
		margin-top: 20px;
	}
`;

const CopyButton = styled.div`
	position: absolute;
	bottom: 20px;
	right: 20px;
	cursor: pointer;
	width: 45px;
	height: 45px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #c1cdde;
	box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.4);
	border-radius: 50%;
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 14px;
	margin-top: 10px;
	@media (max-width: 760px) {
		right: 40px;
	}
`;
