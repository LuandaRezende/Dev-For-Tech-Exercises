$(function () {

    var operacao = "A";
    var indice_selecionado = -1;
    var tbClientes = localStorage.getItem("tbClientes");

    tbClientes = JSON.parse(tbClientes);

    if (tbClientes == null)
        tbClientes = [];

    function Adicionar() {
        var cli = GetCliente("Codigo", $("#txtCodigo").val());

        if (cli != null) {
            alert("Código já cadastrado.");
            return;
        }

        var cliente = JSON.stringify({
            Codigo: $("#txtCodigo").val(),
            Nome: $("#txtNome").val(),
            Telefone: $("#txtTelefone").val(),
            Email: $("#txtEmail").val(),
            DtCad: $("#txtDtCad").val()
        });


        tbClientes.push(cliente);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro adicionado.");
        return true;

    }

    function Editar() {
        tbClientes[indice_selecionado] = JSON.stringify({
            Codigo: $("#txtCodigo").val(),
            Nome: $("#txtNome").val(),
            Telefone: $("#txtTelefone").val(),
            Email: $("#txtEmail").val(),
            DtCad: $("#txtDtCad").val()
        });
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Informações editadas.")
        operacao = "A";
        return true;
    }

    function Listar() {
        $("#tblListar").html("");
        $("#tblListar").html(
            "<thead>" +
            "	<tr>" +
            "	<th>Código</th>" +
            "	<th>Pessoa</th>" +
            "	<th>Telefone</th>" +
            "	<th>Email</th>" +
            "	<th>Data Cad</th>" +
            "	<th>Opções</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );

        for (var i in tbClientes) {
            var cli = JSON.parse(tbClientes[i]);

            var dtfinal = cli.DtCad.substring(8, 10) + "/" + cli.DtCad.substring(5, 7) + "/" + cli.DtCad.substring(0, 4);
            $("#tblListar tbody").append("<tr>" +
                "	<td>" + cli.Codigo + "</td>" +
                "	<td>" + cli.Nome + "</td>" +
                "	<td>" + cli.Telefone + "</td>" +
                "	<td>" + cli.Email + "</td>" +
                "	<td>" + dtfinal + "</td>" +
                "	<td><button alt='" + i + "' class='btnEditar btn btn-primary m-2'><i class='fa fa-pencil' /></button><button" + i + "' class='btnExcluir btn btn-danger'><i class='fa fa-trash'/></button></td>" +
                "</tr>");
        }
    }

    function Excluir() {
        tbClientes.splice(indice_selecionado, 1);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        confirm("Deseja realmente excluir");
    }

    function GetCliente(propriedade, valor) {
        var cli = null;
        for (var item in tbClientes) {
            var i = JSON.parse(tbClientes[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
    }

    Listar();

    $("#frmCadastro").on("submit", function () {
        if (operacao == "A") {
            return Adicionar();
        } else
            return Editar();
    });

    $("#tblListar").on("click", ".btnEditar", function () {
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        var cli = JSON.parse(tbClientes[indice_selecionado]);
        $("#txtCodigo").val(cli.Codigo);
        $("#txtNome").val(cli.Nome);
        $("#txtTelefone").val(cli.Telefone);
        $("#txtEmail").val(cli.Email);
        $("#txtDtCad").val()(cli.DtCad);
        $("#txtCodigo").attr("readonly", "readonly");
        $("#txtNome").focus();
    });

    $("#tblListar").on("click", ".btnExcluir", function () {
        indice_selecionado = parseInt($(this).attr("alt"));
        Excluir();
        Listar();
    });

    var ultimo = JSON.parse(tbClientes.slice(-1));
    var ultconv = parseInt(ultimo.Codigo);

    $("#txtCodigo").val(ultconv + 1);

    $("#txtNome").change(function () {
        var pessoa = $(this).val();

        if (pessoa == "Wilson") {
            $("#txtStatus").val('Em aberto');
        } else
            $("#txtStatus").val('Em andamento');
    });

    var data = new Date();

    var dia = data.getDate();
    var dia_sem = data.getDay();
    var mes = data.getMonth();
    var ano2 = data.getYear();
    var ano4 = data.getFullYear();
    var hora = data.getHours();
    var min = data.getMinutes();
    var seg = data.getSeconds();
    var mseg = data.getMilliseconds();
    var tz = data.getTimezoneOffset();

    if (dia < 10) {
        dia = '0' + dia;
    }

    if (mes < 10) {
        mes = '0' + (mes + 1);
    }

    var str_data = dia + '/' + (mes + 1) + '/' + ano4;
    var str_data_Brazil = ano4 + '-' + mes + '-' + dia;
    var hora_geral = hora + ':' + min;

    $("#txtDtCad").val(str_data_Brazil);
    $("#txtHora").val(hora_geral);

});