const msg = document.getElementById("message");
const profile = document.getElementById("profile");

function showMessage(text, type = "success") {
  msg.textContent = text;
  msg.className = "msg " + type;
}

const registerUser = async () => {
  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();

  if (!username || !email || !password) {
    alert("All fields required ❌");
    return;
  }

  try {
    const res = await fetch("https://api.freeapi.app/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials:"include",
      body: JSON.stringify({
        email,
        password,
        role: "ADMIN",
        username,
      }),
    });

    const data = await res.json();

    console.log("FULL RESPONSE:", data);
    console.log("ERRORS:", data.errors);

    if (res.ok) {
      alert("Registered successfully ✅");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

async function loginUser() {
  try {
    showMessage("Loading...");

    const res = await fetch("https://api.freeapi.app/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
      body: JSON.stringify({
        username: document.getElementById("login-username").value,
        password: document.getElementById("login-password").value,
      }),
    });

    const data = await res.json();
    console.log(data.data.accessToken);

    if (res.ok) {
      showMessage("Login successful ✅");
      await localStorage.setItem("accessToken", data.data.accessToken);
    } else {
      showMessage(data.message || "Login failed", "error");
    }
  } catch (err) {
    showMessage("Error occurred", "error");
  }
}

async function getCurrentUser() {
  try {
    showMessage("Loading...");

    const token = localStorage.getItem("accessToken");

    const res = await fetch(
      "https://api.freeapi.app/api/v1/users/current-user",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (res.ok) {
      showMessage("User fetched ✅");

      profile.innerHTML = `
        <strong>Username:</strong> ${data.data.username} <br/>
        <strong>Email:</strong> ${data.data.email} <br/>
        <strong>Role:</strong> ${data.data.role}
      `;
    } else {
      showMessage("Not logged in", "error");
    }
  } catch (err) {
    showMessage("Error occurred", "error");
  }
}

async function logoutUser() {
  try {
    showMessage("Loading...");

    const token = localStorage.getItem("accessToken");

    const res = await fetch("https://api.freeapi.app/api/v1/users/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      showMessage("Logged out ✅");
      profile.innerHTML = "";
      localStorage.removeItem("accessToken");
    } else {
      showMessage("Logout failed", "error");
    }
  } catch (err) {
    showMessage("Error occurred", "error");
  }
}
