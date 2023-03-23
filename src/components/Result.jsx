import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoIosCopy } from "react-icons/io";

const Result = (props) => {
	const { result, result2 } = props;
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
		setCodestring(result + result2);
	}, []);
	useEffect(() => {
		scrollToBottom();
	}, [codestring]);
	return (
		<>
			<Border />
			<Title>생성된 리드미</Title>
			<TitleDes>
				오른쪽 코드 박스에서 원하는대로 수정하고, 왼쪽 마크다운 프리뷰에서
				결과물을 바로 확인하세요. 코드 박스의 우측 복사 버튼 클릭으로 손쉽게
				마크다운 코드를 클립보드에 복사할 수 있어요!
			</TitleDes>
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
	margin: 40px 0 20px 0;
`;

const TitleDes = styled.div`
	width: 50%;
	text-align: center;
	font-family: "Pretendard";
	color: #f0f0f0;
	margin-bottom: 40px;
	word-break: keep-all;
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
