// Función para mostrar la sección seleccionada
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';

        // Desplazamiento suave
        setTimeout(() => {
            selectedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
    }

    // Cargar proyectos o habilidades si es necesario
    if (sectionId === 'projects') loadGitHubProjects();
    if (sectionId === 'skills') loadSkills();
}

// Función para cargar los repositorios de GitHub con descripción
async function loadGitHubProjects() {
    const projectsList = document.getElementById('projects-list');
    if (!projectsList) return;
    projectsList.innerHTML = '<p>Cargando proyectos...</p>'; // Indicador de carga

    try {
        const response = await fetch('https://api.github.com/users/KriPyDragon/repos');
        if (!response.ok) throw new Error('Error al obtener los repositorios');
        
        const projects = await response.json();
        projectsList.innerHTML = ''; // Limpiar lista

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description || "No hay descripción disponible."}</p>
                <a href="${project.html_url}" target="_blank">Ver en GitHub</a>
            `;

            projectsList.appendChild(projectCard);
        });
    } catch (error) {
        projectsList.innerHTML = '<p>Error al cargar los proyectos. Inténtalo más tarde.</p>';
        console.error(error);
    }
}

// Función para cargar las habilidades
function loadSkills() {
    const skills = [
        { name: "JavaScript", level: "90%" },
        { name: "Python", level: "85%" },
        { name: "Java", level: "80%" },
        { name: "React", level: "75%" },
        { name: "SQL", level: "80%" }
    ];

    const skillsContainer = document.getElementById('skills-list');
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = ''; // Limpiar antes de cargar

    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');

        skillItem.innerHTML = `
            <p>${skill.name}</p>
            <div class="skill-bar">
                <div class="skill-fill" style="width: ${skill.level};"></div>
            </div>
        `;

        skillsContainer.appendChild(skillItem);
    });
}

// Mostrar la sección de "Sobre mí" por defecto al cargar la página
window.onload = () => showSection('about');

// Agregar eventos de clic a los enlaces de navegación
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        showSection(link.getAttribute('href').substring(1));
    });
});

// Agregar evento de clic al botón de descarga de CV
document.getElementById('download-cv')?.addEventListener('click', () => {
    const cvUrl = 'assets/Imagenes/Nick CV.pdf';
    
    fetch(cvUrl)
        .then(response => {
            if (!response.ok) throw new Error('Archivo no encontrado');
            window.open(cvUrl, '_blank');
        })
        .catch(error => alert('El CV no está disponible en este momento.'));
});
