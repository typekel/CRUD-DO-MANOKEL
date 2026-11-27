 

        // ==================================================
        // 🟢 NOVO: CONFIGURAÇÃO DO PROJETO FIREBASE
        // ==================================================

        // 🟢 Identifica o projeto Firebase ao qual a aplicação pertence
        const firebaseConfig = {

            // 🟢 Chave de identificação do projeto
            apiKey: "AIzaSyBZjUkf4EoAHgOExm7zfDCllWc1Ju4JSkI",

            // 🟢 Domínio de autenticação do projeto
            authDomain: "projetovk-83ab6.firebaseapp.com",

            // 🟢 Endereço do banco de dados na nuvem
            databaseURL:  "https://projetovk-83ab6-default-rtdb.firebaseio.com",

            // 🟢 Nome do projeto Firebase
            projectId: "projetovk-83ab6",

            // 🟢 Identificação do armazenamento de arquivos
            storageBucket: "projetovk-83ab6.firebasestorage.app",

            // 🟢 Identificação do serviço de mensagens
            messagingSenderId: "141318688896",

            // 🟢 Identificação específica da aplicação
            appId:  "1:141318688896:web:2673b219d0f81967289665"
        };


        // ==================================================
        // 🟢 NOVO: INICIALIZAÇÃO DO FIREBASE
        // ==================================================

        // 🟢 Conecta a aplicação ao projeto configurado acima
        firebase.initializeApp(firebaseConfig);

        // 🟢 Cria uma referência para acessar o banco de dados
        // ⚪ Analogia: É como abrir a porta do arquivo central
        const db = firebase.database();


        // ==================================================
        // 🔴 SUBSTITUÍDO: ARMAZENAMENTO DOS USUÁRIOS
        // ==================================================

        // 🔴 ANTES, NO CÓDIGO 01:
        // let nomes = [];

        // 🟢 AGORA, NO CÓDIGO 02:
        // Utilizamos um objeto para guardar os dados recebidos da nuvem
        let nomesLocais = {};


        // ==================================================
        // 🟢 NOVO: LEITURA AUTOMÁTICA DO FIREBASE
        // ==================================================

        // 🟢 Acessa o caminho "usuarios" no banco de dados
        // 🟢 O método on("value") observa alterações nesse caminho
        db.ref("usuarios").on("value", (snapshot) => {

            // 🟢 Recupera os dados recebidos do Firebase
            // 🟢 Se não houver dados, utiliza um objeto vazio
            nomesLocais = snapshot.val() || {};

            // 🟢 Atualiza a lista apresentada na tela
            // ⚪ Analogia: O Firebase avisa que chegou uma nova ficha
            // e a aplicação reorganiza a vitrine de usuários
            pesquisar();

        }, (erro) => {

            // 🟢 Mostra o erro no console do navegador
            console.error("Erro ao carregar dados:", erro);

            // 🟢 Informa o usuário que houve um problema
            alert("Erro ao carregar os usuários!");

        });


        // ==================================================
        // 🔴 SUBSTITUÍDO: FUNÇÃO SALVAR
        // ==================================================

        function salvar() {

            // 🔵 Recupera o campo onde o nome é digitado
            let input = document.getElementById("nome");

            // 🔴 ANTES: O Código 01 recuperava diretamente o valor do ID
            // let id = document.getElementById("idNome").value;

            // 🟢 AGORA: Guardamos o próprio elemento HTML em uma variável
            let idInput = document.getElementById("idNome");

            // 🟢 Recupera o nome e remove espaços das extremidades
            // ⚪ Exemplo: "   João   " transforma-se em "João"
            let nomeValor = input.value.trim();


            // 🔴 SUBSTITUÍDO: Verificação do campo vazio
            // ANTES: if (input.value === "") return alert(...);

            // 🟢 AGORA: Também impede o cadastro de espaços vazios
            if (nomeValor === "") {

                alert("Digite um nome válido!");

                // 🟢 Interrompe a execução da função
                return;
            }


            // ==================================================
            // 🟢 NOVO: DECISÃO ENTRE CRIAR E ATUALIZAR
            // ==================================================

            // 🟢 Se existe um ID, significa que estamos editando
            if (idInput.value) {

                // 🟢 Localiza o usuário pelo ID e grava os novos dados
                // ⚪ Analogia: Abre uma ficha existente e troca seu conteúdo
                db.ref("usuarios/" + idInput.value)
                  .set({ nome: nomeValor });

            } else {

                // 🟢 Se não existe ID, cria um novo usuário
                // 🟢 O Firebase gera automaticamente um ID exclusivo
                // ⚪ Analogia: Abre uma ficha nova e gera seu protocolo
                db.ref("usuarios").push({ nome: nomeValor });

            }


            // 🔵 MANTIDO: Limpa o campo de digitação
            input.value = "";

            // 🔴 SUBSTITUÍDO: Agora também limpamos o campo de identificação
            idInput.value = "";

            // 🔴 ANTES, NO CÓDIGO 01:
            // desenharTela();

            // 🟢 AGORA: O observador on("value") atualiza a lista
        }


        // ==================================================
        // 🔴 SUBSTITUÍDO: FUNÇÃO PESQUISAR / LISTAR
        // ==================================================

        function pesquisar() {

            // 🔵 MANTIDO: Captura o texto digitado na pesquisa
            // toLowerCase() permite pesquisar sem diferenciar maiúsculas
            let termo = document.getElementById("pesquisa").value.toLowerCase();

            // 🟢 NOVO: Recupera o elemento HTML da lista
            let lista = document.getElementById("lista");

            // 🟢 NOVO: Limpa a lista antes de preenchê-la novamente
            lista.innerHTML = "";


            // 🔴 ANTES, NO CÓDIGO 01:
            // nomes.filter(...)
            //
            // 🟢 AGORA:
            // Percorremos o objeto que contém os usuários recebidos do Firebase
            for (let id in nomesLocais) {

                // 🟢 Recupera os dados do usuário associado àquele ID
                let usuario = nomesLocais[id];


                // 🔵 MANTIDO: Verifica se o nome contém o termo pesquisado
                if (usuario.nome.toLowerCase().includes(termo)) {

                    // 🟢 NOVO: Cria um elemento HTML do tipo <li>
                    let li = document.createElement("li");


                    // 🔴 SUBSTITUÍDO: Os botões agora trabalham com o ID do Firebase
                    // ANTES: editar(index) e deletar(index)

                    // 🟢 AGORA: Editar e remover recebem o ID exclusivo
                    // ⚪ Observação: Esta montagem é didática.
                    // Para produção, prefira textContent e criação separada dos botões.
                    li.innerHTML = `${usuario.nome}
                        <button onclick="editar('${id}', '${usuario.nome}')">
                            Editar
                        </button>

                        <button onclick="remover('${id}')">
                            Excluir
                        </button>`;


                    // 🟢 NOVO: Adiciona o item criado dentro da lista HTML
                    lista.appendChild(li);

                }

            }

        }


        // ==================================================
        // 🔴 SUBSTITUÍDO: FUNÇÃO EDITAR
        // ==================================================

        // 🔴 ANTES:
        // function editar(index) { ... }

        // 🟢 AGORA: Recebe o ID e o nome do usuário
        function editar(id, nome) {

            // 🟢 Guarda o ID no campo oculto
            // ⚪ Assim, salvar() saberá qual usuário precisa atualizar
            document.getElementById("idNome").value = id;

            // 🔵 MANTIDO: Preenche o campo com o nome atual
            document.getElementById("nome").value = nome;

        }


        // ==================================================
        // 🔴 SUBSTITUÍDO: FUNÇÃO EXCLUIR
        // ==================================================

        // 🔴 ANTES:
        // function deletar(index) {
        //     nomes.splice(index, 1);
        //     desenharTela();
        // }

        // 🟢 AGORA: Recebe o ID do usuário no Firebase
        function remover(id) {

            // 🟢 Pergunta se o usuário confirma a exclusão
            if (confirm("Deseja realmente excluir este usuário?")) {

                // 🟢 Localiza o registro e solicita sua remoção na nuvem
                db.ref("usuarios/" + id).remove();

            }

        }


        // ==================================================
        // 🔴 SUBSTITUÍDO: FUNÇÃO LIMPAR TUDO
        // ==================================================

        function limparTudo() {

            // 🔴 ANTES: A confirmação perguntava sobre a lista local
            // 🟢 AGORA: A confirmação informa que os dados estão na nuvem
            if (confirm("Tem certeza que deseja apagar TODOS os usuários da nuvem?")) {

                // 🔴 ANTES:
                // nomes = [];

                // 🟢 AGORA:
                // Remove todos os registros que estão no caminho usuarios
                db.ref("usuarios").remove();

            }

        }
