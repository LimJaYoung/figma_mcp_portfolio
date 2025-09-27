// GSAP 라이브러리 로드 확인
console.log("GSAP 로드 확인:", typeof gsap);

// ScrollTrigger 등록
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    console.log("ScrollTrigger 등록 완료");
}

// DOM 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    
    // GSAP 사용 가능 여부 확인
    if (typeof gsap === 'undefined') {
        console.error('GSAP가 로드되지 않았습니다.');
        return;
    }

    // Line 1 애니메이션 (페이지 로드 시)
    const line1 = document.querySelector('.vis-line1 path');
    if (line1) {
        console.log('Line 1 요소 찾음');
        
        // 초기 상태 설정 (라인이 숨겨진 상태)
        gsap.set(line1, { strokeDashoffset: 1000 });
        
        // 페이지 로드 시 애니메이션
        gsap.to(line1, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.out",
            delay: 0.5
        });
    } else {
        console.error('Line 1 path를 찾을 수 없습니다');
    }

    // Line 2 애니메이션 (About 섹션)
    const line2 = document.querySelector('.vis-line2 path');
    if (line2) {
        console.log('Line 2 요소 찾음');
        gsap.to(line2, {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 80%",
                end: "center 50%",
                scrub: 0.5,
                onStart: () => console.log("Line 2 시작"),
                onComplete: () => console.log("Line 2 완료"),
                // markers: true
            }
        });
    } else {
        console.error('Line 2 path를 찾을 수 없습니다');
    }

    // Line 3 애니메이션 (About 제목 영역에서)
    const line3 = document.querySelector('.vis-line3 path');
    if (line3) {
        console.log('Line 3 요소 찾음');
        gsap.to(line3, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".ab-main-title",
                start: "top 30%",
                end: "bottom 30%",
                scrub: 1,
                onStart: () => console.log("Line 3 애니메이션 시작!"),
                onComplete: () => console.log("Line 3 애니메이션 완료!"),
                //markers: true
            }
        });
    } else {
        console.error('Line 3 path를 찾을 수 없습니다');
    }

    // Ab-english-line 애니메이션 (양방향 스크롤 연동)
    const abLine = document.querySelector('.ab-english-line path');
    if (abLine) {
        console.log('Ab-english-line 요소 찾음');
        
        // 초기 상태 설정
        gsap.set(abLine, { strokeDashoffset: 1200 });
        
        gsap.to(abLine, {
            strokeDashoffset: 0,
            scrollTrigger: {
                trigger: ".ab-description",
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
                onUpdate: (self) => {
                    // 스크롤 진행률에 따라 라인 표시/숨김
                    const progress = self.progress;
                    gsap.set(abLine, { 
                        strokeDashoffset: 1200 * (1 - progress)
                    });
                },
                onStart: () => console.log("Ab-line 애니메이션 시작"),
                onComplete: () => console.log("Ab-line 애니메이션 완료"),
                // markers: true
            }
        });
    } else {
        console.error('Ab-english-line path를 찾을 수 없습니다');
    }

    // Ab-title-line 애니메이션 (Educational Goals 제목)
    const abTitleLine = document.querySelector('.ab-title-line path');
    if (abTitleLine) {
        console.log('Ab-title-line 요소 찾음');
        
        // 초기 상태 설정
        gsap.set(abTitleLine, { strokeDashoffset: 800 });
        
        gsap.to(abTitleLine, {
            strokeDashoffset: 0,
            scrollTrigger: {
                trigger: ".ab-goals-title",
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.set(abTitleLine, { 
                        strokeDashoffset: 800 * (1 - progress)
                    });
                },
                onStart: () => console.log("Ab-title-line 애니메이션 시작"),
                onComplete: () => console.log("Ab-title-line 애니메이션 완료"),
                // markers: true
            }
        });
    } else {
        console.error('Ab-title-line path를 찾을 수 없습니다');
    }

    // Ab-bottom-line3 애니메이션 (Goals 섹션 하단)
    const abBottomLine3 = document.querySelector('.ab-bottom-line3 path');
    if (abBottomLine3) {
        console.log('Ab-bottom-line3 요소 찾음');
        
        // 초기 상태 설정
        gsap.set(abBottomLine3, { strokeDashoffset: 300 });
        
        gsap.to(abBottomLine3, {
            strokeDashoffset: 0,
            scrollTrigger: {
                trigger: ".ab-educational-goals",
                start: "center 70%",
                end: "bottom 30%",
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.set(abBottomLine3, { 
                        strokeDashoffset: 300 * (1 - progress)
                    });
                },
                onStart: () => console.log("Ab-bottom-line3 애니메이션 시작"),
                onComplete: () => console.log("Ab-bottom-line3 애니메이션 완료"),
                //markers: true
            }
        });
    } else {
        console.error('Ab-bottom-line3 path를 찾을 수 없습니다');
    }

    // Ab-bottom-line4 애니메이션 (About 섹션 하단) - 이미지 애니메이션
    const abBottomLine4 = document.querySelector('.ab-bottom-line4');
    if (abBottomLine4) {
        console.log('Ab-bottom-line4 요소 찾음');
        
        // 초기 상태 설정 (투명하게)
        gsap.set(abBottomLine4, { opacity: 0, scaleX: 0 });
        
        gsap.to(abBottomLine4, {
            opacity: 1,
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".ab-bottom-line4",
                start: "top 80%",
                end: "top 50%",
                scrub: 1,
                onStart: () => console.log("Ab-bottom-line4 애니메이션 시작"),
                onComplete: () => console.log("Ab-bottom-line4 애니메이션 완료"),
                //markers: true
            }
        });
    } else {
        console.error('Ab-bottom-line4 요소를 찾을 수 없습니다');
    }

    // Title Text Split Animation (한 줄씩 애니메이션)
    function createSplitTextAnimation() {
        const titleElement = document.querySelector('.title-text');
        if (!titleElement) {
            console.error('Title text 요소를 찾을 수 없습니다');
            return;
        }

        console.log('Title text 애니메이션 초기화');
        
        // 기존 텍스트 가져오기
        const originalText = titleElement.innerHTML;
        
        // 줄별로 분리 (br 태그로 구분)
        const lines = originalText.split('<br>');
        
        // 새로운 HTML 구조 생성
        let newHTML = '';
        lines.forEach((line, index) => {
            if (line.trim()) {
                newHTML += `<div class="split-line" data-line="${index}">`;
                
                // 각 글자를 span으로 감싸기
                const chars = line.trim().split('');
                chars.forEach((char, charIndex) => {
                    if (char === ' ') {
                        newHTML += `<span class="split-char" data-char="${charIndex}">&nbsp;</span>`;
                    } else {
                        newHTML += `<span class="split-char" data-char="${charIndex}">${char}</span>`;
                    }
                });
                
                newHTML += '</div>';
            }
        });
        
        // HTML 적용
        titleElement.innerHTML = newHTML;
        
        // CSS 스타일 적용
        titleElement.style.overflow = 'hidden';
        
        // 각 라인과 글자에 초기 스타일 적용
        const splitLines = titleElement.querySelectorAll('.split-line');
        const splitChars = titleElement.querySelectorAll('.split-char');
        
        // 각 라인별로 애니메이션 적용
        splitLines.forEach((line, lineIndex) => {
            const lineChars = line.querySelectorAll('.split-char');
            
            // 각 글자별로 점프 애니메이션 적용
            lineChars.forEach((char, charIndex) => {
                // 초기 상태 설정
                gsap.set(char, {
                    opacity: 0,
                    y: 30
                });
                
                // ScrollTrigger 생성
                ScrollTrigger.create({
                    trigger: titleElement,
                    start: "top 80%",
                    end: "top 20%",
                    onEnter: () => {
                        // 매번 진입 시 애니메이션 실행
                        gsap.fromTo(char, 
                            {
                                opacity: 0,
                                y: 30
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                ease: "back.out(1.7)",
                                delay: lineIndex * 0.2 + charIndex * 0.05
                            }
                        );
                        
                        if (charIndex === 0) console.log(`Title Line ${lineIndex + 1} 애니메이션 시작`);
                    },
                    onLeave: () => {
                        // 벗어날 때는 아무것도 하지 않음 (글자 유지)
                    },
                    onEnterBack: () => {
                        // 위에서 다시 진입할 때도 애니메이션 실행
                        gsap.fromTo(char, 
                            {
                                opacity: 0,
                                y: 30
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                ease: "back.out(1.7)",
                                delay: lineIndex * 0.2 + charIndex * 0.05
                            }
                        );
                        
                        if (charIndex === 0) console.log(`Title Line ${lineIndex + 1} 재진입 애니메이션 시작`);
                    },
                    onLeaveBack: () => {
                        // 위로 벗어날 때도 아무것도 하지 않음
                    }
                });
            });
        });
    }

    // 추가 타이틀들에도 같은 애니메이션 적용
    function createSplitTextAnimationForTitle(selector, triggerSelector) {
        const titleElement = document.querySelector(selector);
        if (!titleElement) {
            console.error(`${selector} 요소를 찾을 수 없습니다`);
            return;
        }

        console.log(`${selector} 애니메이션 초기화`);
        console.log(`${selector} 원본 텍스트:`, titleElement.innerHTML);
        
        // 기존 텍스트 가져오기
        const originalText = titleElement.innerHTML;
        
        // 줄별로 분리 (br 태그로 구분, 없으면 전체를 하나의 줄로)
        const lines = originalText.includes('<br>') ? originalText.split('<br>') : [originalText];
        
        console.log(`${selector} 분리된 줄들:`, lines);
        
        // 새로운 HTML 구조 생성
        let newHTML = '';
        lines.forEach((line, index) => {
            if (line.trim()) {
                newHTML += `<div class="split-line" data-line="${index}">`;
                
                // 각 글자를 span으로 감싸기
                const chars = line.trim().split('');
                chars.forEach((char, charIndex) => {
                    if (char === ' ') {
                        newHTML += `<span class="split-char" data-char="${charIndex}">&nbsp;</span>`;
                    } else {
                        newHTML += `<span class="split-char" data-char="${charIndex}">${char}</span>`;
                    }
                });
                
                newHTML += '</div>';
            }
        });
        
        // HTML 적용
        titleElement.innerHTML = newHTML;
        titleElement.style.overflow = 'hidden';
        
        // 각 라인과 글자에 초기 스타일 적용
        const splitLines = titleElement.querySelectorAll('.split-line');
        
        // 각 라인별로 애니메이션 적용
        splitLines.forEach((line, lineIndex) => {
            const lineChars = line.querySelectorAll('.split-char');
            
            // 각 글자별로 점프 애니메이션 적용
            lineChars.forEach((char, charIndex) => {
                // 초기 상태 설정
                gsap.set(char, {
                    opacity: 0,
                    y: 30
                });
                
                // ScrollTrigger 생성
                ScrollTrigger.create({
                    trigger: triggerSelector || titleElement,
                    start: "top 80%",
                    end: "top 20%",
                    onEnter: () => {
                        // 매번 진입 시 애니메이션 실행
                        gsap.fromTo(char, 
                            {
                                opacity: 0,
                                y: 30
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                ease: "back.out(1.7)",
                                delay: lineIndex * 0.2 + charIndex * 0.05
                            }
                        );
                        
                        if (charIndex === 0) console.log(`${selector} Line ${lineIndex + 1} 애니메이션 시작`);
                    },
                    onLeave: () => {
                        // 벗어날 때는 아무것도 하지 않음 (글자 유지)
                    },
                    onEnterBack: () => {
                        // 위에서 다시 진입할 때도 애니메이션 실행
                        gsap.fromTo(char, 
                            {
                                opacity: 0,
                                y: 30
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                ease: "back.out(1.7)",
                                delay: lineIndex * 0.2 + charIndex * 0.05
                            }
                        );
                        
                        if (charIndex === 0) console.log(`${selector} Line ${lineIndex + 1} 재진입 애니메이션 시작`);
                    },
                    onLeaveBack: () => {
                        // 위로 벗어날 때도 아무것도 하지 않음
                    }
                });
            });
        });
    }

    // 폰트 로드 완료 후 Split Text 애니메이션 실행
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            createSplitTextAnimation();
            
            // 추가 타이틀들에 애니메이션 적용
            createSplitTextAnimationForTitle('.ab-me-text', '.ab-main-title');
            createSplitTextAnimationForTitle('.project-title', '.project-header');
            createSplitTextAnimationForTitle('.contact-title', '.contact-header');
        });
    } else {
        // fonts API를 지원하지 않는 경우 즉시 실행
        createSplitTextAnimation();
        
        // 추가 타이틀들에 애니메이션 적용
        createSplitTextAnimationForTitle('.ab-me-text', '.ab-main-title');
        createSplitTextAnimationForTitle('.project-title', '.project-header');
        createSplitTextAnimationForTitle('.contact-title', '.contact-header');
    }

    // Visual Description Split Animation (한 줄씩 SlideUp - 페이지 로드 시)
    function createVisualDesAnimation() {
        const visualDesElement = document.querySelector('.visual-des');
        if (!visualDesElement) {
            console.error('Visual-des 요소를 찾을 수 없습니다');
            return;
        }

        console.log('Visual-des 애니메이션 초기화');
        
        // 기존 텍스트 가져오기
        const originalText = visualDesElement.textContent;
        
        // 수동으로 3줄로 나누기
        const words = originalText.trim().split(' ');
        console.log('총 단어 수:', words.length);
        console.log('원본 텍스트:', originalText);
        
        // 강제로 3줄로 나누기
        const lines = [
            words.slice(0, 5).join(' '),     // 첫 번째 줄: 0-4번째 단어
            words.slice(5, 10).join(' '),    // 두 번째 줄: 5-9번째 단어  
            words.slice(10).join(' ')        // 세 번째 줄: 10번째부터 끝까지
        ].filter(line => line.trim() !== ''); // 빈 줄 제거
        
        console.log('생성된 줄들:', lines);
        
        // 새로운 HTML 구조 생성 (각 줄을 div로 감싸기)
        let newHTML = '';
        lines.forEach((line, index) => {
            newHTML += `<div class="visual-line" data-line="${index}">${line}</div>`;
        });
        
        // HTML 적용
        visualDesElement.innerHTML = newHTML;
        
        // 각 라인에 초기 스타일 적용
        const visualLines = visualDesElement.querySelectorAll('.visual-line');
        console.log('찾은 visual-line 개수:', visualLines.length);
        
        // 초기 상태 설정 (라인들 숨김)
        gsap.set(visualLines, {
            opacity: 0,
            y: 40
        });
        
        // 페이지 로드 후 1초 뒤에 순차적으로 애니메이션 시작
        visualLines.forEach((line, lineIndex) => {
            gsap.to(line, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 1.2 + lineIndex * 0.3, // 1.2초 후 시작, 각 줄마다 0.3초 간격
                onStart: () => {
                    console.log(`Visual line ${lineIndex + 1} 애니메이션 시작`);
                },
                onComplete: () => {
                    console.log(`Visual line ${lineIndex + 1} 애니메이션 완료`);
                }
            });
        });
    }

    // Visual Description 애니메이션 실행
    createVisualDesAnimation();

    // ScrollTrigger 새로고침
    ScrollTrigger.refresh();
    console.log('ScrollTrigger 새로고침 완료');
});

// 리사이즈 처리
window.addEventListener('resize', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

//skill-tags 애니메이션
gsap.registerPlugin(ScrollTrigger);

// 초기 상태 공통 세팅
gsap.utils.toArray(".skills-tags .tag-item").forEach((el, i) => {
    gsap.set(el, { y: "40vh", opacity: 0 });

    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",   // 해당 태그 상단이 뷰포트 90% 지점에 오면 시작
        end: "top 60%",     // 약간의 스크럽 구간
        scrub: 0.5,         // 스크롤과 살짝 동기화(부드럽게)
      //markers: true,
      }
    });
  });

// ★ about-decorations 자식들 동일 애니메이션
gsap.utils.toArray(".about-decorations > *").forEach((el) => {
  gsap.set(el, { y: "40vh", opacity: 0 });

  gsap.to(el, {
    y: 0,
    opacity: 1,
    duration: 1.0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      end: "top 60%",
      scrub: 0.5,
      //markers: true, // 디버깅용
    }
  });
});










// uiux-section폰트/이미지 로딩 후 정확한 위치 계산

gsap.registerPlugin(ScrollTrigger);

// 위치 정확도(폰트/이미지 로딩 후)
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  console.log('ScrollTrigger 새로고침 완료');
});

// 리사이즈 시에도 새로고침
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});



/* 1) 배너 핀: 중앙에 오면 고정 */
ScrollTrigger.create({
  trigger: ".uiux-pin",
  start: "center center",
  end: "+=1500",                 // 핀 유지 길이 조정
  pin: true,
  pinSpacing: false,             // 핀 스페이싱 비활성화
  anticipatePin: 1,
  pinType: "fixed",
  //markers: true, // 디버깅용
  onEnter: () => console.log('핀 시작'),
  onLeave: () => console.log('핀 종료'),
});

/* 2) 카드들이 배너 위로 올라오면서 화면 밖으로 기울어지며 사라지는 애니메이션 */
document.querySelectorAll(".uiux-card").forEach((card, idx) => {
  const isLarge = card.classList.contains("large-card");

  // 각 카드별로 다른 기울기와 방향 설정
//   const xOffset = isLarge ? 0 : (idx % 2 === 0 ? -300 : 300); // 좌/우로 벌어짐
//   const rotation = isLarge ? 0 : (idx % 2 === 0 ? -15 : 15);   // 기울기 각도
//   const yOffset = -200; // 위로 올라가는 거리

  // 카드 초기 상태 설정
  gsap.set(card, {
    y: 100,
    x: 0,
    opacity: 0,
    scale: 0.9,
    rotate: 0
  });

  // 카드 등장 애니메이션 (배너가 고정되기 전에 나타남)
  gsap.to(card, {
    y: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    ease: "power1.out",
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      end: "top 75%",
      scrub: 0.8,
     // markers: true, // 디버깅용
    }
  });


});

