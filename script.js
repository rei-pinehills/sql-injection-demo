const users = [
    { username: "admin", password: "password123" },
    { username: "rei", password: "securepass" },
];
function isSQLInjection(input) {
    const patterns = ["'", "1=1", "--", ";", "/*"];
    return patterns.some(p => input.toUpperCase().includes(p.toUpperCase()));
}
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const resultBox = document.getElementById("result-box");
    resultBox.classList.remove("hidden", "result-success", "result-bypass", "result-fail");

    if (isSQLInjection(username) || isSQLInjection(password)) {
        resultBox.classList.add("result-bypass");
        resultBox.innerHTML = `
        <strong>💥 SQL Injection Detected!</strong><br><br>
        Input: <em>${username}</em><br><br>
        In a real vulnerable system, this would bypass authentication.<br><br>
        The SQL query would become:<br>
        <code>SELECT * FROM users WHERE username='' OR '1'='1'</code><br><br>
        Since '1'='1' is always true, the query returns ALL users -> login bypassed!
        `;
        return;
    }
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        resultBox.classList.add("result-success");
        resultBox.innerHTML = `
        <strong>✅ Login Successful!</strong><br><br>
        Welcome, ${username}!<br>
        This is a legitimate login with correct credentials.
        `;
    } else {
        resultBox.classList.add("result-fail");
        resultBox.innerHTML = `
        <strong>❌Login Failed</strong><br><br>
        Invalid username or password.<br>
        Authentication rejected.
        `;
    }

}
document.getElementById("hint-normal").addEventListener("click", () => {
    document.getElementById("username").value = "admin";
    document.getElementById("password").value = "password123";
});
document.getElementById("hint-wrong").addEventListener("click", () => {
    document.getElementById("username").value = "admin";
    document.getElementById("password").value = "wrongpass";
});
document.getElementById("hint-sqli").addEventListener("click", () => {
    document.getElementById("username").value = "' OR '1'='1";
    document.getElementById("password").value = "anything";
});