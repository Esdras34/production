document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const emailValido = "bike@vic"; // Exemplo de email
    const senhaValida = "bikevic123"; // Exemplo de senha

    if (email === emailValido && senha === senhaValida) {
        window.location.href = "index2.html"; // Página de sucesso após login
    } else {
        document.getElementById("errorMessage").textContent = "E-mail ou senha incorretos. Tente novamente.";
    }
});
