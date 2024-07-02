import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhFUskfNg2BJfdzLJaGySXPUt2XuROUdk",
    authDomain: "ailypark.firebaseapp.com",
    projectId: "ailypark",
    storageBucket: "ailypark.appspot.com",
    messagingSenderId: "652438009200",
    appId: "1:652438009200:web:5280f41609030f75104bb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Authenticate the user
async function authenticate() {
    try {
        const userCredential = await signInAnonymously(auth);
        // console.log("Authenticated as:", userCredential.user.uid);
        return true;
    } catch (error) {
        console.error("Authentication error:", error);
        return false;
    }
}

// Function to fetch account data for 'admin'
export async function getAccount() {
    try {
        const authenticated = await authenticate();
        if (authenticated) {
            const docRef = doc(db, 'accounts', 'admin');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                // console.log("Account data:", data);
                displayAccountData(data); // Call function to display data in UI
            } else {
                console.log("No such document!");
            }
        }
    } catch (error) {
        console.error("Error getting account:", error);
    }
}

// Function to display account data in the UI
function displayAccountData(data) {
    const fullNameElements = document.querySelectorAll('.fullName');
    const addressElement = document.getElementById('address');
    const dobElement = document.getElementById('dob');
    const genderElement = document.getElementById('gender');

    fullNameElements.forEach(element => {
        element.textContent = data.fullName || "N/A"
    });
    addressElement.textContent = data.address || "N/A";
    dobElement.textContent = data.dob || "N/A";
    genderElement.textContent = data.gender || "N/A";
}

// Expose function to the global scope for button click
// window.getAccount = getAccount;
