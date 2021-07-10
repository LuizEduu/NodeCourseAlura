let tabelaLivros = document.querySelector('tbody');
tabelaLivros.addEventListener('click', (evento) => {
    let elementoClicado = evento.target;

    if (elementoClicado.dataset.type == 'delete') {
        let livroId = elementoClicado.dataset.ref;
        fetch(`http://localhost:3000/livros/${livroId}`, { method: 'DELETE' })
            .then(() => {
                const td = elementoClicado.parentNode
                td.parentNode.remove()
            })
            .catch(erro => console.log(erro));
    }
});