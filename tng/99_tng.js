// 0. 페이지 처음 로드시 카드는 아무것도 없습니다.

// 1. 다음 버튼을 누르면 다음 페이지를 3개 가져옵니다.
// 	1-1. 다음 페이지를 가져올 때 기존 데이터는 지워지지 않습니다.
// 	1-2. 새로 가져온 데이터는 가장 뒤에 순서대로 삽입됩니다.

// 2. 리셋 버튼을 누르면 모든 카드가 초기화 됩니다.
// 	2-1. 리셋 후 다음 버튼을 누르면 첫 페이지부터 불러옵니다.

// 3. 사용하는 API는 아래와 같습니다.
// 	- baseURL: https://picsum.photos/v2/list
// 	- paramers:
// 	  - page: number
// 	  - limit: number


// 다음 버튼 선언 
const next = document.querySelector(".next");

// 버튼 데스값 선언 
let count = 0;

// flag 변수 선언
let flag = false;

// 다음 버튼 이벤트에 담기 
next.addEventListener("click" , async function (e) {
  // e.preventDefault();

  // 연속 요청 제한 
  if (flag) {
    // console.log("이전 요청 처리 중입니다. 잠시만 기다려주세요.");
    return; 
  }

  // 문 닫기 
  flag = true;

  // 버튼 누적 클릭 카운트 
  count++;

  console.log(count);
  

  // 픽섬 연결 
  const baseURL = "https://picsum.photos/";
  const path = "/v2/list";

  // 버튼 반응 함수 생성  
  const url = `${baseURL}${path}?page=${count}&limit=3`;

    // try
  try {
    // 호출
    const response = await axios.get(url);

    // 카드를 넣을 컨테이너 
    const con = document.querySelector(".card_con");

    response.data.forEach(function(item) {
      // card_img 
      const cardImg = document.createElement("div");
      cardImg.classList.add("card_img");
      cardImg.style.backgroundImage = `url("${item.download_url}")`;
      // card_txt
      const cardTxt = document.createElement("p");
      cardTxt.classList.add("card_txt");
      cardTxt.textContent = `${item.id}: ${item.author} `;
      // card 
      const card = document.createElement("div");
      card.classList.add("card");
      card.appendChild(cardImg);
      card.appendChild(cardTxt);
      // card_con
      con.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  } finally {
    // 문 열기
    flag = false;
  }
});

// 초기화 버튼 선언 
const reset = document.querySelector(".reset");

// 초기화 실행 
reset.addEventListener("click" , async function (e) {
  try {
    // 컨테이너 선언 
    const con = document.querySelector(".card_con");
    
    // 컨테이너 초기화
    con.textContent = '';
    
    // 버튼 누른 횟수 초기화 
    count = 0;
  } catch (error) {
    console.log(error);
  } 
});