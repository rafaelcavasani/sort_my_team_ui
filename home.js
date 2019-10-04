function add_player() {
    const selPosition = document.getElementById("slPosition");
    const position = { "text": selPosition.options[selPosition.selectedIndex].text, "value": selPosition.value };
    const name = document.getElementById("txtName").value;
    const importance = document.getElementById("txtImportance").value;
    const player = {
        "position": selPosition.value,
        "name": name,
        "importance": importance
    }

    if (player_validate(player)) {
        if (position.value == "goalkeeper") {
            include_goalkeeper(player);
        }
        if (position.value == "defender") {
            include_defender(player);
        }
        if (position.value == "sideway") {
            include_sideway(player);
        }
        if (position.value == "midfield") {
            include_midfield(player);
        }
        if (position.value == "striker") {
            include_striker(player);
        }
    }
}

function player_validate(player) {
    if (player.name == "") {
        alert("Preencha o nome do jogador.");
        return false;
    }
    if (player.importance == "") {
        alert("Preencha a nota do jogador.");
        return false;
    }
    if (player.importance < 1 || player.importance > 5) {
        alert("A nota do jogador deve ser entre 1 e 5.")
        return false;   
    }
    return true;
}

function include_goalkeeper(player) {
    if ($('.goalkeeper').length < 2) {
        $("#divGoalKeeper").append("<div class='player goalkeeper'><div class='col-4 p-0 float-left position'>Goleiro</div><div class='col-4 p-0 float-left name'>"+player.name+"</div><div class='col-4 p-0 float-left importance'>"+player.importance+"</div></div>");
    } else {
        alert("Não pode incluir mais de 2 goleiros.");
    }
}

function include_defender(player) {
    $("#divDefender").append("<div class='player defender'><div class='col-4 p-0 float-left position'>Zagueiro</div><div class='col-4 p-0 float-left name'>"+player.name+"</div><div class='col-4 p-0 float-left importance'>"+player.importance+"</div></div>");
}

function include_sideway(player) {
    $("#divSideway").append("<div class='player sideway'><div class='col-4 p-0 float-left position'>Lateral</div><div class='col-4 p-0 float-left name'>"+player.name+"</div><div class='col-4 p-0 float-left importance'>"+player.importance+"</div></div>");
}

function include_midfield(player) {
    $("#divMidfield").append("<div class='player midfield'><div class='col-4 p-0 float-left position'>Meio Campo</div><div class='col-4 p-0 float-left name'>" + player.name + "</div><div class='col-4 p-0 float-left importance'>" + player.importance + "</div></div>");
}

function include_striker(player) {
    $("#divStriker").append("<div class='player striker'><div class='col-4 p-0 float-left position'>Atacante</div><div class='col-4 p-0 float-left name'>" + player.name + "</div><div class='col-4 p-0 float-left importance'>" + player.importance + "</div></div>");
}

function get_players() {
    const players = {};
    const goalkeeper = [];
    const defender = [];
    const sideway = [];
    const midfield = [];
    const striker = [];
    $("#divGoalKeeper").find(".player").each(function () {
        const position = "goalkeeper";
        const name = $(this).find('.name').text();
        const importance = $(this).find('.importance').text();
        goalkeeper.push({ "name": name, "position": position, "importance": importance });
    });
    $("#divDefender").find(".player").each(function () {
        const position = "defender";
        const name = $(this).find('.name').text();
        const importance = $(this).find('.importance').text();
        defender.push({ "name": name, "position": position, "importance": importance });
    });
    $("#divSideway").find(".player").each(function () {
        const position = "sideway";
        const name = $(this).find('.name').text();
        const importance = $(this).find('.importance').text();
        sideway.push({ "name": name, "position": position, "importance": importance });
    });
    $("#divMidfield").find(".player").each(function () {
        const position = "midfield";
        const name = $(this).find('.name').text();
        const importance = $(this).find('.importance').text();
        midfield.push({ "name": name, "position": position, "importance": importance });
    });
    $("#divStriker").find(".player").each(function () {
        const position = $(this).find('.position').text();
        const name = $(this).find('.name').text();
        const importance = $(this).find('.importance').text();
        striker.push({ "name": name, "position": position, "importance": importance });
    });
    players["goalkeeper"] = goalkeeper;
    players["defender"] = defender;
    players["sideway"] = sideway;
    players["midfield"] = midfield;
    players["striker"] = striker;
    return players;
}

function sort_team() {
    const players = get_players();
    console.log(players);
    $.ajax({
        url: "https://sort-my-team.herokuapp.com/",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(players),
        success: function (data) {
            console.log(data.team1);
        }
    });
}