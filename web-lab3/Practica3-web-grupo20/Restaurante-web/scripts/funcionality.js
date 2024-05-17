var copa = false, cafe = false, dict_mesas = { "m1": {}, "m2": {}, "m3": {}, "m4": {}, "m5": {} }, dict_copas = { "m1": [false, false], "m2": [false, false], "m3": [false, false], "m4": [false, false], "m5": [false, false] };


$(document).ready(function () {
    $("#listap1").show();
    $("#listap2").hide();
    $("#listap3").hide();

    $("#primeros").click(() => { $("#listap1").show(); $("#listap2").hide(); $("#listap3").hide(); });
    $("#segundos").click(() => { $("#listap1").hide(); $("#listap2").show(); $("#listap3").hide(); });
    $("#postres").click(() => { $("#listap1").hide(); $("#listap2").hide(); $("#listap3").show(); });
});


$(document).ready(function () {
    function addPedido(listaId) {
        $(listaId).dblclick(function (ev) {
            // Precio de todos los platos anteriores
            var precioPlatos = parseFloat($("#precio").val());

            // Extraigo valoes del elemento seleccionado
            var valor = $(this).children("option:selected").val();
            var texto = $(this).children("option:selected").text();

            // Sumo el precio del plato seleccionado al que ya había
            var nuevoPrecio = precioPlatos + parseFloat(valor);
            nuevoPrecio = Number(nuevoPrecio.toFixed(1));

            // Actualizo campo de texto
            $("#precio").val(nuevoPrecio);

            // Añado nuevo plato a pedidos
            $("#pedidos").append(new Option(texto, valor));
        });
    }

    addPedido("#listap1");
    addPedido("#listap2");
    addPedido("#listap3");
});


$(document).ready(() => {
  $("#pedidos").on("dblclick", ev => {
    const valor = parseFloat($("#pedidos option:selected").val());
    const precioPlatos = parseFloat($("#precio").val());
    $("#precio").val(precioPlatos - valor);
    $("#pedidos option:selected").remove();
  });

  $("#mesas").on("click", ev => {
    const mesa_seleccionada = $("#mesas").val();
    const mesa = dict_mesas[mesa_seleccionada];
    const copa = dict_copas[mesa_seleccionada];
    $("#pedidos option").each(function () { mesa[$(this).text()] = $(this).val(); });
    copa[0] = $("#cafe").is(':checked');
    copa[1] = $("#copa").is(':checked');
  });

  $("#mesas").on("change", ev => {
    $('#pedidos')[0].options.length = 0;
    $("#cafe").prop("checked", false);
    $("#copa").prop("checked", false);
    let precio = 0;
    const mesa_seleccionada = $("#mesas").val();
    const mesa = dict_mesas[mesa_seleccionada];
    $.each(mesa, (texto, valor) => {
      $('#pedidos').append(new Option(texto, valor));
      precio += parseFloat(valor);
    });
    const copas = dict_copas[mesa_seleccionada];
    if (copas[0]) {
      $("#cafe").prop("checked", true);
      precio += parseFloat($("#cafe").val());
    }
    if (copas[1]) {
      $("#copa").prop("checked", true);
      precio += parseFloat($("#copa").val());
    }
    $("#precio").val(precio);
  });
});



$(document).ready(() => {
  $("#boton").click(() => {
    window.alert("Has pagado");
    $("#precio").val(0);
    $("#cafe, #copa").prop("checked", false);
    $('#pedidos')[0].options.length = 0;
    const mesa_seleccionada = $("#mesas").val();
    dict_mesas[mesa_seleccionada] = {};
    dict_copas[mesa_seleccionada] = [false, false];
  });

  $("#copa, #cafe").click(() => {
    const precioActual = parseFloat($("#precio").val());
    const precioCopa = parseFloat($("#copa").val());
    const isChecked = $("#copa").is(':checked') || $("#cafe").is(':checked');
    $("#precio").val(isChecked ? precioActual + precioCopa : precioActual - precioCopa);
  });
});
