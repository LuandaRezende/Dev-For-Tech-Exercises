function salvar() {
    let texto = document.getElementById("texto").value;

    let titulo = document.getElementById("titulo").value;

    let blob = new Blob([texto],
        {
            type: "text/plain;charset=utf-8"

        });
    saveAs(blob, titulo + ".txt");
}