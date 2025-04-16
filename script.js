let isLoggedIn = false;

// Show login form
function showLoginForm() {
  highlightAuthTab('auth-login');
  document.getElementById("dashboard-tabs").style.display = "none";
  document.getElementById("auth-tabs").style.display = "flex";

  const html = `
  <div class="card">
    <h2>Login</h2>
    <label>National ID</label>
    <input type="text" id="login-nid" placeholder="Enter National ID" />
    <label>Password</label>
    <input type="password" id="login-password" placeholder="Enter password" />
    <button class="submit" onclick="handleLogin()">Login</button>
    <p style="margin-top: 1rem; text-align: center;">
      Don’t have an account?
      <a href="#" onclick="showRegisterForm()">Register here</a>
    </p>
  </div>
`;

  document.getElementById("content").innerHTML = html;
}

// Show register form
function showRegisterForm() {
  highlightAuthTab('auth-register');
  document.getElementById("dashboard-tabs").style.display = "none";
  document.getElementById("auth-tabs").style.display = "flex";

  const html = `
    <div class="card">
      <h2>Register</h2>
      <label>Full Name</label>
      <input type="text" id="reg-name" placeholder="Enter full name" />
      <label>National ID</label>
      <input type="text" id="reg-nid" placeholder="Enter National ID" />
      <label>Voter ID</label>
      <input type="text" id="reg-vid" placeholder="Enter Voter ID" />
      <label>Password</label>
      <input type="password" id="reg-password" placeholder="Set a password" />
      <button class="submit" onclick="handleRegister()">Register</button>
    </div>
  `;
  document.getElementById("content").innerHTML = html;
}

// Handle register
function handleRegister() {
  const name = document.getElementById("reg-name").value;
  const nid = document.getElementById("reg-nid").value;
  const vid = document.getElementById("reg-vid").value;
  const password = document.getElementById("reg-password").value;

  if (!name || !nid || !vid || !password) {
    alert("All fields are required!");
    return;
  }

  // Store in localStorage
  const users = JSON.parse(localStorage.getItem("voters") || "[]");
  const exists = users.find(user => user.nid === nid);

  if (exists) {
    alert("This National ID is already registered.");
    return;
  }

  users.push({ name, nid, vid, password });
  localStorage.setItem("voters", JSON.stringify(users));

  alert("Registration successful! You can now log in.");
  showLoginForm();
}

// Handle login
function handleLogin() {
  const nid = document.getElementById("login-nid").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("voters") || "[]");
  const user = users.find(user => user.nid === nid && user.password === password);

  if (!user) {
    alert("Invalid credentials. Please try again.");
    return;
  }

  isLoggedIn = true;
  document.getElementById("auth-tabs").style.display = "none";
  document.getElementById("dashboard-tabs").style.display = "flex";
  switchTab("vote");
}

// Highlight active tab (auth)
function highlightAuthTab(id) {
  document.getElementById("auth-login").classList.remove("active");
  document.getElementById("auth-register").classList.remove("active");
  document.getElementById(id).classList.add("active");
}

// Switch dashboard tab
function switchTab(tab) {
  if (!isLoggedIn) {
    showLoginForm();
    return;
  }

  document.getElementById("tab-vote").classList.remove("active");
  document.getElementById("tab-register").classList.remove("active");
  document.getElementById("tab-results").classList.remove("active");
  document.getElementById("tab-" + tab).classList.add("active");

  let html = "";

  if (tab === "vote") {
    html = `
      <div class="card">
        <h2>Cast Your Vote</h2>
        <label>Voter ID</label>
        <input type="text" placeholder="Enter your Voter ID" />
        <label>Select Candidate</label>
        <select>
          <option value="">-- Choose a Candidate --</option>
          <option value="1">Eng. Otaro</option>
          <option value="2">Francis ogutu</option>
          <option value="3">sheila ambogo</option>
          <option value="4">Andrew Owino</option>
          <option value="5">Timothy Ayaya</option>
        </select>
        <button class="submit">Submit Vote</button>
      </div>
    `;
  } else if (tab === "register") {
    html = `
      <div class="card">
        <h2>Register as a Voter</h2>
        <label>Full Name</label>
        <input type="text" placeholder="Enter your full name" />
        <label>National ID</label>
        <input type="text" placeholder="Enter your National ID" />
        <button class="submit">Register</button>
      </div>
    `;
  } else if (tab === "results") {
    html = `
      <div class="card">
        <h2>Live Results</h2>
        <ul class="results-list">
          <li><span>Eng. Otaro</span><span>102 votes</span></li>
          <li><span>Francis ogutu</span><span>89 votes</span></li>
          <li><span>sheila ambogo</span><span>67 votes</span></li>
          <li><span>Andrew Owino</span><span>67 votes</span></li>
          <li><span>Timothy Ayaya</span><span>67 votes</span></li>
        </ul>
      </div>
    `;
  }

  document.getElementById("content").innerHTML = html;
}

// Show login on load
showLoginForm();
