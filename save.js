import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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

async function saveAccount(userId) {
    try {
        const fullName = document.getElementById('fullName').value;
        const address = document.getElementById('address').value;
        const dob = document.getElementById('dob').value;
        const gender = document.getElementById('gender').value;
        const saveButton = document.getElementById('saveButton');

        saveButton.textContent = 'Saving...';

        await setDoc(doc(db, 'accounts', 'admin'), {
            fullName,
            address,
            dob,
            gender
        });

        alert('Account saved successfully!');
        saveButton.textContent = 'Save';
    } catch (error) {
        console.error('Error saving account: ', error);
        saveButton.textContent = 'Save';
    }
}

async function saveTransaction() {
    try {
        const from = document.getElementById('from').value;
        const amount = document.getElementById('amount').value;
        const transactionDate = document.getElementById('transactionDate').value;
        const transactionType = document.getElementById('transactionType').value;
        const saveButton = document.getElementById('transButton');

        saveButton.textContent = 'Updating...';

        await addDoc(collection(db, 'transactions'), {
            from,
            amount,
            transactionDate,
            transactionType
        });

        alert('Transaction saved successfully!');
        saveButton.textContent = 'Update Transaction';
    } catch (error) {
        console.error('Error saving transaction: ', error);
        saveButton.textContent = 'Update Transaction';
    }
}

// Authenticate and expose functions to the global scope
(async function() {
    const authenticated = await authenticate();
    if (authenticated) {
        window.saveAccount = saveAccount;
        window.saveTransaction = saveTransaction;
    }
})();
