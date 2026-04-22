(function() {
        // ---------- DATI PROGETTI (con immagini) ----------
        const projectsDB = {
            'calcolatrice': {
                title: 'BusConnect',
                shortDesc: "BusConnect è un progetto che tende una mano ad anziani in difficoltà con l'informatica.",
                fullDesc: 'Il BusConnect è stato un progetto molto interessante dove abbiamo imparato a sfruttare le nostre conoscenze per insegnare ad altri. Il progetto ci fa conoscere nuove prospettive e nuovi punti di vista grazie alle domande insolite degli anziani.',
                icon: 'fas fa-calculator',
                tech: ['pc'],
                year: '3° anno',
                imageUrl: 'img/busconnect.jpg'      // 👈 Aggiunto
            },
            'tris': {
                title: 'Monta e smonta',
                shortDesc: 'Un primo approccio al sistema hardware con le nostre mani',
                fullDesc: "'Monta e Smonta' è un progetto educativo che insegna agli studenti come assemblare e disassemblare componenti hardware di un computer. L'obiettivo è fornire una comprensione pratica delle tecnologie che utilizziamo ogni giorno. Durante il progetto, gli studenti imparano a identificare i componenti principali di un computer, come la scheda madre, il processore, la RAM e il disco rigido, e a montarli correttamente.",
                icon: 'fas fa-chess-board',
                tech: ['cacciavite'],
                year: '3° anno',
                imageUrl: 'img/foto.jpg'                         // Nessuna immagine (placeholder)
            },
            'libreria': {
                title: 'Progetto UST',
                shortDesc: 'Il progetto ci ha dato le basi sul lavoro',
                fullDesc: "Il professor Vairo ha illustrato in dettaglio i vari modelli di lavoro, spiegando la distinzione tra il lavoro subordinato, in cui si è dipendenti di un datore di lavoro, e quello autonomo, dove si opera in proprio. Ha anche chiarito le aspettative che un'impresa ha nei confronti di noi, delineando le modalità con cui potremmo entrare nel mondo del lavoro.",
                icon: 'fas fa-book',
                tech: ['ascolto'],
                year: '3° anno',
                imageUrl: 'img/UST.jpg'              // 👈 Aggiunto
            },
            'weather': {
                title: 'Confindustria - Mi presento',
                shortDesc: 'Basi di una presentazione personale',
                fullDesc: 'Percorso intensivo di orientamento al lavoro centrato sulla presentazione personale. Che ci ha aiutato a comprendere come creare un CV ben fatto e produttivo, a comunicare in modo professionale.',
                icon: 'fas fa-cloud-sun',
                tech: ['lavoro','orientamento'],
                year: '4° anno',
                imageUrl: 'img/confindustria.jpg'     // 👈 Aggiunto
            },
            'social': {
                title: 'CNA',
                shortDesc: 'Attività formativa al Tecnopolo',
                fullDesc: 'Hanno spiegato in modo molto preciso il tema imprese, approfondendo sulle principali tipologie di contratti e i diritti e doveri dei lavoratori.',
                icon: 'fas fa-users',
                tech: ['lavoro','professioni'],
                year: '4° anno',
                imageUrl: 'img/cna.jpg'               // 👈 Aggiunto
            },
            'ecommerce': {
                title: 'Polarity',
                shortDesc: 'Scoperta del settore IT',
                fullDesc: 'Abbiamo incontrato i lavoratori professionisti di Polarity che ci hanno fatto apprendere il settore IT, le sue attività, i servizi offerti e il funzionamento di una azienda simile.',
                icon: 'fas fa-shopping-cart',
                tech: ['Vue.js', 'Vuex', 'Vite'],
                year: '4° anno',
                imageUrl: 'img/polarity.jpg'          // 👈 Aggiunto
            },
            'ascolto': {
                title: 'Ascolto project work',
                shortDesc: 'Esposizione presentazione project work',
                fullDesc: "Si è preso parte a una esposizione delle classi quinte incentrata a far comprendere, in primis, l'arte dell'insegnamento e a noi una nuova prospettiva.",
                icon: 'fas fa-shopping-cart',
                tech: ['ascolto', 'insegnamento', 'Vita'],
                year: '4° anno',
                imageUrl: 'img/ascolto.jpg'           // 👈 Aggiunto
            }
        };

        const projectsByYear = {
            3: ['calcolatrice', 'tris', 'libreria'],
            4: ['weather', 'social', 'ecommerce','ascolto']
        };

        const container3 = document.getElementById('projects-3');
        const container4 = document.getElementById('projects-4');

function createProjectCard(projectId) {
    const p = projectsDB[projectId];
    if (!p) return '';

    // Prepara il contenuto dell'immagine: se esiste imageUrl usa <img>, altrimenti placeholder
    const imageContent = p.imageUrl 
        ? `<img src="${p.imageUrl}" alt="${p.title}">`
        : `<i class="fas fa-image"></i><span>${p.imageHint || 'anteprima'}</span>`;

    return `
        <div class="project-card" data-project-id="${projectId}">
            <div class="project-image">
                ${imageContent}
            </div>
            <div class="project-icon"><i class="${p.icon}"></i></div>
            <div class="project-title">${p.title}</div>
            <div class="project-desc">${p.shortDesc}</div>
            <div class="project-tech">
                ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            <button class="detail-btn"><i class="fas fa-info-circle"></i> Dettagli</button>
        </div>
    `;
}

        function renderAllProjects() {
            if (container3) container3.innerHTML = projectsByYear[3].map(id => createProjectCard(id)).join('');
            if (container4) container4.innerHTML = projectsByYear[4].map(id => createProjectCard(id)).join('');
        }
        renderAllProjects();

        // ---------- MODALE (con supporto immagini reali) ----------
        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalImage = document.getElementById('modalImage');
        const modalDesc = document.getElementById('modalDesc');
        const modalTech = document.getElementById('modalTech');
        const modalYear = document.getElementById('modalYear');
        const closeBtn = document.getElementById('closeModalBtn');

        function openModal(projectId) {
            const p = projectsDB[projectId];
            if (!p) return;
            modalTitle.textContent = p.title;
            modalDesc.textContent = p.fullDesc;
            modalYear.textContent = p.year;

            // 👇 Mostra immagine reale se presente, altrimenti placeholder
            if (p.imageUrl) {
                modalImage.innerHTML = `<img src="${p.imageUrl}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover; border-radius:20px;">`;
            } else {
                modalImage.innerHTML = `<i class="fas fa-image"></i> <span>${p.imageHint || 'Screenshot / demo'}</span>`;
            }

            modalTech.innerHTML = p.tech.map(t => `<span class="tech-tag" style="font-size:0.9rem;">${t}</span>`).join('');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        document.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (!card) return;
            const projectId = card.dataset.projectId;
            if (projectId) openModal(projectId);
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

        // ---------- NIGHT MODE TOGGLE ----------
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const icon = themeToggle.querySelector('i');

        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.querySelector('span').textContent = 'Light mode';
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                themeToggle.querySelector('span').textContent = 'Light mode';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                themeToggle.querySelector('span').textContent = 'Night mode';
                localStorage.setItem('theme', 'light');
            }
        });

        // Effetto hover titolo
        const h1 = document.querySelector('h1');
        if(h1) {
            h1.addEventListener('mouseenter', () => h1.style.letterSpacing = '0.8px');
            h1.addEventListener('mouseleave', () => h1.style.letterSpacing = 'normal');
        }
    })();