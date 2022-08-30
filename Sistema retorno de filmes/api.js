getFilmes();

function getFilmes() {
    const table = document.getElementById('table');

    fetch(`https://api.tvmaze.com/search/shows?q=shrek`).then(retorno_filmes => {
        return retorno_filmes.json();
    }).then(filmes => {
        filmes.forEach(filme => {
            table.innerHTML += "<tr>" +
                "<td>" + filme.show.name + "</td>" +
                "<td>" + filme.show.url + "</td>" +
                "</tr>"
        });
    });
}