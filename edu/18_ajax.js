// BaseURL: https://picsum.photos
// Resource/Path: /v2/list
// Parameter:
//   - page: number
//   - limit: number
// 특이사항: 이미지는 1000개가 준비되어 있다.
// 예제: https://picsum.photos/v2/list?page=2&limit=100

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const baseURL = 'https://picsum.photos/' ; 
  const path = '/v2/list' ; 

  // 이벤트 객체에서 이벤트가 발생한 요소에 접근(e.target)에서 필요한 값 불러오기 
  const page = e.target.page.value;
  const limit = e.target.limit.value;

  const url = `${baseURL}${path}?page=${page}&limit=${limit}` ; 

  try {
    const response = await axios.get(url); 

        // <div class="card"> 
        //     <div class="card_img"> 
        //       <img src="" >
        //     </div>
        //     <p class="text"> 1: 아아아아 </p>
        // </div>

    // 카드를 넣을 컨테이너 요소 
    const container = document.querySelector('.card_con');
    container.textContent = '';

    response.data.forEach((item) => {

      // card_img 요소 생성
      const cardImg = document.createElement('div');
      cardImg.classList.add('card_img') ;
      cardImg.style.backgroundImage = `url('${item.download_url}') ` ;

      // card_text 요소 생성 
      const cardText = document.createElement('p');
      cardText.classList.add('card_text');
      cardText.textContent = `${item.id}: ${item.author}`;

      // card 요소 생성 
      const card = document.createElement('div');
      card.classList.add('card');
      card.appendChild(cardImg);
      card.appendChild(cardText);

    // 4. card_con에 생성한 요소를 담는다.
    container.appendChild(card);
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});