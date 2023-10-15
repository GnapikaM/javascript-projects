// Variable declarations and constants
const accordionHeaders = document.querySelectorAll(".accordion-header");
const displaySkills = document.querySelector(".display");
const skillCategories = document.querySelectorAll(".skill-category");
const jsonFileUrl = "json/skills.json";

// Functions

// Function to create a skill card
function createSkillCard(skillData) {
  const skillCard = document.createElement("div");
  skillCard.classList.add("skill");

  const dataAosValue = "zoom-in";
  skillCard.setAttribute("data-aos", dataAosValue);

  const skillNameContainer = document.createElement("div");
  skillNameContainer.classList.add("skill-name");

  const h3Element = document.createElement("h3");
  h3Element.textContent = skillData.skillName;
  skillNameContainer.appendChild(h3Element);

  const skillContentContainer = document.createElement("div");
  skillContentContainer.classList.add("skill-content");

  const pElement = document.createElement("p");
  pElement.textContent = skillData.desc;
  skillContentContainer.appendChild(pElement);

  skillCard.appendChild(skillNameContainer);
  skillCard.appendChild(skillContentContainer);

  return skillCard;
}

// Function to remove 'active' class from all skill categories
function removeAllActiveClasses() {
  skillCategories.forEach((skillCategory) => {
    skillCategory.classList.remove("active");
  });
}

// Function to display skills for a given category
function displaySkillsForCategory(category) {
  displaySkills.innerHTML = "";

  accordionHeaders.forEach((header) => {
    const headerCategory = header.textContent.trim();

    if (headerCategory === category) {
      const clickedSkillTab = header.parentElement;
      clickedSkillTab.classList.add("active");

      data.forEach((skillData) => {
        if (skillData.category === category) {
          const skillCard = createSkillCard(skillData);
          displaySkills.appendChild(skillCard);
        }
      });
    } else {
      const otherSkillTab = header.parentElement;
      otherSkillTab.classList.remove("active");
    }
  });
}

// Event Listeners

// Fetch JSON data and initialize skills
fetch(jsonFileUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("The response is not OK");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);

    window.data = data;

    // Add click event listeners to skill categories
    skillCategories.forEach((skillCategory) => {
      skillCategory.addEventListener("click", () => {
        const category = skillCategory.textContent.trim();
        console.log(category);
        removeAllActiveClasses();
        displaySkillsForCategory(category);
      });
    });

    // Automatically click the 'front-end' skill category
    const frontEndTab = document.querySelector(
      ".front-end.skill-category .accordion-header"
    );
    if (frontEndTab) {
      frontEndTab.click();
    }
  })
  .catch((error) => {
    console.error("Error", error);
  });

// Scroll animation for the header
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", this.window.scrollY > 0);
});

// Toggle navigation menu
const navigation = document.querySelector("nav");

document.querySelector(".toggle").onclick = function () {
  this.classList.toggle("active");
  navigation.classList.toggle("active");
};

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

// Hide/Show header on scroll
let lastScrollTop = 0;
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    header.style.top = "-80px";
  } else {
    header.style.top = "0";
  }
  lastScrollTop = scrollTop;
});

// Dark and Light Mode toggle
let toggleTheme = document.querySelector(".toggle-theme");
let navItemDarkMode = document.querySelector(".nav-item-darkmode");
let body = document.body;

toggleTheme.onclick = function () {
  toggleTheme.classList.toggle("toggle-active");
  body.classList.toggle("light");
};

navItemDarkMode.onclick = function () {
  navItemDarkMode.classList.toggle("toggle-active");
  body.classList.toggle("light");
};

// Smart Slider
const contactIcons = document.querySelectorAll(".smartSlider .icons a");
const contactIcon = document.querySelector('ion-icon[name="person"]');

let isContactOpen = false;

contactIcon.addEventListener("click", () => {
  isContactOpen = !isContactOpen;

  contactIcons.forEach((icon, index) => {
    const delay = isContactOpen ? index * 50 : 0;
    setTimeout(() => {
      icon.style.display = isContactOpen ? "block" : "none";
    }, delay);
  });
});
