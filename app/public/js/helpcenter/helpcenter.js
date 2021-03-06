var pagina = 1;
var tamanho = 1;

$(document).ready(function() {
    $('#search_select').val("data").change();
    list_topics();
});

function animaLoad() {
    $(".progress").addClass('hide').hide('slow');
    $("#topics_section").fadeIn('fast').removeClass('hide');
}

function render(dados) {
    return `<div id="${dados._id}" class="topico" onclick="enter_topic('${dados._id}')">
        <a class="collection-item avatar">
            ${dados.imagem ?
                `<img class="circle" src="../public/uploads/${dados.imagem}">`:
                `<img src="../public/img/user.png" alt="" class="circle">`
            }
            <div class="row">
                <div class="col s6">
            <span class="black-text topico-nome">${removeTags(dados.username)}</span><br>
            <span class="black-text topico-titulo">${removeTags(dados.titulo)}</span><br>
            <span class="grey-text topico-data">${removeTags(dados.data)}</span>
                </div>
                
            <span class="secondary-content col s5">
                <div class="itens right">
            ${dados.resolvido ? `<i class="material-icons green-text" value="${dados.resolvido}">check_circle</i>` : 
                `<i class="material-icons grey-text" value="${dados.resolvido}">check_circle</i>`}
                <span class="material-icons number grey-text"></span>
                <i class="material-icons grey-text">thumb_up</i>
                <span class="material-icons number grey-text">${dados.numeroLikes}</span>
                <i class="material-icons grey-text">comment</i>
                <span class="material-icons number grey-text">${dados.numeroComentarios}</span>
            </span> 
                </div>
                
            </div>
            <div class="tags">
            <div class="${dados.tags[0].length ? `right` : `hide` }"> 
            ${dados.tags.length ? dados.tags.map( element => `<span class="chip">${removeTags(element)}</span>`).join('') : ''}           
            </div>
            &nbsp;
                </div>
        </a>
    </<span>
</div>`;
}

function list_topics(busca='atividade', dados='') {

    let endpoint = '';
    if(dados) endpoint = busca + '/' + dados + '/' + pagina;
    else endpoint = busca + '/' + pagina;
    
    fetch("/helpCenter/" + endpoint, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(posts => {
            if (posts.erro)
                console.log(posts.erro);
            else {
                tamanho = posts.count;
                if(posts.postagens.length > 0) {
                    animaLoad()
                    $("#list-posts").removeClass("hide");
                    $('#list-posts').html(posts.postagens.map(posts => render(posts)).join(''));
                    paginacaoView(busca, dados);
                }
                else {
                    $("#list-posts").addClass("hide");
                    $(".pagination").html("");
                    M.toast({html: 'Nenhum tópico encontrado.',displayLength: 2000});
                }
            }
        })
        .catch(console.log);
}

function new_topic() {
    window.location.href = "/helpcenter/novo";
    
}

function enter_topic(id) {
    window.location.href = "/helpCenter/topico/" + id
}

function paginacaoView(busca, dados) {
    let espaco = 2;
    let inicioJanela = pagina - espaco;
    let fimJanela = parseInt(pagina) + parseInt(espaco);

    if (inicioJanela < 1)
        inicioJanela = 1;
    if (fimJanela > tamanho)
        fimJanela = tamanho;

    $('.pagination').html(`<li class="waves-effect"><a onclick="paginacaoFetch('${1}', '${busca}', '${dados}')" class="white-text"><i class="material-icons">chevron_left</i></a></li>`);
    for (let index = inicioJanela; index <= fimJanela; index++) {
        if (index == pagina)
            $('.pagination')
            .append(`<li class="active grey"><a onclick="paginacaoFetch('${index}', '${busca}', '${dados}')">${index}</a></li>`);
        else
            $('.pagination')
            .append(`<li class="waves-effect"><a onclick="paginacaoFetch('${index}', '${busca}', '${dados}')" class="white-text">${index}</a></li>`);
    }
    $('.pagination')
        .append(`<li class="waves-effect"><a onclick="paginacaoFetch('${tamanho}', '${busca}', '${dados}')" class="white-text"><i class="material-icons">chevron_right</i></a></li>`);
}

function paginacaoFetch(pag, busca, dados) {
    pagina = parseInt(pag);
    list_topics(busca, dados);
}

function searchOp() {
    tamanho = 0;
    pagina = 1;
    
    let option = $('select#search_select').val();

    $(".input-search").addClass('hide');
    $("#div_" + option).removeClass('hide');

    $('.input-field').children().val('');
    $("select#search_select").formSelect();
}

function buscar(){
    
    let option = $('select#search_select').val();
    value = ''
    
    if (option == 'tag') {
        let chips = []
        let array = M.Chips.getInstance($('.chips')).chipsData;
        array.forEach(element => {
            chips.push(element.tag);
        });
        value = chips.join('+');
    } else {
        value  = $("#div_" + option).children().val();
    }
    
    value != '' ? list_topics(option, value.replace(/\//g, '-')) 
                : list_topics()
}


// function buscaTags(params, tags) {
//     params.map(function(index){
//         if(index.tags[0].split(',').includes(tags)){
//             console.log(index);
//         };
//     });
// }