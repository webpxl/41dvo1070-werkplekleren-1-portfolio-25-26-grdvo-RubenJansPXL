function showPrivacyPolicy(event) {
    event.preventDefault();
    const modal = document.getElementById('privacyModal');
    const contentDiv = document.getElementById('privacyContent');

    fetch('privacy.txt')
        .then(response => response.text())
        .then(text => {
            contentDiv.innerHTML = text
                .split('\n\n')
                .map(paragraph => {
                    if (paragraph.trim().match(/^\d+\./)) {
                        const match = paragraph.match(/^\d+\.\s+(.+?)$/m);
                        if (match) {
                            return `<h2>${match[1]}</h2>`;
                        }
                    }
                    if (paragraph.trim()) {
                        return `<p>${paragraph.trim().replace(/\n/g, '<br>')}</p>`;
                    }
                    return '';
                })
                .join('');
            modal.style.display = 'flex';
        })
        .catch(error => {
            contentDiv.innerHTML = '<p>Kon privacy policy niet laden. Probeer het later opnieuw.</p>';
            modal.style.display = 'flex';
            console.error('Error loading privacy.txt:', error);
        });
}

function closePrivacyPolicy() {
    const modal = document.getElementById('privacyModal');
    modal.style.display = 'none';
}

function showProjectDetails(title, text) {
    const modal = document.getElementById('projectModal');
    const contentDiv = document.getElementById('projectContent');

    contentDiv.innerHTML = `
        <h2>${title}</h2>
        <p>${text}</p>
    `;
    modal.style.display = 'flex';
}

function closeProjectDetails() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}

document.addEventListener('click', (e) => {
    const privacyModal = document.getElementById('privacyModal');
    const projectModal = document.getElementById('projectModal');
    if (e.target === privacyModal) {
        privacyModal.style.display = 'none';
    }
    if (e.target === projectModal) {
        projectModal.style.display = 'none';
    }
});

function downloadReflectie() {
    const content = "EINDREFLECTIE\n\n" +
        "Rol 1:\nAls creatieve vormgever ontwerp ik beelden die niet alleen esthetisch zijn, maar ook functioneel. Met vormen, kleuren en compositie geef ik ideeën vorm tot designs die de aandacht trekken en de gebruiker begeleiden. Of het nu gaat om een logo of een complete interface, ik werk tot in detail om elk ontwerp kloppend te maken.\n\n" +
        "Rol 2:\nAls front-end developer breng ik ideeën tot leven in interactieve websites en applicaties. Met overzichtelijke en doordachte code in HTML, CSS en JavaScript zorg ik voor oplossingen die zowel technisch sterk als gebruiksvriendelijk zijn. Problemen zie ik als puzzels: ik analyseer ze, denk vooruit en vind een slimme route naar een werkende oplossing. Van een lastige bug tot een complexe functionaliteit, ik combineer logica met creativiteit om elk obstakel aan te pakken.\n\n\n" +
        "Rol 3:\nIk hecht veel waarde aan duidelijke communicatie en teamwork. Binnen een team durf ik mijn ideeën te delen en knelpunten te benoemen, zodat we samen tot betere oplossingen komen. Ik sta open voor de inbreng van anderen, werk prettig samen en neem actief verantwoordelijkheid. In zowel het Nederlands als het Engels communiceer ik helder, zodat iedereen weet waar we naartoe werken.\n\n\n" +
        "Rol 4:\nDesign en technologie zijn voortdurend in beweging, en juist dat inspireert mij. Ik ben altijd nieuwsgierig naar nieuwe tools, technieken en ontwikkelingen, en blijf mezelf uitdagen om bij te leren. Elke nieuwe uitdaging zie ik als een kans om te groeien en mijn vaardigheden verder te versterken. Met deze leergierige mindset blijf ik me ontwikkelen binnen dit dynamische vakgebied.\n";

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", "eindreflectie.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString();
    }

    const mailButton = document.getElementById("mailBtn");

    mailButton.addEventListener("click", () => {
        window.location.href = "mailto:rubenjans@outlook.com";
    });

    const navLinks = document.querySelectorAll('a.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href')?.substring(1);
            const targetEl = targetId ? document.getElementById(targetId) : null;
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, '', `#${targetId}`);
            }
        });
    });

    const sections = Array.from(document.querySelectorAll('[id]')).filter(el => {
        return el.tagName === 'ARTICLE' || el.tagName === 'SECTION' || el.tagName === 'DIV' && el.closest('main');
    });
    const linkMap = new Map(
        Array.from(navLinks).map(l => [l.getAttribute('href')?.substring(1), l])
    );

    const setActive = (id) => {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = linkMap.get(id);
        if (link) link.classList.add('active');
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                setActive(id);
            }
        });
    }, { root: null, threshold: 0.6 });

    sections.forEach(sec => observer.observe(sec));

    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));

    const toggleButtons = document.querySelectorAll('.toggle-text');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const paragraph = button.previousElementSibling;
            const fullText = paragraph.getAttribute('data-full-text');

            if (paragraph.textContent.includes('...')) {
                paragraph.textContent = fullText;
                button.textContent = 'View Less';
            } else {
                paragraph.textContent = fullText.substring(0, 100) + '...';
                button.textContent = 'View More';
            }
        });
    });

    const projectButtons = document.querySelectorAll('.project-card button');
    const projectTexts = [
        'In de richting Decor, Etalage & Publiciteit hebben wij voor het vak Grafisch Design met onze klas een originele galabal poster moeten ontwerpen. Door deze opdracht heb ik geleerd dat inspiratie opzoeken heel belangrijk is.',
        'Voor het vak Waarnemingstekenen hebben wij een foto van een sculptuur moeten kiezen en zo goed mogelijk na moeten tekenen. Dit hebben wij gedaan zonder de afmetingen te meten met een lat maar wel met onze potloden.',
        'Dit is mijn favoriet boek dat ik dit jaar heb gelezen. De titel is A Bad Pair en het gaat over Gray en Axel die elkaar ontmoeten bij toeval, zich onbewust van de vloedgolven die ze in elkaars leven teweegbrengen.'
    ];
    projectButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = Array.from(projectButtons).indexOf(button);
            const card = button.closest('.project-card');
            const title = card?.querySelector('h3')?.textContent || 'Project details';
            showProjectDetails(title, projectTexts[index] || 'Meer informatie volgt binnenkort!');
        });
    });
});
