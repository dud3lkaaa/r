let apiProcessed = false;
let phoneVerified = false;
let codeVerified = false;

// Step 1: API & Hash Processing
function processApi() {
    // Simulate API processing (this would normally be an actual API request)
    console.log("Processing API & hash...");

    // Simulate a successful API response and move to the next step
    setTimeout(() => {
        apiProcessed = true;
        alert("API & Hash processed successfully!");
        document.getElementById('api-processing').style.display = 'none';
        document.getElementById('phone-step').style.display = 'block';
    }, 1000);  // Simulate a delay for the API processing
}

// Step 2: Send Code
function sendCode() {
    const phone = document.getElementById('phone').value;
    if (phone) {
        console.log(`Sending verification code to ${phone}...`);
        // Simulate sending verification code
        setTimeout(() => {
            alert(`Code sent to ${phone}`);
            document.getElementById('phone-step').style.display = 'none';
            document.getElementById('code-step').style.display = 'block';
        }, 1000); // Simulate a delay for sending the code
    } else {
        alert("Please enter a valid phone number.");
    }
}

// Step 3: Verify Code
function verifyCode() {
    const code = document.getElementById('code').value;
    if (code) {
        console.log(`Verifying code: ${code}`);
        // Simulate code verification
        setTimeout(() => {
            codeVerified = true;
            alert("Code verified successfully!");
            document.getElementById('code-step').style.display = 'none';
            document.getElementById('password-step').style.display = 'block';
        }, 1000); // Simulate a delay for verifying the code
    } else {
        alert("Please enter the verification code.");
    }
}

// Step 4: Login with Password
function loginWithPassword() {
    const password = document.getElementById('password').value;
    if (password) {
        console.log(`Logging in with password: ${password}`);
        // Simulate a login attempt
        setTimeout(() => {
            alert("Logged in successfully!");
        }, 1000); // Simulate a delay for login
    } else {
        alert("Please enter your password.");
    }
}
