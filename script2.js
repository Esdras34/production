


// Elementos da página
const timersContainer = document.getElementById('timersContainer');
const addTimerButton = document.getElementById('addTimer');
const searchInput = document.getElementById('searchCode');
const printButton = document.getElementById('printButton');

// Função para gerar código único
const generateUniqueCode = () => {
    return 'LOC' + Date.now() + Math.floor(Math.random() * 1000);
};

// Função para salvar cronômetros no localStorage
const saveTimers = () => {
    const timers = Array.from(document.querySelectorAll('.timer')).map(timer => ({
        id: timer.dataset.id,
        startTime: timer.dataset.startTime,
        nome: timer.dataset.nome,
        cpf: timer.dataset.cpf,
        rg: timer.dataset.rg,
        celular: timer.dataset.celular,
        horarioEntrada: timer.dataset.horarioEntrada,
        horarioSaida: timer.dataset.horarioSaida,
        valor: timer.dataset.valor,
        formaPagamento: timer.dataset.formaPagamento,
        bicicletas: timer.dataset.bicicletas,
        extensoes: timer.dataset.extensoes,
        carrocelas: timer.dataset.carrocelas,
        codigo: timer.dataset.codigo
    }));
    localStorage.setItem('timers', JSON.stringify(timers));
};

// Carregar cronômetros do localStorage
const loadTimers = () => {
    const timers = JSON.parse(localStorage.getItem('timers')) || [];
    timers.forEach(timer => {
        const now = Math.floor(Date.now() / 1000);
        const elapsedTime = now - timer.startTime;
        timer.time = elapsedTime;
        createTimer(timer);
    });
};

// Criar novo cronômetro
const createTimer = (data) => {
    const timerDiv = document.createElement('div');
    timerDiv.classList.add('timer');
    timerDiv.dataset.id = data.id || Date.now();
    timerDiv.dataset.startTime = data.startTime || Math.floor(Date.now() / 1000);
    timerDiv.dataset.nome = data.nome;
    timerDiv.dataset.cpf = data.cpf;
    timerDiv.dataset.rg = data.rg;
    timerDiv.dataset.celular = data.celular;
    timerDiv.dataset.horarioEntrada = data.horarioEntrada;
    timerDiv.dataset.horarioSaida = data.horarioSaida;
    timerDiv.dataset.valor = data.valor;
    timerDiv.dataset.formaPagamento = data.formaPagamento;
    timerDiv.dataset.bicicletas = data.bicicletas;
    timerDiv.dataset.extensoes = data.extensoes;
    timerDiv.dataset.carrocelas = data.carrocelas;
    timerDiv.dataset.codigo = data.codigo || generateUniqueCode();

    const now = Math.floor(Date.now() / 1000);
    const elapsedTime = now - timerDiv.dataset.startTime;

    timerDiv.innerHTML = `
        <p><strong>Código:</strong> ${timerDiv.dataset.codigo}</p>
        <p><strong>Nome:</strong> ${data.nome}</p>
        <p><strong>CPF:</strong> ${data.cpf}</p>
        <p><strong>Celular:</strong> ${data.celular}</p>
        <p><strong>Horário de Entrada:</strong> ${data.horarioEntrada}</p>
        <p><strong>Horário de Saída:</strong> ${data.horarioSaida}</p>
        <p><strong>Valor a Pagar:</strong> R$ ${parseFloat(data.valor).toFixed(2)}</p>
        <p><strong>Forma de Pagamento:</strong> ${data.formaPagamento}</p>
        <p><strong>Número de Bicicletas:</strong> ${data.bicicletas}</p>
        <p><strong>Extensões:</strong> ${data.extensoes}</p>
        <p><strong>Carrocelas:</strong> ${data.carrocelas}</p>
        <p><strong>Tempo:</strong> <span class="clock">${formatTime(elapsedTime)}</span></p>
        <button class="btn btn-danger btn-sm delete">Excluir</button>
    `;

    timersContainer.appendChild(timerDiv);

    let interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const elapsedTime = now - timerDiv.dataset.startTime;
        timerDiv.querySelector('.clock').textContent = formatTime(elapsedTime);
        saveTimers();
    }, 1000);

    // Excluir cronômetro
    timerDiv.querySelector('.delete').addEventListener('click', () => {
        clearInterval(interval);
        timerDiv.remove();
        saveTimers();
    });

    saveTimers();
};

// Formatar tempo (HH:MM:SS)
const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Filtrar locatários pelo código e rolar até o card correspondente
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    let found = false;

    document.querySelectorAll('.timer').forEach(timer => {
        const codigo = timer.dataset.codigo.toLowerCase();

        if (codigo.includes(query)) {
            timer.style.display = '';  // Garante que o item apareça
            if (!found) {
                timer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                timer.classList.add('highlight');
                setTimeout(() => timer.classList.remove('highlight'), 2000);
                found = true;  // Garante que só role para o primeiro encontrado
            }
        } else {
            timer.style.display = 'none';
        }
    });

    if (query === '') {
        document.querySelectorAll('.timer').forEach(timer => {
            timer.style.display = '';
        });
    }
});

// Adicionar cronômetro ao clicar no botão
addTimerButton.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const celular = document.getElementById('celular').value;
    const horarioEntrada = document.getElementById('horarioEntrada').value;
    const horarioSaida = document.getElementById('horarioSaida').value;
    const valor = document.getElementById('valor').value;
    const formaPagamento = document.getElementById('formaPagamento').value;
    const bicicletas = document.getElementById('bicicletas').value;
    const extensoes = document.getElementById('extensoes').value;
    const carrocelas = document.getElementById('carrocelas').value;

    createTimer({
        nome,
        cpf,
        rg,
        celular,
        horarioEntrada,
        horarioSaida,
        valor,
        formaPagamento,
        bicicletas,
        extensoes,
        carrocelas,
        startTime: Math.floor(Date.now() / 1000),
        codigo: generateUniqueCode()
    });

    document.getElementById('rentalForm').reset();
});

// Função para preparar os dados para impressão
const preparePrintData = () => {
    const timers = Array.from(document.querySelectorAll('.timer')).map(timer => ({
        codigo: timer.dataset.codigo,
        nome: timer.dataset.nome,
        cpf: timer.dataset.cpf,
        rg: timer.dataset.rg,
        celular: timer.dataset.celular,
        horarioEntrada: timer.dataset.horarioEntrada,
        horarioSaida: timer.dataset.horarioSaida,
        valor: timer.dataset.valor,
        formaPagamento: timer.dataset.formaPagamento,
        bicicletas: timer.dataset.bicicletas,
        extensoes: timer.dataset.extensoes,
        carrocelas: timer.dataset.carrocelas
    }));

    localStorage.setItem('printData', JSON.stringify(timers));
};

// Redirecionar para página de impressão
printButton.addEventListener('click', () => {
    preparePrintData();
    window.open('impressão.html', '_blank');
});

// Carregar cronômetros ao abrir a página
loadTimers();

