 // Função para formatar os dados que serão exibidos
 const displayRentalInfo = () => {
    // Recuperando os dados do localStorage
    const timers = JSON.parse(localStorage.getItem('timers')) || [];
    const lastTimer = timers[timers.length - 1]; // Obtendo o último cronômetro criado

    if (lastTimer) {
        const nome = lastTimer.nome || 'Não informado';
        const cpf = lastTimer.cpf || 'Não informado';
        const rg = lastTimer.rg || 'Não informado';
        const celular = lastTimer.celular || 'Não informado';
        const horarioSaida = lastTimer.horarioSaida || 'Não informado';
        const horarioRetorno = lastTimer.horarioRetorno || 'Não informado';
        const valor = lastTimer.valor && !isNaN(lastTimer.valor) ? parseFloat(lastTimer.valor).toFixed(2) : 'Valor não informado';
        const formaPagamento = lastTimer.formaPagamento || 'Não informado';
        const bicicletas = lastTimer.bicicletas || 'Não informado';
        const extensoes = lastTimer.extensoes || 'Nenhuma';
        const carrocelas = lastTimer.carrocelas || 'Nenhuma';

        const rentalInfo = `
            <h3>Dados do Locatário</h3>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>CPF:</strong> ${cpf}</p>
            <p><strong>RG:</strong> ${rg}</p>
            <p><strong>Celular:</strong> ${celular}</p>
            <p><strong>Horário de Saída:</strong> ${horarioSaida}</p>
            <p><strong>Horário de Retorno:</strong> ${horarioRetorno}</p>
            <p><strong>Valor a Pagar:</strong> R$ ${valor}</p>
            <p><strong>Forma de Pagamento:</strong> ${formaPagamento}</p>
            <p><strong>Número de Bicicletas:</strong> ${bicicletas}</p>
            <p><strong>Extensões:</strong> ${extensoes}</p>
            <p><strong>Carrocelas:</strong> ${carrocelas}</p>
            <hr>
            <h4>Responsabilidade</h4>
            <p>
                AO CONDUTOR MAIOR DE 14 ANOS;<br>
                ZELAR PELA INTEGRIDADE DAS BICICLETAS;<br>
                RESGATE APENAS NA OCIAN, TUPI E MIRIM. TAXA DE RESGATE FORA DOS LOCAIS CITADOS R$15,00.<br>
                COBRAMOS O TEMPO EXCEDIDO NA DEVOLUÇÃO. NÃO NOS RESPONSABILIZAMOS POR DANOS CAUSADOS A TERCEIROS.<br>
                COBRAMOS POR PNEU FURADO R$10,00.<br>
                NÃO FAZEMOS DEVOLUÇÃO DE PAGAMENTO, PROIBIDO CONDUZIR EM ESTADO DE EMBRIAGUEZ.<br>
                ANDAR SOMENTE PELA CICLOVIA EM UMA VELOCIDADE DE NO MÍNIMO 10KM/H, SOB PENA DE PAGAR MULTA DE ....<br>
                CASO INFRIJA A LEI MUNICIPAL ......... DE PRAIA GRANDE.<br>
                SORRIA, VOCÊ ESTÁ SENDO OBSERVADO, BOM PASSEIO!<br><br>
                ASSUMO, PORTANTO, TODO E QUAISQUER DANOS OU ACIDENTES CAUSADOS AO VEÍCULO, ENQUANTO ESTIVER SOB MINHA RESPONSABILIDADE.<br>
                ASSIM COMO ME RESPONSABILIZO QUANTO AO RESSARCIMENTO NO CASO DE ROUBO, FURTO E DANOS DIRETOS OU INDIRETOS, TANTO A TERCEIROS QUANTO AO PATRIMÔNIO PÚBLICO, RESPONDENDO SOB AS PENAS DA LEI E ISENTANDO O LOCADOR E PROPRIETÁRIO DAS BICICLETAS (VIC EKO BIKES) CNPJ 41.385.349./0001-79 CIVIL E CRIMINALMENTE DE TODA E QUALQUER RESPONSABILIDADE.
            </p>
            <p>Eu, ${nome} declaro que estou ciente de todos os termos e condições do aluguel de bicicletas e equipamentos, e aceito os termos de responsabilidade descritos acima. <br> ASSINATURA:_________________________________________.</p>
        `;
        document.getElementById('rentalInfo').innerHTML = rentalInfo;

        // Exibir o código em uma página separada
        const uniqueCode = lastTimer.codigo || 'Código não gerado';
        document.getElementById('codeSection').innerHTML = `
            <h2>Código do Locatário</h2>
            <p><strong>Código único:</strong> ${uniqueCode}</p>
        `;
    } else {
        document.getElementById('rentalInfo').innerHTML = `<p>Nenhum dado de locatário encontrado.</p>`;
        document.getElementById('codeSection').innerHTML = `<p>Código não disponível.</p>`;
    }
};

// Carregar os dados ao carregar a página
window.addEventListener('DOMContentLoaded', displayRentalInfo);
