
let currentEmail = "";
let generatedOTP = "";
let isExistingUser = false;
let profileEntryScreen = "otp";

const profileFields = [
  ["First name", "firstName"],
  ["Last name", "lastName"],
  ["Date of birth", "dob"],
  ["Gender", null],
  ["Phone number", "phone"],
  ["Email address", "profileEmail"],
  ["Location", "location"],
  ["Education", "education"]
];

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function selectRole(role) {
  if (role === "Woman") {
    showScreen("auth");
  }
}

function comingSoon() {
  alert("This role will be available soon!");
}

function googleDemo() {
  isExistingUser = false;
  profileEntryScreen = "auth";

  // Demo only. Real Google sign-in needs OAuth.
  currentEmail = "google.user@example.com";

  document.getElementById("profileEmail").value = currentEmail;

  showScreen("profile");
}

function goBackFromProfile() {
  showScreen(profileEntryScreen);
}

function sendOTP(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");

  currentEmail = emailInput.value.trim();
  profileEntryScreen = "otp";

  if (!currentEmail) {
    alert("Please enter your email address.");
    return;
  }

  // Frontend demo OTP. This does NOT send an email.
  generatedOTP = String(
    Math.floor(100000 + Math.random() * 900000)
  );

  document.getElementById("otpEmail").textContent = currentEmail;

  // Demo code displayed on screen.
  document.getElementById("otpDemoHint").textContent =
    "Demo verification code: " + generatedOTP;

  document.getElementById("profileEmail").value = currentEmail;

  showScreen("otp");
}

function verifyOTP(event) {
  event.preventDefault();

  const boxes = document.querySelectorAll(".otp-box");

  const enteredOTP = Array.from(boxes)
    .map(box => box.value)
    .join("");

  if (enteredOTP === generatedOTP) {
    boxes.forEach(box => box.value = "");

    showScreen("profile");
  } else {
    alert("Incorrect verification code. Please try again.");
  }
}

function resendOTP(event) {
  event.preventDefault();

  generatedOTP = String(
    Math.floor(100000 + Math.random() * 900000)
  );

  document.getElementById("otpDemoHint").textContent =
    "New demo verification code: " + generatedOTP;
}

function existingUser(event) {
  event.preventDefault();

  isExistingUser = true;

  alert("Demo sign-in: enter your email to continue.");

  document.getElementById("email").focus();
}

function previewPhoto(event) {
  const file = event.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    document.getElementById("photoPreview").innerHTML =
      `<img src="${e.target.result}" alt="Profile photo">`;
  };

  reader.readAsDataURL(file);
}

function reviewProfile(event) {
  event.preventDefault();

  const reviewContainer = document.getElementById("reviewDetails");

  reviewContainer.innerHTML = "";

  const values = [
    document.getElementById("firstName").value,
    document.getElementById("lastName").value,
    document.getElementById("dob").value,
    "Female",
    document.getElementById("phone").value,
    document.getElementById("profileEmail").value,
    document.getElementById("location").value,
    document.getElementById("education").value
  ];

  profileFields.forEach((field, index) => {
    const row = document.createElement("div");

    row.className = "review-item";

    const label = document.createElement("span");
    label.textContent = field[0];

    const value = document.createElement("span");
    value.textContent = values[index] || "Not provided";

    row.appendChild(label);
    row.appendChild(value);

    reviewContainer.appendChild(row);
  });

  showScreen("review");
}

function completeProfile() {
  const firstName = document.getElementById("firstName").value.trim() || "there";
  const lastName = document.getElementById("lastName").value;
  const profile = {
    firstName,
    lastName,
    dob: document.getElementById("dob").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("profileEmail").value,
    location: document.getElementById("location").value,
    education: document.getElementById("education").value
  };

  try {
    sessionStorage.setItem("restartHERProfile", JSON.stringify(profile));
  } catch (error) {
    console.warn("Profile could not be saved for this session.", error);
  }

  document.getElementById("postWelcomeGreeting").textContent = "Welcome, " + firstName + "!";
  document.getElementById("homeGreeting").innerHTML = 'Welcome back<span>, ' + escapeHTML(firstName) + '.</span>';
  document.getElementById("sidebarName").textContent = firstName + (lastName ? " " + lastName.charAt(0) + "." : "");
  document.getElementById("sidebarAvatar").textContent = firstName.charAt(0).toUpperCase();
  showScreen("postWelcome");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function showDashboardHome(button) {
  document.getElementById("editorialHome").hidden = false;
  document.getElementById("featureView").hidden = true;
  document.getElementById("storyView").hidden = true;
  document.getElementById("storyLibraryView").hidden = true;
  document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
  if (button) button.classList.add("active");
}

function openFeature(title, button) {
  showDashboardHome();
  document.getElementById("editorialHome").hidden = true;
  document.getElementById("featureView").hidden = false;
  document.getElementById("featureTitle").textContent = title;
  document.getElementById("featureDescription").textContent =
    title + " will become a dedicated RestartHER space. This prototype keeps the navigation ready for the next build.";
  document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
  if (button) button.classList.add("active");
}

function openStory(storyKey) {
  const stories = {
    featured: ["She paused her career. Her ambition never paused.", "Sample editorial content about returning to work with confidence, building on existing experience, and taking one manageable step at a time."],
    confidence: ["Starting again, one brave step at a time", "Sample content about rebuilding confidence through small, practical wins."],
    skills: ["Making room for the skills you already have", "Sample content about recognizing transferable skills and treating experience as a foundation."],
    reentry: ["A career path can grow in a new direction", "Sample content about exploring flexible pathways and new possibilities after a break."]
  };
  const story = stories[storyKey] || stories.featured;
  document.getElementById("editorialHome").hidden = true;
  document.getElementById("featureView").hidden = true;
  document.getElementById("storyLibraryView").hidden = true;
  document.getElementById("storyView").hidden = false;
  document.getElementById("storyTitle").textContent = story[0];
  document.getElementById("storyBody").textContent = story[1];
}

function openStoryLibrary() {
  document.getElementById("editorialHome").hidden = true;
  document.getElementById("featureView").hidden = true;
  document.getElementById("storyView").hidden = true;
  document.getElementById("storyLibraryView").hidden = false;
}

// Automatically move between OTP boxes
document.querySelectorAll(".otp-box").forEach((box, index, boxes) => {

  box.addEventListener("input", () => {
    box.value = box.value.replace(/\D/g, "");

    if (box.value && index < boxes.length - 1) {
      boxes[index + 1].focus();
    }
  });

  box.addEventListener("keydown", event => {
    if (event.key === "Backspace" && !box.value && index > 0) {
      boxes[index - 1].focus();
    }
  });

  box.addEventListener("paste", event => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    pasted.split("").forEach((digit, i) => {
      if (boxes[i]) {
        boxes[i].value = digit;
      }
    });

    if (boxes[pasted.length - 1]) {
      boxes[pasted.length - 1].focus();
    }
  });

});
