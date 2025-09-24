// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation 기능
    const navItems = document.querySelectorAll('.nav-item');
    
    // 네비게이션 클릭 이벤트
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 모든 active 클래스 제거
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 클릭된 아이템에 active 클래스 추가
            this.classList.add('active');
            
            // 부드러운 색상 전환 효과
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
        
        // 호버 효과 강화
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '#21a0aa';
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '#000000';
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // 타이핑 애니메이션 효과
    const titleText = document.querySelector('.title-text');
    const originalText = titleText.innerHTML;
    
    function typewriterEffect() {
        titleText.innerHTML = '';
        titleText.style.opacity = '1';
        
        const lines = originalText.split('<br>');
        let lineIndex = 0;
        let charIndex = 0;
        
        function typeChar() {
            if (lineIndex < lines.length) {
                if (charIndex < lines[lineIndex].length) {
                    titleText.innerHTML += lines[lineIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 100);
                } else {
                    if (lineIndex < lines.length - 1) {
                        titleText.innerHTML += '<br>';
                    }
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeChar, 200);
                }
            }
        }
        
        typeChar();
    }
    
    // 페이지 로드 시 타이핑 효과 시작 (3초 후)
    setTimeout(typewriterEffect, 3000);
    
    // 로고 클릭 시 타이핑 효과 재실행
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        typewriterEffect();
    });
    
    // 스크롤 패럴랙스 효과
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.decorative-elements > div');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // 마우스 추적 효과
    const floatingCircle = document.querySelector('.floating-circle');
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCircle() {
        const dx = mouseX - circleX;
        const dy = mouseY - circleY;
        
        circleX += dx * 0.1;
        circleY += dy * 0.1;
        
        if (floatingCircle) {
            floatingCircle.style.left = circleX + 'px';
            floatingCircle.style.top = circleY + 'px';
        }
        
        requestAnimationFrame(animateCircle);
    }
    
    animateCircle();
    
    // 카드 요소 인터랙션
    const cardElement = document.querySelector('.card-background');
    if (cardElement) {
        cardElement.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        cardElement.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    }
    
    // 반응형 메뉴 토글 (모바일)
    function createMobileMenu() {
        if (window.innerWidth <= 768) {
            const navigation = document.querySelector('.navigation');
            if (!document.querySelector('.mobile-menu-toggle')) {
                const toggleButton = document.createElement('div');
                toggleButton.className = 'mobile-menu-toggle';
                toggleButton.innerHTML = '☰';
                toggleButton.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    font-size: 24px;
                    cursor: pointer;
                    color: #21a0aa;
                `;
                
                document.body.appendChild(toggleButton);
                
                toggleButton.addEventListener('click', function() {
                    navigation.style.display = navigation.style.display === 'none' ? 'flex' : 'none';
                });
            }
        }
    }
    
    // 윈도우 리사이즈 이벤트
    window.addEventListener('resize', function() {
        createMobileMenu();
    });
    
    // 초기 모바일 메뉴 설정
    createMobileMenu();
    
    // 성능 최적화를 위한 디바운스 함수
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 스크롤 이벤트 디바운스 적용
    const debouncedScroll = debounce(function() {
        // 스크롤 기반 애니메이션 실행
        const elements = document.querySelectorAll('.decoration-group-1, .decoration-group-2, .decoration-group-3');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, 100);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // 페이지 로드 완료 후 초기 애니메이션
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // 장식 요소들 순차적으로 나타나게 하기
        const decorativeGroups = document.querySelectorAll('.decorative-elements > div');
        decorativeGroups.forEach((group, index) => {
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'scale(1)';
            }, index * 200);
        });
    }, 500);
    
    // About Me Section JavaScript
    initAboutMeSection();
    
    // Project Section JavaScript
    initProjectSection();
    
    // UIUX Section JavaScript
    initUIUXSection();
    
    // Contact Section JavaScript
    initContactSection();
    
    console.log('J.young Portfolio - All Sections Loaded Successfully! 🚀');
});

// About Me Section 기능
function initAboutMeSection() {
    // Skills Tags 인터랙션
    const skillTags = document.querySelectorAll('.tag-item');
    
    skillTags.forEach(tag => {
        // 클릭 이벤트
        tag.addEventListener('click', function() {
            // 모든 태그에서 active 클래스 제거
            skillTags.forEach(t => t.classList.remove('active'));
            
            // 클릭된 태그에 active 클래스 추가
            this.classList.add('active');
            
            // 펄스 효과
            this.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05) rotate(2deg)';
            }, 200);
            
            // 스킬 정보 표시 (추후 확장 가능)
            console.log(`Selected skill: ${this.textContent}`);
        });
        
        // 마우스 엔터 효과
        tag.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        // 마우스 리브 효과
        tag.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transition = 'all 0.3s ease';
            }
        });
    });
    
    // Educational Goals 리스트 애니메이션
    const goalsList = document.querySelectorAll('.goals-list li');
    
    // Intersection Observer로 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // 체크마크 애니메이션
                const checkmark = entry.target.querySelector('::before');
                if (checkmark) {
                    setTimeout(() => {
                        entry.target.style.setProperty('--checkmark-scale', '1');
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    goalsList.forEach(item => {
        observer.observe(item);
        
        // 초기 상태 설정
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease-out';
        
        // 호버 효과
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.backgroundColor = 'rgba(33, 160, 170, 0.1)';
            this.style.padding = '15px 20px';
            this.style.borderRadius = '10px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = 'transparent';
            this.style.padding = '15px 0';
            this.style.borderRadius = '0';
        });
    });
    
    // About Me 타이틀 애니메이션
    const meText = document.querySelector('.me-text');
    if (meText) {
        let isAnimating = false;
        
        meText.addEventListener('click', function() {
            if (!isAnimating) {
                isAnimating = true;
                
                // 텍스트 분해 효과
                this.style.transform = 'scale(1.1) rotate(5deg)';
                this.style.color = '#21a0aa';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1) rotate(0deg)';
                    this.style.color = '#000000';
                    isAnimating = false;
                }, 1000);
            }
        });
    }
    
    // 장식 아이콘들 인터랙션
    const decorativeIcons = document.querySelectorAll('.about-decorations > div');
    
    decorativeIcons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            // 랜덤 색상 변경
            const colors = ['#21a0aa', '#ec8e91', '#ffcf2d', '#5b2448'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            this.style.filter = `drop-shadow(0 0 20px ${randomColor})`;
            this.style.transform = 'scale(1.2) rotate(360deg)';
            
            setTimeout(() => {
                this.style.filter = 'none';
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 1000);
        });
        
        // 마우스 오버 시 색상 힌트
        icon.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) saturate(1.3)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
        });
    });
    
    // 스크롤 기반 패럴랙스 효과 (About Me 섹션)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const aboutSection = document.querySelector('.about-section');
        
        if (aboutSection) {
            const rect = aboutSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                // 스킬 태그들 패럴랙스
                skillTags.forEach((tag, index) => {
                    const speed = (index + 1) * 0.3;
                    const yPos = scrolled * speed * 0.1;
                    tag.style.transform += ` translateY(${yPos}px)`;
                });
                
                // 장식 요소들 패럴랙스
                decorativeIcons.forEach((icon, index) => {
                    const speed = (index + 1) * 0.2;
                    const yPos = scrolled * speed * 0.1;
                    icon.style.transform += ` translateY(${yPos}px)`;
                });
            }
        }
    });
    
    // About 섹션 진입 시 전체 애니메이션 트리거
    const aboutSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // 순차적 애니메이션 실행
                setTimeout(() => triggerSequentialAnimations(), 500);
            }
        });
    }, { threshold: 0.3 });
    
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        aboutSectionObserver.observe(aboutSection);
    }
    
    // 순차적 애니메이션 함수
    function triggerSequentialAnimations() {
        // 1. 메인 타이틀 애니메이션
        const aboutLabel = document.querySelector('.about-label');
        if (aboutLabel) {
            aboutLabel.style.animation = 'slideInLeft 0.8s ease-out';
        }
        
        // 2. Me 텍스트 애니메이션 (0.3초 후)
        setTimeout(() => {
            if (meText) {
                meText.style.animation = 'slideInRight 1s ease-out';
            }
        }, 300);
        
        // 3. 설명 텍스트 애니메이션 (0.6초 후)
        setTimeout(() => {
            const englishTitle = document.querySelector('.english-title');
            const koreanSubtitle = document.querySelector('.korean-subtitle');
            
            if (englishTitle) englishTitle.style.animation = 'fadeInUp 1.2s ease-out';
            if (koreanSubtitle) koreanSubtitle.style.animation = 'fadeInUp 1.4s ease-out';
        }, 600);
        
        // 4. 스킬 태그들 애니메이션 (1초 후)
        setTimeout(() => {
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.animation = `popIn 0.8s ease-out`;
                }, index * 100);
            });
        }, 1000);
    }
    
    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // 스킬 태그들에 포커스 표시
            skillTags.forEach(tag => {
                tag.setAttribute('tabindex', '0');
                
                tag.addEventListener('focus', function() {
                    this.style.outline = '3px solid #21a0aa';
                    this.style.outlineOffset = '5px';
                });
                
                tag.addEventListener('blur', function() {
                    this.style.outline = 'none';
                });
                
                tag.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        this.click();
                    }
                });
            });
        }
    });
    
    console.log('About Me Section JavaScript initialized! ✨');
}

// Project Section 기능
function initProjectSection() {
    // Project Cards 인터랙션
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // 카드 호버 효과 강화
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
            
            // 카드 번호 애니메이션
            const cardNumber = this.querySelector('.card-number');
            if (cardNumber) {
                cardNumber.style.transform = 'scale(1.1) rotate(5deg)';
                cardNumber.style.color = '#f94f46';
            }
            
            // 모형 디바이스 애니메이션
            const mockupDevice = this.querySelector('.mockup-device');
            if (mockupDevice) {
                mockupDevice.style.transform = 'scale(1.05) rotateY(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            // 카드 번호 원상복구
            const cardNumber = this.querySelector('.card-number');
            if (cardNumber) {
                cardNumber.style.transform = 'scale(1) rotate(0deg)';
                cardNumber.style.color = '#209da3';
            }
            
            // 모형 디바이스 원상복구
            const mockupDevice = this.querySelector('.mockup-device');
            if (mockupDevice) {
                mockupDevice.style.transform = 'scale(1) rotateY(0deg)';
            }
        });
        
        // 카드 클릭 이벤트
        card.addEventListener('click', function() {
            const projectNumber = this.getAttribute('data-project');
            const companyName = this.querySelector('.company-name').textContent;
            
            // 클릭 애니메이션
            this.style.transform = 'translateY(-20px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }, 150);
            
            // 프로젝트 상세 정보 표시 (추후 확장 가능)
            console.log(`Project ${projectNumber}: ${companyName} clicked!`);
            
            // 모달이나 상세 페이지로 이동하는 기능 추가 가능
            showProjectDetails(projectNumber, companyName);
        });
    });
    
    // Team Project 배너 인터랙션
    const teamBanner = document.querySelector('.team-project-banner');
    if (teamBanner) {
        teamBanner.addEventListener('click', function() {
            // 배너 클릭 시 반짝이는 효과
            this.style.background = 'linear-gradient(45deg, #0c0c0c, #21a0aa, #0c0c0c)';
            this.style.backgroundSize = '200% 200%';
            this.style.animation = 'gradient-shift 2s ease-in-out';
            
            setTimeout(() => {
                this.style.background = '#0c0c0c';
                this.style.animation = 'slideInUp 1s ease-out';
            }, 2000);
            
            console.log('Team Project banner clicked!');
        });
    }
    
    // 프로젝트 타이틀 타이핑 효과
    const projectTitle = document.querySelector('.project-title');
    if (projectTitle) {
        let isTyping = false;
        
        projectTitle.addEventListener('click', function() {
            if (!isTyping) {
                isTyping = true;
                const originalText = this.textContent;
                
                // 타이핑 효과 시작
                this.textContent = '';
                this.style.borderRight = '3px solid #f94f46';
                
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                    if (charIndex < originalText.length) {
                        this.textContent += originalText.charAt(charIndex);
                        charIndex++;
                    } else {
                        clearInterval(typeInterval);
                        this.style.borderRight = 'none';
                        isTyping = false;
                    }
                }, 150);
            }
        });
    }
    
    // 장식 요소들 인터랙션
    const floatingShapes = document.querySelectorAll('.shape');
    floatingShapes.forEach((shape, index) => {
        shape.addEventListener('click', function() {
            // 랜덤 색상으로 변경
            const colors = ['#fdcb2a', '#ec8e91', '#21a0aa', '#f94f46', '#66b0f0'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            this.style.backgroundColor = randomColor;
            this.style.transform = 'scale(1.5) rotate(720deg)';
            this.style.boxShadow = `0 0 30px ${randomColor}`;
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.boxShadow = 'none';
            }, 1000);
        });
    });
    
    // 프로젝트 아이콘들 애니메이션
    const projectIcons = document.querySelectorAll('.project-icons > div');
    projectIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.filter = 'brightness(1.3) saturate(1.5)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1) saturate(1)';
        });
        
        icon.addEventListener('click', function() {
            // 아이콘별 특별 효과
            if (this.classList.contains('icon-chart')) {
                this.style.animation = 'pulse 0.5s ease-in-out 3';
            } else if (this.classList.contains('icon-device')) {
                this.style.animation = 'bounce 0.5s ease-in-out 3';
            } else if (this.classList.contains('icon-palette')) {
                this.style.animation = 'rotate 1s linear 2';
            }
        });
    });
    
    // 스크롤 기반 카드 애니메이션
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 카드 번호 카운트 애니메이션
                const cardNumber = entry.target.querySelector('.card-number');
                if (cardNumber) {
                    const targetNumber = parseInt(cardNumber.textContent);
                    let currentNumber = 0;
                    
                    const countInterval = setInterval(() => {
                        if (currentNumber <= targetNumber) {
                            cardNumber.textContent = currentNumber.toString().padStart(2, '0');
                            currentNumber++;
                        } else {
                            clearInterval(countInterval);
                        }
                    }, 100);
                }
            }
        });
    }, { threshold: 0.3 });
    
    // 프로젝트 카드들 관찰
    projectCards.forEach(card => {
        observer.observe(card);
        
        // 초기 상태 설정
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease-out';
    });
    
    // 하이라이트 바 애니메이션
    const highlightBar = document.querySelector('.highlight-bar');
    if (highlightBar) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const projectSection = document.querySelector('.project-section');
            
            if (projectSection) {
                const rect = projectSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const scrollProgress = Math.min(
                        (window.innerHeight - rect.top) / window.innerHeight,
                        1
                    );
                    highlightBar.style.width = `${scrollProgress * 100}%`;
                    highlightBar.style.opacity = scrollProgress * 0.5;
                }
            }
        });
    }
    
    // 키보드 네비게이션
    document.addEventListener('keydown', function(e) {
        if (e.key >= '1' && e.key <= '3') {
            const cardIndex = parseInt(e.key) - 1;
            if (projectCards[cardIndex]) {
                projectCards[cardIndex].focus();
                projectCards[cardIndex].click();
            }
        }
    });
    
    // 프로젝트 카드들에 포커스 가능하도록 설정
    projectCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('focus', function() {
            this.style.outline = '3px solid #21a0aa';
            this.style.outlineOffset = '5px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
    
    console.log('Project Section JavaScript initialized! 🚀');
}

// 프로젝트 상세 정보 표시 함수
function showProjectDetails(projectNumber, companyName) {
    // 간단한 알림으로 구현 (추후 모달로 확장 가능)
    const projectDetails = {
        '01': {
            company: 'SM Entertainment',
            description: 'K-pop 아티스트와 팬을 연결하는 혁신적인 플랫폼 리디자인',
            technologies: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
            duration: '3 months',
            team: '4 designers'
        },
        '02': {
            company: 'IGLOO Corporation',
            description: '보안 솔루션의 사용자 경험 개선 및 인터페이스 현대화',
            technologies: ['Enterprise UX', 'Dashboard Design', 'Information Architecture'],
            duration: '4 months',
            team: '3 designers, 2 developers'
        },
        '03': {
            company: 'Tamburins Cosmetic',
            description: '프리미엄 화장품 브랜드의 온라인 쇼핑 경험 혁신',
            technologies: ['E-commerce UX', 'Mobile Design', 'Brand Identity'],
            duration: '5 months',
            team: '5 designers, 1 brand strategist'
        }
    };
    
    const details = projectDetails[projectNumber];
    if (details) {
        // 콘솔에 상세 정보 출력 (추후 모달이나 사이드패널로 확장)
        console.log('=== Project Details ===');
        console.log(`Company: ${details.company}`);
        console.log(`Description: ${details.description}`);
        console.log(`Technologies: ${details.technologies.join(', ')}`);
        console.log(`Duration: ${details.duration}`);
        console.log(`Team: ${details.team}`);
        console.log('=====================');
        
        // 실제 프로젝트에서는 여기에 모달이나 새 페이지 로직 추가
        // showModal(details) 또는 window.open(`/project/${projectNumber}`)
    }
}

// CSS에 필요한 추가 애니메이션
const style = document.createElement('style');
style.textContent = `
    @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .project-card:focus {
        outline: 3px solid #21a0aa;
        outline-offset: 5px;
    }
    
    .mockup-device {
        perspective: 1000px;
    }
    
    .device-screen {
        transform-style: preserve-3d;
    }
`;
document.head.appendChild(style);

// UIUX Section 기능
function initUIUXSection() {
    // UIUX Cards 인터랙션
    const uiuxCards = document.querySelectorAll('.uiux-card');
    
    uiuxCards.forEach((card, index) => {
        // 카드 호버 효과 강화
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            
            // 브라우저 점 애니메이션
            const dots = this.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                setTimeout(() => {
                    dot.style.transform = 'scale(1.2)';
                    dot.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
                }, i * 100);
            });
            
            // 프로젝트 프리뷰 확대
            const preview = this.querySelector('.project-preview');
            if (preview) {
                preview.style.transform = 'scale(1.08) rotate(1deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            // 브라우저 점 원상복구
            const dots = this.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = 'none';
            });
            
            // 프로젝트 프리뷰 원상복구
            const preview = this.querySelector('.project-preview');
            if (preview) {
                preview.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // 카드 클릭 이벤트
        card.addEventListener('click', function() {
            const projectType = this.getAttribute('data-project');
            const projectName = this.querySelector('.project-name').textContent;
            
            // 클릭 애니메이션
            this.style.transform = 'translateY(-20px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }, 150);
            
            // 프로젝트 정보 표시
            showUIUXProjectDetails(projectType, projectName);
        });
        
        // 브라우저 점들 개별 클릭 이벤트
        const dots = card.querySelectorAll('.dot');
        dots.forEach((dot, dotIndex) => {
            dot.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // 점 클릭 시 색상 변경
                const colors = ['#ff5f57', '#ffbd2e', '#28ca42'];
                this.style.backgroundColor = colors[dotIndex % colors.length];
                
                // 파급 효과
                this.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            });
        });
    });
    
    // UIUX 제목 클릭 이벤트
    const uiuxTitle = document.querySelector('.uiux-title');
    if (uiuxTitle) {
        uiuxTitle.addEventListener('click', function() {
            // 글자별 개별 애니메이션
            const letters = this.textContent.split('');
            this.innerHTML = '';
            
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(-50px) rotateX(90deg)';
                span.style.transition = 'all 0.6s ease';
                span.style.transitionDelay = `${index * 0.1}s`;
                
                this.appendChild(span);
                
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0) rotateX(0deg)';
                }, index * 100);
            });
        });
    }
    
    // 스크롤 기반 카드 스태거 애니메이션
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const uiuxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.uiux-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);
    
    const uiuxProjects = document.querySelector('.uiux-projects');
    if (uiuxProjects) {
        uiuxObserver.observe(uiuxProjects);
        
        // 초기 상태 설정
        uiuxCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease-out';
        });
    }
    
    // 마우스 기반 패럴랙스 효과
    const uiuxSection = document.querySelector('.uiux-section');
    if (uiuxSection) {
        uiuxSection.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            uiuxCards.forEach((card, index) => {
                const factor = (index + 1) * 2;
                const moveX = (x - 0.5) * factor;
                const moveY = (y - 0.5) * factor;
                
                card.style.transform += ` translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        uiuxSection.addEventListener('mouseleave', function() {
            uiuxCards.forEach(card => {
                card.style.transform = card.style.transform.replace(/translate\([^)]*\)/g, '');
            });
        });
    }
    
    console.log('UIUX Section JavaScript initialized! 🎨');
}

// Contact Section 기능
function initContactSection() {
    // Contact 제목 애니메이션
    const contactTitle = document.querySelector('.contact-title');
    if (contactTitle) {
        let isAnimating = false;
        
        contactTitle.addEventListener('click', function() {
            if (!isAnimating) {
                isAnimating = true;
                
                // 글리치 효과
                this.style.textShadow = `
                    2px 0 #ff0000,
                    -2px 0 #00ff00,
                    0 2px #0000ff
                `;
                this.style.transform = 'skew(-5deg)';
                
                setTimeout(() => {
                    this.style.textShadow = 'none';
                    this.style.transform = 'skew(0deg)';
                    isAnimating = false;
                }, 500);
            }
        });
    }
    
    // ME 라벨 인터랙션
    const meLabel = document.querySelector('.me-label');
    if (meLabel) {
        meLabel.addEventListener('click', function() {
            // 회전 및 색상 변경
            const colors = ['#f94f46', '#21a0aa', '#fdcb2a', '#ec8e91'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            this.style.backgroundColor = randomColor;
            this.style.transform = 'rotate(360deg) scale(1.2)';
            
            setTimeout(() => {
                this.style.backgroundColor = '#f94f46';
                this.style.transform = 'rotate(-2deg) scale(1)';
            }, 800);
        });
        
        // 마우스 따라다니는 효과
        meLabel.addEventListener('mouseenter', function() {
            this.style.transition = 'none';
        });
        
        meLabel.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `rotate(-2deg) translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        meLabel.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'rotate(-2deg) translate(0, 0)';
        });
    }
    
    // 전화번호 인터랙션
    const phoneContainer = document.querySelector('.phone-container');
    const phoneNumber = document.querySelector('.phone-number');
    
    if (phoneContainer && phoneNumber) {
        phoneContainer.addEventListener('click', function() {
            // 전화번호 복사 기능
            navigator.clipboard.writeText(phoneNumber.textContent.replace(/\s/g, '')).then(() => {
                // 복사 성공 피드백
                const originalText = phoneNumber.textContent;
                phoneNumber.textContent = 'COPIED!';
                phoneContainer.style.backgroundColor = '#21a0aa';
                
                setTimeout(() => {
                    phoneNumber.textContent = originalText;
                    phoneContainer.style.backgroundColor = '#fdcb2a';
                }, 1500);
            });
            
            // 진동 효과
            this.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = 'none';
            }, 500);
        });
        
        // 전화번호 타이핑 효과
        phoneContainer.addEventListener('mouseenter', function() {
            if (!phoneNumber.dataset.animated) {
                phoneNumber.dataset.animated = 'true';
                const originalText = phoneNumber.textContent;
                phoneNumber.textContent = '';
                
                let index = 0;
                const typeInterval = setInterval(() => {
                    if (index < originalText.length) {
                        phoneNumber.textContent += originalText.charAt(index);
                        index++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 100);
            }
        });
    }
    
    // 이메일 인터랙션
    const emailAddress = document.querySelector('.email-address');
    if (emailAddress) {
        emailAddress.addEventListener('click', function() {
            // 이메일 클라이언트 열기
            window.location.href = `mailto:${this.textContent}`;
        });
        
        emailAddress.addEventListener('mouseenter', function() {
            // 언더라인 애니메이션
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            const underline = document.createElement('div');
            underline.style.cssText = `
                position: absolute;
                bottom: 0;
                left: -100%;
                width: 100%;
                height: 2px;
                background-color: #fdcb2a;
                transition: left 0.3s ease;
            `;
            
            this.appendChild(underline);
            
            setTimeout(() => {
                underline.style.left = '0';
            }, 10);
        });
        
        emailAddress.addEventListener('mouseleave', function() {
            const underline = this.querySelector('div');
            if (underline) {
                underline.style.left = '100%';
                setTimeout(() => {
                    if (underline.parentNode) {
                        underline.parentNode.removeChild(underline);
                    }
                }, 300);
            }
        });
    }
    
    // Contact 질문 텍스트 효과
    const contactQuestion = document.querySelector('.contact-question');
    if (contactQuestion) {
        contactQuestion.addEventListener('click', function() {
            // 단어별 강조 효과
            const words = this.innerHTML.split(' ');
            this.innerHTML = words.map((word, index) => 
                `<span style="transition: all 0.3s ease; transition-delay: ${index * 0.1}s;">${word}</span>`
            ).join(' ');
            
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.style.color = '#fdcb2a';
                    span.style.transform = 'scale(1.1)';
                    
                    setTimeout(() => {
                        span.style.color = '#ffffff';
                        span.style.transform = 'scale(1)';
                    }, 300);
                }, index * 100);
            });
        });
    }
    
    // 스크롤 기반 카운터 애니메이션
    const phoneText = document.querySelector('.phone-number');
    if (phoneText) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !phoneText.dataset.counted) {
                    phoneText.dataset.counted = 'true';
                    
                    // 숫자 카운트 업 효과
                    const finalText = phoneText.textContent;
                    const numbers = finalText.match(/\d/g);
                    
                    if (numbers) {
                        phoneText.textContent = finalText.replace(/\d/g, '0');
                        
                        let counter = 0;
                        const countInterval = setInterval(() => {
                            if (counter < 10) {
                                phoneText.textContent = finalText.replace(/\d/g, () => 
                                    Math.floor(Math.random() * 10)
                                );
                                counter++;
                            } else {
                                phoneText.textContent = finalText;
                                clearInterval(countInterval);
                            }
                        }, 100);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(phoneText);
    }
    
    console.log('Contact Section JavaScript initialized! 📞');
}

// UIUX 프로젝트 상세 정보 표시 함수
function showUIUXProjectDetails(projectType, projectName) {
    const projectDetails = {
        'tamburins1': {
            name: 'Tamburins Cosmetic - 브랜드 리뉴얼',
            description: '프리미엄 향수 브랜드의 디지털 경험 혁신',
            techniques: ['Brand Identity', 'UI Design', 'User Research', 'Prototyping'],
            completion: '2025.08'
        },
        'tamburins2': {
            name: 'Tamburins Cosmetic - 모바일 앱',
            description: '개인화된 향수 추천 시스템 구축',
            techniques: ['Mobile UX', 'Personalization', 'AR Experience'],
            completion: '2025.08'
        },
        'battery1': {
            name: 'Battery Deponted - 웹 플랫폼',
            description: '친환경 배터리 재활용 서비스 플랫폼',
            techniques: ['Web Design', 'Information Architecture', 'Sustainability UX'],
            completion: '2025.08'
        },
        'battery2': {
            name: 'Battery Deponted - 대시보드',
            description: '관리자용 배터리 현황 모니터링 시스템',
            techniques: ['Dashboard Design', 'Data Visualization', 'Admin UX'],
            completion: '2025.08'
        },
        'kpop': {
            name: 'K-pop Experience Platform',
            description: '글로벌 K-pop 팬들을 위한 인터랙티브 플랫폼',
            techniques: ['Interactive Design', 'Global UX', 'Entertainment Platform'],
            completion: '2025.08'
        },
        'kb-bank': {
            name: 'KB국민은행 디지털 뱅킹',
            description: '차세대 모바일 뱅킹 서비스 UX/UI 개선',
            techniques: ['Financial UX', 'Security Design', 'Accessibility', 'Mobile Banking'],
            completion: '2025.08'
        }
    };
    
    const details = projectDetails[projectType];
    if (details) {
        console.log('=== UIUX Project Details ===');
        console.log(`Project: ${details.name}`);
        console.log(`Description: ${details.description}`);
        console.log(`Techniques: ${details.techniques.join(', ')}`);
        console.log(`Completion: ${details.completion}`);
        console.log('===========================');
    }
}

// 추가 CSS 애니메이션
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(1deg); }
        25% { transform: translateX(-5px) rotate(-1deg); }
        75% { transform: translateX(5px) rotate(1deg); }
    }
    
    .uiux-card {
        perspective: 1000px;
    }
    
    .project-preview {
        transform-style: preserve-3d;
    }
    
    .contact-question span {
        display: inline-block;
    }
`;
document.head.appendChild(additionalStyle);
