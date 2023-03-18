const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener(
	'scroll',
	_.throttle(function () {
		if (window.scrollY > 500) {
			// 배지 숨기기
			// gsap.to(요소, 지속시간, 옵션);
			gsap.to(badgeEl, 0.6, {
				opacity: 0,
				display: 'none',
			}); // 0.6초에 걸쳐서 점점 투명해지는 애니메이션
			// 버튼 보이기!
			gsap.to(toTopEl, 0.2, {
				x: 0,
			});
		} else {
			gsap.to(badgeEl, 0.6, {
				opacity: 1,
				display: 'block',
			}); // 0.6초에 걸쳐서 점점 보여지는 애니메이션
			// 버튼 숨기기!
			gsap.to(toTopEl, 0.2, {
				x: 100,
			});
		}
	}, 300)
);
// _.throttle(함수, 시간)

toTopEl.addEventListener('click', function () {
	gsap.to(window, 0.7, {
		scrollTo: 0,
	});
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
	// gsap.to(요소, 지속시간, 옵션);
	gsap.to(fadeEl, 1, {
		delay: (index + 1) * 0.7, //순차적 애니메이션
		opacity: 1,
	});
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper', {
	direction: 'vertical',
	autoplay: true,
	loop: true, // 반복재생여부 (마지막 다음에 다시 처음으로)
});

// new Swiper(선택자, 옵션)
new Swiper('.promotion .swiper', {
	// direction: 'horizontal', 기본값
	slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
	spaceBetween: 10, // 슬라이드 사이 여백
	centeredSlides: true, // 1번 슬라이드가 가운데 보이기
	loop: true,
	autoplay: {
		delay: 5000, // 5초에 한번 슬라이드
	},
	pagination: {
		// 페이지 번호 사용 여부
		el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
		clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
	},
	navigation: {
		// 슬라이드 이전/다음 버튼 사용 여부
		prevEl: '.promotion .swiper-prev', // 이전 버튼 선택자
		nextEl: '.promotion .swiper-next', // 다음 버튼 선택자
	},
});

new Swiper('.awards .swiper-container', {
	// direction: 'horizontal', // 수평 슬라이드
	autoplay: true, // 자동 재생 여부
	loop: true, // 반복 재생 여부
	spaceBetween: 30, // 슬라이드 사이 여백
	slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
	// slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
	navigation: {
		// 슬라이드 이전/다음 버튼 사용 여부
		prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
		nextEl: '.awards .swiper-next', // 다음 버튼 선택자
	},
});

// Promotion Toggle
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; // 닫혀있니?
promotionToggleBtn.addEventListener('click', function () {
	// 슬라이드 영역 숨김 여부 반댓값으로 할당!
	isHidePromotion = !isHidePromotion;
	// 요소를 숨김 처리
	if (isHidePromotion) {
		promotionEl.classList.add('hide');
		// 요소 보임 처리
	} else {
		promotionEl.classList.remove('hide');
	}
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
	// `.toFixed()`를 통해 반환된 문자 데이터를,
	// `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
	return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
	// gsap.to(요소, 시간, 옵션);
	gsap.to(
		selector, // 선택자
		random(1.5, 2.5), // 애니메이션 동작 시간
		{
			// 옵션
			y: size,
			repeat: -1, // 무한반복
			yoyo: true, // 아래로 내려왔다가 다시 올라갈 수도 있게 해줌
			ease: Power1.easeInOut, // 자연스러운 움직임
			delay: random(0, delay), // 몇 초 뒤에 애니메이션 시작할건지
		}
	);
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 0.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
	new ScrollMagic.Scene({
		// 특정한 요소가 보이는 지 감시하는 메소드
		triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
		triggerHook: 0.8, // 뷰포트 시작이 0, 뷰포트 끝이 1 // 0.8 지점에 걸리면 트리거가 돼서 실행된다는 뜻
	})
		.setClassToggle(spyEl, 'show') // 넣었다뺐다 제어
		.addTo(new ScrollMagic.Controller()); // 컨트롤러
});
