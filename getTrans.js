import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
        console.log("Authenticated as:", userCredential.user.uid);
        return true;
    } catch (error) {
        console.error("Authentication error:", error);
        return false;
    }
}

// Function to fetch transaction data
export async function getTransactions() {
    try {
        const authenticated = await authenticate();
        if (authenticated) {
            const transactionsRef = collection(db, 'transactions');
            const querySnapshot = await getDocs(transactionsRef);

            if (!querySnapshot.empty) {
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    // console.log("Transaction data:", data);
                    displayTransactionData(data); // Call function to display data in UI
                });
            } else {
                // console.log("No transactions found.");
            }
        }
    } catch (error) {
        console.error("Error getting transactions:", error);
    }
}

// Function to display transaction data in a table
function displayTransactionData(transaction) {
    const tableBody = document.getElementById('transactionTableBody');
    const row = tableBody.insertRow();
    
    // Add cells for each property in the transaction
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    const cell3 = row.insertCell();
    const cell4 = row.insertCell();
    
    cell1.textContent = transaction.from || "N/A";
    cell2.textContent = transaction.amount || "N/A";
    cell3.textContent = transaction.transactionDate || "N/A";
    cell4.textContent = transaction.transactionType || "N/A";
}

// Expose function to the global scope for button click or other trigger
window.getTransactions = getTransactions;
