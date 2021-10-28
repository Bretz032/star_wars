//Variaveis Globais
let starships=[];
//Realiza Funcoes da pagina ao carregar
$( document ).ready(function() {
  //PreencheVetorComTodasAsNaves
  starships_load(1);
});

//Submit Do calculo
$( "#forms_calculo" ).submit(function( event ) {
   
  calc_starship_stop( $('#input_usuario').val());
  event.preventDefault();
  });

//Calcula Quantidade de Paradas
let preencher_tabela =  function(){
  for (var i=0; i<starships.length;i++) {
    console.log(i)
  $( "#body_tabela" ).append( `<tr>
  <td>`+starships[i]['nome']+`</td>
  <td>`+starships[i]['classe_nave']+`</td>
  <td>`+starships[i]['preco']+`</td>
  <td>`+starships[i]['tamanho']+`</td>
  <td>`+starships[i]['equipe']+`</td>
  <td>`+starships[i]['passageiros']+`</td>
  <td>`+starships[i]['capacidade_carga']+`</td>
  <td>`+starships[i]['paradas']+`</td>
</tr>`);
  }
  $( "#form_calculo" ).hide();

  $( "#tabela_resultado" ).show();

  
}


//Calcula Quantidade de Paradas
let calc_starship_stop =  function(input){
  //input/mglt*hours
  for (var i=0; i<starships.length;i++) {
    if(starships[i]['consumiveis']=='desconhecido'||starships[i]['MGLT']=='unknown'){
      starships[i]['paradas'] = 'Desconhecido'
    }
    else{
      starships[i]['paradas'] = Math.round(input/(starships[i]['MGLT']*starships[i]['consumiveis']))
    }
  }
  preencher_tabela();
}

//ConverteConsumiveis para horas
let convert_consumables =  function(){
  for (var i=0; i<starships.length;i++) {
    //ConverteHora
    if(starships[i]['consumiveis'].split(' ')[1]=='hours'||starships[i]['consumiveis'].split(' ')[1]=='hour'){
      starships[i]['consumiveis']=starships[i]['consumiveis'].split(' ')[0];//1 hours to 1
    }
    //ConverteDiaParaHoras
    else if(starships[i]['consumiveis'].split(' ')[1]=='days'||starships[i]['consumiveis'].split(' ')[1]=='day'){
      starships[i]['consumiveis']=starships[i]['consumiveis'].split(' ')[0]*24;
    }
    //ConverteSemanaParaHoras
    else if(starships[i]['consumiveis'].split(' ')[1]=='week'||starships[i]['consumiveis'].split(' ')[1]=='weeks'){
      starships[i]['consumiveis']=starships[i]['consumiveis'].split(' ')[0]*168;//1 semana = 168 horas
    }
    //ConverteMesParaHoras
    else if(starships[i]['consumiveis'].split(' ')[1]=='months'||starships[i]['consumiveis'].split(' ')[1]=='month'){
      starships[i]['consumiveis']=starships[i]['consumiveis'].split(' ')[0]*730;//1 mes = 730 horas
    }
    //ConverteAnoParaHoras
    else if(starships[i]['consumiveis'].split(' ')[1]=='years'||starships[i]['consumiveis'].split(' ')[1]=='year'){
      starships[i]['consumiveis']=starships[i]['consumiveis'].split(' ')[0]*8760;//Ano mes = 8760 horas
     }
    else  {
      starships[i]['consumiveis']='desconhecido'
     }
}


}

//PreencheVetorComTodasAsNaves
let starships_load =  function(page){
 //Url Base para pegar os dados
  var url = "https://swapi.dev/api/starships/?page="+page+"&format=json";
 
  //Request Na Api
  $.ajax({
    url: url,
    method: "GET",
    success: function (data) {
      //Montando objeto com as naves e caracteristicas necessarias
      for (var i=0; i<data.results.length;i++) {
          //MontaObjeto
          var obj_aux={};
          obj_aux['nome']=data.results[i].name;
          obj_aux['preco']=data.results[i].cost_in_credits;
          obj_aux['tamanho']=data.results[i].length;
          obj_aux['equipe']=data.results[i].crew;
          obj_aux['passageiros']=data.results[i].passengers;
          obj_aux['capacidade_carga']=data.results[i].cargo_capacity;
          obj_aux['classe_nave']=data.results[i].starship_class;
          obj_aux['consumiveis']=data.results[i].consumables;
          obj_aux['MGLT']=data.results[i].MGLT;
          obj_aux['paradas']='';

          //Cria Vetor
          starships.push(obj_aux);
      }
      if(data.next!=null){
        starships_load(page + 1)
      }
      else{
        convert_consumables();
      }
      
    }
     
  })

 
}

 