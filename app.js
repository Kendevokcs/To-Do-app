const firebaseConfig = {
  apiKey: "AIzaSyC7fMGHjNsg8RwQ_b60K00YRfn3QudgJqc",
  authDomain: "beadando-apfl.firebaseapp.com",
  projectId: "beadando-apfl",
  storageBucket: "beadando-apfl.firebasestorage.app",
  messagingSenderId: "703398267373",
  appId: "1:703398267373:web:06635b9b1042ff8dbd3fe4",
  measurementId: "G-CBM66TM8J1"
};

// firebase inicializálása
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// értékek
const loggedOutView = document.getElementById("logged-out-view");
const loggedInView = document.getElementById("logged-in-view");
const userDisplay = document.getElementById("user-display");
const btnOpenLogin = document.getElementById("btn-open-login");
const btnOpenSignup = document.getElementById("btn-open-signup");
const btnLogout = document.getElementById("btn-logout");

const authModal = document.getElementById("auth-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const modalTitle = document.getElementById("modal-title");
const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const authForm = document.getElementById("auth-form");
const authEmail = document.getElementById("auth-email");
const authPassword = document.getElementById("auth-password");
const authSubmitBtn = document.getElementById("auth-submit-btn");
const authError = document.getElementById("auth-error");
const btnGuestLogin = document.getElementById("btn-guest-login");

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoStatusMessage = document.getElementById("todo-status-message");
const todoFooter = document.getElementById("todo-footer");
const itemsLeft = document.getElementById("items-left");
const btnClearCompleted = document.getElementById("btn-clear-completed");

let currentUser = null;
let unsubscribeTodos = null;
let currentAuthMode = "login"; 

auth.onAuthStateChanged((user) => {
  currentUser = user;

  if (user) {
    loggedOutView.classList.add("hidden");
    loggedInView.classList.remove("hidden");
    userDisplay.textContent = user.isAnonymous 
      ? "Guest User" 
      : (user.email || "User");
    closeModal();
    listenToTodos(user.uid);
  } else {
    loggedOutView.classList.remove("hidden");
    loggedInView.classList.add("hidden");
    if (unsubscribeTodos) unsubscribeTodos();
    renderTasks([]);
    todoStatusMessage.textContent = "Please log in or sign up to save your tasks.";
    todoStatusMessage.classList.remove("hidden");
    todoFooter.classList.add("hidden");
  }
});

function setAuthMode(mode) {
  currentAuthMode = mode;
  authError.classList.add("hidden");
  authError.textContent = "";

  if (mode === "login") {
    modalTitle.textContent = "Log In";
    authSubmitBtn.textContent = "Log In";
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
  } else {
    modalTitle.textContent = "Sign Up";
    authSubmitBtn.textContent = "Sign Up";
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
  }
}


