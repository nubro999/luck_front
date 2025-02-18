import React, { useState } from "react";

const App = () => {
    const [fortune, setFortune] = useState(""); // 랜덤 운세 메시지 저장
    const [status, setStatus] = useState(""); // POST 요청 상태 저장

    // GET 요청: 랜덤 운세 가져오기
    const fetchRandomFortune = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/fortunes/random");
            if (response.ok) {
                const data = await response.json();
                setFortune(data.message); // 메시지 설정
            } else {
                setFortune("운세를 가져오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("Error fetching random fortune:", error);
            setFortune("운세를 가져오는 중 오류가 발생했습니다.");
        }
    };

    // POST 요청: 샘플 데이터 초기화
    const initSampleData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/fortunes/init-sample", {
                method: "POST",
            });
            if (response.ok) {
                setStatus("샘플 데이터가 성공적으로 초기화되었습니다!");
            } else {
                setStatus("샘플 데이터 초기화에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error initializing sample data:", error);
            setStatus("샘플 데이터 초기화 중 오류가 발생했습니다.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>운세 API 테스트</h1>

            {/* 랜덤 운세 가져오기 */}
            <button onClick={fetchRandomFortune} style={{ marginBottom: "20px" }}>
                랜덤 운세 가져오기
            </button>
            <p>{fortune}</p>

            {/* 샘플 데이터 초기화 */}
            <button onClick={initSampleData} style={{ marginBottom: "20px" }}>
                샘플 데이터 초기화
            </button>
            <p>{status}</p>
        </div>
    );
};

export default App;
