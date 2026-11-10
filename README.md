# ARU's Pond — 포트폴리오 웹사이트

작은 아이디어가 자라는 곳. HTML · CSS · 순수 JavaScript로 만든 정적 사이트예요.
설치할 프로그램, 서버, 데이터베이스는 필요 없어요.

## 📁 파일 구성

```
index.html      ← 사이트 본문 (반드시 맨 위에 있어야 함)
style.css       ← 디자인 (색·글꼴·크기·애니메이션)
script.js       ← 동작 (메뉴 이동, 작업물 목록, 링크)
assets/
  images/       ← 캐릭터·아이콘·썸네일 이미지
  videos/       ← 영상 파일 (character-intro.mp4)
.nojekyll       ← GitHub Pages용 빈 파일 (지우지 마세요)
README.md       ← 지금 이 안내서

(assets/images 안의 favicon.png = 탭 아이콘, og-image.jpg = 링크 미리보기 이미지, cloud-left.png · cloud-right.png = WORK 구름 + CONTACT로 넘어갈 때 걷히는 구름, aru-letter · aru-youtube · aru-instagram · aru-mail.png = CONTACT 아루 4가지)
```

---

## 1. 내 컴퓨터에서 미리 보기

**가장 쉬운 방법**
1. ZIP을 풀어요.
2. `index.html`을 더블클릭하면 크롬에서 열려요.

**더 정확한 방법 (VS Code를 쓴다면)**
1. VS Code에서 [파일 → 폴더 열기]로 이 폴더를 열어요.
2. 왼쪽 확장(□ 모양) 아이콘 → `Live Server` 검색 → 설치해요.
3. `index.html`을 열고 오른쪽 아래 **Go Live** 버튼을 눌러요.

**확인할 것**
- [ ] 위쪽 메뉴의 HOME · WORK · CONTACT를 누르면 해당 위치로 부드럽게 이동하나요?
- [ ] 메뉴에 마우스를 올리면 아루 얼굴이 라인 아이콘으로 바뀌나요?
- [ ] HOME의 아루가 손을 흔드나요?
- [ ] WORK로 내려가면 타이틀과 노트북 아루가 나타나나요?
- [ ] VIDEO · DESIGN · MOTION 카드를 누르면 작업물 목록이 나오나요?
- [ ] 작업물을 누르면 크게 보이고, BACK이나 브라우저 뒤로가기로 돌아오나요?
- [ ] 작업물 목록 위 VIDEO · DESIGN · MOTION 탭으로 카테고리를 옮겨 다닐 수 있나요?
- [ ] 작업 상세에서 PREV / NEXT 버튼(또는 키보드 ← →, 모바일은 옆으로 밀기)으로 다른 작업으로 넘어가나요?
- [ ] 작업물 화면에서는 위쪽 HOME · WORK · CONTACT 메뉴가 사라지나요?
- [ ] MAIL을 누르면 버튼 글자가 메일 주소로 바뀌고, 한 번 더 누르면 메일 쓰기 창이 열리나요?
- [ ] 브라우저 탭에 아루 얼굴 아이콘이 보이나요?
- [ ] 첫 화면 아래 ↓ 버튼을 누르면 WORK로 내려가나요?
- [ ] WORK에서 CONTACT로 스크롤하면 구름이 화면을 덮었다가 양옆으로 걷히나요?
- [ ] CONTACT에 별이 반짝이고, YOUTUBE · INSTAGRAM · MAIL 버튼마다 아루가 해당 아이콘을 든 모습으로 바뀌나요?
- [ ] 맨 아래에 © 푸터가 보이나요?

---

## 2. GitHub에 올리기 (웹 화면에서 끝내기)

1. https://github.com 로그인 → 오른쪽 위 **+** → **New repository**
2. Repository name 입력 (예: `aru-pond`) → **Public** 선택 → **Create repository**
3. 생성된 화면에서 **uploading an existing file** 링크 클릭
4. 압축을 푼 폴더 **안의 내용물 전체**를 끌어다 놓아요.
   - ⚠️ 폴더째 올리면 안 돼요. `index.html`이 저장소 맨 위에 보여야 해요.
   - `assets` 폴더는 폴더째 끌어다 놓으면 안의 파일까지 함께 올라가요.
   - `.nojekyll`처럼 점(.)으로 시작하는 파일은 숨김 파일이라 안 보일 수 있어요. 없어도 사이트는 동작해요.
5. 아래 **Commit changes** 클릭

## 3. 사이트 공개하기 (GitHub Pages)

1. 저장소 위쪽 **Settings** → 왼쪽 메뉴 **Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / `/(root)` 선택 → **Save**
4. 1~3분 기다린 뒤 새로고침하면 위쪽에 주소가 떠요.
   `https://내아이디.github.io/aru-pond/`

## 4. 수정하고 다시 반영하기

1. 저장소에서 바꿀 파일 클릭 → 연필(✏️) 아이콘 → 수정 → **Commit changes**
2. 이미지·영상 교체: **Add file → Upload files** 로 같은 이름의 파일을 올리면 덮어써져요.
3. 1~3분 뒤 사이트 주소에서 새로고침 (안 바뀌면 `Ctrl + Shift + R`)

---

## ✏️ 직접 바꿀 곳

**링크 미리보기 주소** (`index.html` 위쪽, 배포 후 한 번만)
카톡·인스타에 주소를 보낼 때 썸네일이 뜨게 하려면,
`https://내아이디.github.io/저장소이름/` 두 군데를 실제 사이트 주소로 바꿔요.
미리보기 이미지는 `assets/images/og-image.jpg` 예요.
(카톡은 미리보기를 저장해 두기 때문에, 바꾼 뒤 안 바뀌면 https://developers.kakao.com/tool/debugger/sharing 에서 주소를 넣고 초기화해요.)

**푸터 문구**: `index.html` 맨 아래 `ARU's Pond. All rights reserved.` 를 바꾸면 돼요. 연도는 자동으로 바뀌어요.

아래 항목은 모두 `script.js` 맨 위에 있어요.

**유튜브 · 인스타 주소**
```js
const CONTACT = {
  youtube: "https://www.youtube.com/@내채널",
  instagram: "https://www.instagram.com/내계정",
  mail: "sohee3276@gmail.com",
};
```
비워두면 버튼을 눌렀을 때 살짝 흔들리기만 하고 이동하지 않아요.

**작업 영상 넣기** (NESPRESSO · STARBUCKS · PROMOTION · BUSAN)

방법 A — 영상 파일 (파일 하나당 **25MB 이하** 권장)
1. `assets/videos/` 폴더에 mp4를 올려요. 파일명은 영어·숫자로 (예: `nespresso.mp4`)
2. `script.js`에서 해당 줄의 `video: ""` 를 `video: "./assets/videos/nespresso.mp4"` 로 바꿔요.

방법 B — 유튜브 (용량이 클 때 추천)
1. 유튜브에 **일부 공개**로 올려요.
2. `youtube: ""` 안에 영상 주소를 붙여 넣어요.

둘 다 비어 있으면 썸네일 이미지가 크게 보여요.

**글자 · 색 바꾸기**
- 문구: `index.html`에서 해당 글자를 찾아 바꿔요.
- 색: `style.css` 맨 위 `:root { ... }`의 색상 코드를 바꾸면 사이트 전체에 적용돼요.

---

## 🔧 자주 생기는 문제

| 증상 | 해결 |
|---|---|
| 주소에 들어가면 404 | Pages 설정 후 몇 분 기다려요. `index.html`이 저장소 맨 위에 있는지 확인해요. |
| 이미지가 깨져서 이름만 보여요 | ZIP을 '압축 풀기'로 전체를 푼 뒤 열어요. ZIP 안에서 바로 열거나 일부만 꺼내면 assets 폴더가 빠져서 깨져요. |
| 이미지·영상이 안 떠요 | 파일명 대소문자까지 똑같은지 확인해요 (GitHub는 `A.png`와 `a.png`를 다르게 봐요). |
| 수정했는데 그대로예요 | 1~3분 기다린 뒤 `Ctrl + Shift + R`로 강력 새로고침해요. |
| 영상 업로드가 안 돼요 | 웹 업로드는 25MB까지만 돼요. 압축하거나 유튜브 방법을 써요. |
| 폰트가 달라 보여요 | 인터넷이 연결돼 있어야 Poppins · Fredoka 폰트가 불러와져요. |

> 메일 주소는 사이트에 공개돼요. 원치 않으면 `script.js`의 `mail` 값을 바꾸거나 지우세요.
