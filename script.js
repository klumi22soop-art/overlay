// !!! 중요: YOUR_CLIENT_ID 부분을 실제 발급받은 클라이언트 ID로 교체하세요 !!!
const clientId = 'klumi22'; 
const authType = 'api'; 

// SOOP 채팅 SDK 인스턴스 생성
const chatSdk = new window.SOOP.ChatSdk(clientId, authType);

const chatContainer = document.getElementById('chat-container');

// 채팅 메시지 수신 시 호출될 함수
chatSdk.on('message', (message) => {
    console.log('새로운 메시지:', message.user.nickname, message.content);
    addChatMessage(message);
});

// SDK 연결 성공 시
chatSdk.on('connect', () => {
    console.log('SOOP Chat SDK 연결 성공');
    // 여기에 테스트 메시지 추가
    addChatMessage({
        user: { nickname: "테스트시청자1" },
        content: "연결 성공! OBS에 정상적으로 띄워졌나요?"
    });
});

// SDK 연결 실패 시
chatSdk.on('disconnect', () => {
    console.log('SOOP Chat SDK 연결 해제');
});

// 연결 시도
chatSdk.connect();


// HTML에 메시지 요소를 추가하는 함수
function addChatMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');

    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar');
    // 팁: message.user.user_id 등을 활용하여 시청자별 다른 아바타 이미지 설정 가능

    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('bubble');

    const nicknameSpan = document.createElement('span');
    nicknameSpan.classList.add('nickname');
    nicknameSpan.textContent = message.user.nickname;

    const contentSpan = document.createElement('span');
    contentSpan.classList.add('content');
    contentSpan.textContent = message.content;

    bubbleDiv.appendChild(nicknameSpan);
    bubbleDiv.appendChild(contentSpan);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(bubbleDiv);

    chatContainer.appendChild(messageDiv);

    // 새 메시지가 추가될 때마다 스크롤을 최하단으로 이동 (필요시)
    // chatContainer.scrollTop = chatContainer.scrollHeight;

    // 5초 후 메시지 자동으로 제거 (CSS 애니메이션과 연동)
    setTimeout(() => {
        messageDiv.remove();
    }, 5000); 
}
