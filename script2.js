const timersContainer = document.getElementById('timersContainer');
const addTimerButton = document.getElementById('addTimer');
const rentalForm = document.getElementById('rentalForm');
const printButton = document.getElementById('printButton');

const saveTimers = () => {
    const timers = Array.from(document.querySelectorAll('.timer')).map(timer => ({
        id: timer.dataset.id,
        time: timer.dataset.time,
        cycles: timer.dataset.cycles,
        nome: timer.dataset.nome,
        cpf: timer.dataset.cpf,
        rg: timer.dataset.rg,
        celular: timer.dataset.celular,
        horarioSaida: timer.dataset.horarioSaida,
        horarioRetorno: timer.dataset.horarioRetorno,
        valor: timer.dataset.valor,
        formaPagamento: timer.dataset.formaPagamento,
        bicicletas: timer.dataset.bicicletas,
        extensoes: timer.dataset.extensoes,
        carrocelas: timer.dataset.carrocelas,
        dataCadastro: timer.dataset.dataCadastro
    }));
    localStorage.setItem('timers', JSON.stringify(timers));
};

const loadTimers = () => {
    const timers = JSON.parse(localStorage.getItem('timers')) || [];
    timers.forEach(timer => createTimer(timer.id, parseInt(timer.time), parseInt(timer.cycles), timer));
};

const createTimer = (id = Date.now(), time = 0, cycles = 0, data = {}, autoStart = false) => {
    const timerDiv = document.createElement('div');
    timerDiv.classList.add('timer');
    timerDiv.dataset.id = id;
    Object.assign(timerDiv.dataset, data);

    const clockId = `clock-${id}`;
    const cycleId = `cycle-${id}`;
    const dataCadastro = new Date().toLocaleDateString();  // Captura a data atual

    timerDiv.innerHTML = ` 
        <p><strong>Nome:</strong> ${data.nome}</p>
        <p><strong>CPF:</strong> ${data.cpf}</p>
        <p><strong>RG:</strong> ${data.rg}</p>
        <p><strong>Celular:</strong> ${data.celular}</p>
        <p><strong>Horário de Saída:</strong> ${data.horarioSaida}</p>
        <p><strong>Horário de Retorno:</strong> ${data.horarioRetorno}</p>
        <p><strong>Valor a Pagar:</strong> R$ ${parseFloat(data.valor).toFixed(2)}</p>
        <p><strong>Forma de Pagamento:</strong> ${data.formaPagamento}</p>
        <p><strong>Número de Bicicletas:</strong> ${data.bicicletas}</p>
        <p><strong>Extensões:</strong> ${data.extensoes}</p>
        <p><strong>Carrocelas:</strong> ${data.carrocelas}</p>
        <p><strong>Data de Cadastro:</strong> ${dataCadastro}</p>
        <p><strong>Relógio:</strong> <span id="${clockId}">${formatTime(time)}</span></p>
        <p><strong>Ciclos de 30 minutos:</strong> <span id="${cycleId}">${cycles}</span></p>
        <button class="btn btn-danger btn-sm delete">Excluir</button>
    `;

    timersContainer.appendChild(timerDiv);

    let interval = null;

    const updateDisplay = () => {
        document.getElementById(clockId).textContent = formatTime(time);
        document.getElementById(cycleId).textContent = cycles;
    };

    const startTimer = () => {
        if (interval) return;
        interval = setInterval(() => {
            time++;
            if (time >= 1800) {
                time = 0;
                cycles++;
            }
            updateDisplay();
            saveTimers();
        }, 1000);
    };

    const deleteTimer = () => {
        clearInterval(interval);
        timerDiv.remove();
        saveTimers();
    };

    timerDiv.querySelector('.delete').addEventListener('click', deleteTimer);

    if (autoStart) startTimer();
    updateDisplay();
};

const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

addTimerButton.addEventListener('click', () => {
    const formData = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        celular: document.getElementById('celular').value,
        horarioSaida: document.getElementById('horarioSaida').value,
        horarioRetorno: document.getElementById('horarioRetorno').value,
        valor: document.getElementById('valor').value,
        formaPagamento: document.getElementById('formaPagamento').value,
        bicicletas: document.getElementById('bicicletas').value,
        extensoes: document.getElementById('extensoes').value,
        carrocelas: document.getElementById('carrocelas').value
    };
    createTimer(undefined, 0, 0, formData, true);
    rentalForm.reset();
});

// Evento do botão de Impressão
printButton.addEventListener('click', () => {
    const lastTimerData = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        celular: document.getElementById('celular').value,
        horarioSaida: document.getElementById('horarioSaida').value,
        horarioRetorno: document.getElementById('horarioRetorno').value,
        valor: document.getElementById('valor').value,
        formaPagamento: document.getElementById('formaPagamento').value,
        bicicletas: document.getElementById('bicicletas').value,
        extensoes: document.getElementById('extensoes').value,
        carrocelas: document.getElementById('carrocelas').value
    };
    localStorage.setItem('timerForPrint', JSON.stringify(lastTimerData));
    window.open('index3.html', '_blank');
});

window.addEventListener('DOMContentLoaded', loadTimers);
