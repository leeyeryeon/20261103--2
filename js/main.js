// 공통 팝업 데이터: 버튼에 연결된 종류에 따라 내용을 바꿉니다.
const modalData = {
  schedule: {
    title: '전체 일정',
    html: `
      <div class="schedule-row"><time>02.07 SAT<br>11:00</time><div><b>아트북페어 오픈</b><p>독립출판 마켓과 전시 관람이 시작됩니다.</p></div></div>
      <div class="schedule-row"><time>02.07 SAT<br>14:00</time><div><b>작가와의 만남 — 느린페이지</b><p>일상의 장면을 책으로 기록하는 방법을 나눕니다.</p></div></div>
      <div class="schedule-row"><time>02.07 SAT<br>16:00</time><div><b>북토크 — 나만의 작은 출판</b><p>독립출판의 시작부터 제작 과정까지 이야기합니다.</p></div></div>
      <div class="schedule-row"><time>02.08 SUN<br>13:00</time><div><b>북 메이킹 워크숍</b><p>종이와 실을 이용해 작은 제본 노트를 만듭니다.</p></div></div>
      <div class="schedule-row"><time>02.08 SUN<br>17:00</time><div><b>페어 마감</b><p>마지막 책장을 함께 넘기며 행사를 마무리합니다.</p></div></div>`
  },
  programs: {
    title: '전체 프로그램',
    html: `
      <div class="program-row"><div><b>독립출판 마켓</b><p>양일 상시 운영 · 자유 관람</p><p>독립출판물, 사진집, 시집, 일러스트북 전시 및 판매</p></div></div>
      <div class="program-row"><div><b>작가와의 만남</b><p>2월 7일 14:00 · 40분 · 사전 신청</p><p>참여 작가의 작업 이야기와 독자 Q&amp;A</p></div></div>
      <div class="program-row"><div><b>북토크: 나만의 작은 출판</b><p>2월 7일 16:00 · 50분 · 사전 신청</p><p>기획, 편집, 인쇄까지 독립출판의 과정 살펴보기</p></div></div>
      <div class="program-row"><div><b>북 메이킹 워크숍</b><p>2월 8일 13:00 · 60분 · 정원 12명</p><p>한 장씩 접고 엮어 나만의 미니북 만들기</p></div></div>`
  }
};

const modal = document.querySelector('#infoModal');
const modalTitle = document.querySelector('#modalTitle');
const modalContent = document.querySelector('#modalContent');

// 일정/프로그램 버튼을 누르면 해당 내용이 팝업으로 열립니다.
document.querySelectorAll('[data-modal]').forEach(button => {
  button.addEventListener('click', () => {
    const selected = modalData[button.dataset.modal];
    modalTitle.textContent = selected.title;
    modalContent.innerHTML = selected.html;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

// 닫기 버튼, 어두운 배경 클릭, ESC 키로 팝업을 닫습니다.
function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-close]').forEach(element => element.addEventListener('click', closeModal));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

// 작은 화면에서는 햄버거 버튼으로 메뉴를 열고 닫습니다.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => navigation.classList.toggle('open'));
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navigation.classList.remove('open')));

// 사전등록 페이지에서만 실행되는 신청 폼 처리입니다.
const registrationForm = document.querySelector('#registrationForm');
if (registrationForm) {
  registrationForm.addEventListener('submit', event => {
    event.preventDefault(); // 실제 서버 대신 화면에서 신청 완료 상태를 보여줍니다.
    if (!registrationForm.reportValidity()) return;
    const name = document.querySelector('#visitorName').value.trim();
    const success = document.querySelector('#successMessage');
    success.innerHTML = `<strong>${name}님, 사전등록이 완료되었습니다!</strong><br>아트북페어 림에서 만나요. (데모 신청이므로 정보는 서버에 저장되지 않습니다.)`;
    success.classList.add('show');
    registrationForm.querySelector('button[type="submit"]').textContent = '신청 완료';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
