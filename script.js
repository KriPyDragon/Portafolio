// Función para mostrar la sección seleccionada
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';

    // Si se selecciona la sección de proyectos, cargar los repositorios de GitHub
    if (sectionId === 'projects') {
        loadGitHubProjects();
    }
}

// Función para cargar los repositorios de GitHub
async function loadGitHubProjects() {
    const response = await fetch('https://api.github.com/users/KriPyDragon/repos');
    const projects = await response.json();

    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = ''; // Limpiar la lista antes de cargar

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.name;

        const projectLink = document.createElement('a');
        projectLink.href = project.html_url;
        projectLink.target = '_blank';
        projectLink.textContent = 'Ver en GitHub';

        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectLink);
        projectsList.appendChild(projectCard);
    });
}

// Mostrar la sección de "Sobre mí" por defecto al cargar la página
window.onload = () => {
    showSection('about');
};
