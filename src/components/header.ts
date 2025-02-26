export const renderHeader = () => {
  const header = document.createElement("header");

  const currentUrl = new URL(window.location.href);

  header.innerHTML = `
    <header class="main-header">
      <div class="container">
        <p>Classroom</p>
        <a href="/estudiantes"${
          currentUrl.pathname === "/estudiantes" ? " class='active'" : ""
        }>Estudiantes</a>
        <a href="/cursos"${
          currentUrl.pathname === "/cursos" ? " class='active'" : ""
        }>Cursos</a>
        <a href="/notas"${
          currentUrl.pathname === "/notas" ? " class='active'" : ""
        }>Notas</a>
        <a href="/estadisticas"${
          currentUrl.pathname === "/estadisticas" ? " class='active'" : ""
        }>Estadísticas</a>
      </div>
    </header>
  `;

  document.body.prepend(header);
};
