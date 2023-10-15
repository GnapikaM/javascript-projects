// Variable Declarations and Constants

const jsonProjectsURL = "json/projects.json";
const projectsContainer = document.querySelector(".project-container");
const categoryButtons = document.querySelectorAll(".categories li");

// Functions

// Function to create a project card
function createProjectCard(projectData) {
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project");

  const dataAosValue = "fade-up";
  projectContainer.setAttribute("data-aos", dataAosValue);

  const imageElement = document.createElement("img");
  imageElement.src = projectData.image;

  const contentElement = document.createElement("div");
  contentElement.classList.add("content");

  const titleElement = document.createElement("h3");
  titleElement.textContent = projectData.title;

  const descriptionElement = document.createElement("p");
  descriptionElement.innerHTML = projectData.desc;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons");

  const demoElement = document.createElement("a");
  demoElement.setAttribute("href", projectData.website);
  demoElement.textContent = "Visit Website";

  const codeElement = document.createElement("a");
  codeElement.setAttribute("href", projectData.code);
  codeElement.textContent = "View Code";

  buttonsContainer.appendChild(demoElement);
  buttonsContainer.appendChild(codeElement);

  contentElement.appendChild(titleElement);
  contentElement.appendChild(descriptionElement);
  contentElement.appendChild(buttonsContainer);

  projectContainer.appendChild(imageElement);
  projectContainer.appendChild(contentElement);

  return projectContainer;
}

let data = [];

// Function to filter and display projects by category
function filterProjects(category) {
  projectsContainer.innerHTML = "";

  data.forEach((projectData) => {
    if (category === "All" || projectData.category === category) {
      const projectCard = createProjectCard(projectData);
      projectsContainer.appendChild(projectCard);
    }
  });
}

// Event Listeners

// Event listeners for category buttons
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    const selectedCategory = button.textContent;
    filterProjects(selectedCategory);
  });
});

// Event listener for 'All' category button
const allSkillsTab = document.querySelector(".all");
if (allSkillsTab) {
  allSkillsTab.addEventListener("click", () => {
    filterProjects("All");
  });
}

// Fetch and display project data
fetch(jsonProjectsURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  })
  .then((fetchedData) => {
    data = fetchedData;

    console.log(data);

    filterProjects("All");
  })
  .catch((error) => {
    console.error("Error: ", error);
  });

// Scroll to top functionality
window.addEventListener("scroll", function () {
  var scroll = document.querySelector(".scrollTop");
  scroll.classList.toggle("toggle-active", window.scrollY > 500);
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Dark and Light Mode toggle
let toggleTheme = document.querySelector(".toggle-theme");
let body = document.body;

toggleTheme.onclick = function () {
  toggleTheme.classList.toggle("toggle-active");
  body.classList.toggle("light");
};

// Smart Slider
const contactIcons = document.querySelectorAll(".smartSlider .icons a");
const contactIcon = document.querySelector('ion-icon[name="person"]');

let isContactOpen = false;

contactIcon.addEventListener("click", () => {
  isContactOpen = !isContactOpen;
  console.log("CLicked on you");
  contactIcons.forEach((icon, index) => {
    const delay = isContactOpen ? index * 50 : 0;
    setTimeout(() => {
      icon.style.display = isContactOpen ? "block" : "none";
    }, delay);
  });
});
