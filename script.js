const API_URL = "https://jsonplaceholder.typicode.com/posts";


async function carregarPosts() {

    const container = document.getElementById("posts");

    try {

        const resposta = await axios.get(`${API_URL}?_limit=5`);

        container.innerHTML = "";

        resposta.data.forEach(post => {
            adicionarPostNaTela(post);
        });

    } catch (erro) {

        console.error("Erro ao carregar posts:", erro);

        container.innerHTML = `
            <p class="erro">
                Não foi possível carregar os posts.
                Tente novamente mais tarde.
            </p>
        `;
    }
}


function adicionarPostNaTela(post) {

    const container = document.getElementById("posts");

    const div = document.createElement("div");

    div.classList.add("post");

    div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;

    container.appendChild(div);
}

const formulario = document.getElementById("postForm");

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const corpo = document.getElementById("corpo").value;

    const loading = document.getElementById("loading");
    const mensagem = document.getElementById("mensagem");
    const botao = document.getElementById("botaoEnviar");

    try {

        loading.style.display = "block";

        mensagem.textContent = "";

        botao.disabled = true;


        const resposta = await axios.post(API_URL, {

            title: titulo,
            body: corpo,
            userId: 1

        });


        console.log("Post criado:", resposta.data);


        adicionarPostNaTela(resposta.data);

        mensagem.textContent = "Boa mano o negocio foi com sucesso!";
        mensagem.className = "sucesso";

        formulario.reset();


    } catch (erro) {

        console.error("Erro ao criar post:", erro);

        mensagem.textContent =
            "Deu certo não man. Tente novamente.";

        mensagem.className = "erro";


    } finally {

        loading.style.display = "none";

        botao.disabled = false;

    }

});

carregarPosts();