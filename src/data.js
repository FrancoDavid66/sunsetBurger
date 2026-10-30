// ============================================================
//  DATOS DEL LOCAL — editá acá precios, horarios, carta y recetas
// ============================================================

export const WHATSAPP = "5491133163698";
export const HORARIOS = {0:[[1200,1410]],1:[],2:[[720,900],[1200,1410]],3:[[720,900],[1200,1410]],4:[[720,900],[1200,1410]],5:[[720,900],[1200,1410]],6:[[720,900],[1200,1410]]};
export const T3=[14500,17300,21000], T2=[14500,17300];
export const BURGERS=[
  ["Shelby","Cheddar, panceta ahumada, salsa de libra.",T3],
  ["Lexie","Cheddar, danbo, cebolla caramelizada.",T3],
  ["Damon","Solo cheddar.",[14000,16800,21000]],
  ["Devi","Cheddar, cebolla, lechuga, tomate, salsa tasty original.",T3],
  ["Paxton","Cheddar, panceta ahumada, salsa stacker.",T3],
  ["Serena","Cheddar, aros de cebolla, barbacoa.",T3],
  ["Max","Danbo, champiñones, cebolla caramelizada, mayonesa.",T3],
  ["Ander","Cheddar, jamón, huevo, lechuga, tomate.",T3],
  ["Beth","Cheddar, lechuga, salsa BigMac.",T3],
  ["Aria","Danbo, jamón, lechuga y tomate.",T3],
  ["Klaus","Cheddar, panceta ahumada, pepinos agridulces, alioli.",T2],
  ["Daphne","Queso azul, cebolla caramelizada, alioli.",T2],
  ["Joe","Cheddar, panceta ahumada, huevo, barbacoa.",T2],
  ["Spicy","Cheddar, guacamole, nachos, barbacoa.",T2],
  ["Provo","Queso provolone, salsa criolla, huevo.",T2],
  ["SNT cheese","Pan con semillas, cheddar, ketchup, mostaza, cebolla, pickles.",T2,true]
];
export const ESPECIALES=[["Calie veggie","Medallón de lenteja, cheddar, lechuga, tomate.",13500],["Alec","Medallón de pollo, cheddar, lechuga, mayonesa.",13500],["Cajita Sunset","Burger con cheddar o 6 nuggets, papas junior y sorpresa.",13000]];
export const SECCIONES={
  sandwiches:{titulo:["Sand","wiches"],color:"var(--rojo)",nota:"Incluyen papas fritas",items:[
    ["Sándwich Zoa","Doble medallón, cheddar en fetas y fundido, cebolla caramelizada.",17500],
    ["Sándwich Turbo","Doble medallón, cheddar, cebolla, bacon ahumado, salsa tasty.",17500],
    ["Sándwich Simon","Doble medallón, cheddar, cebolla, lechuga, salsa BigMac.",17500]]},
  hotdogs:{titulo:["Hot","dogs"],color:"var(--verde)",nota:"Opcional salchicha vegana",items:[
    ["Border","Queso cheddar fundido, takis, doritos.",6500],["Tradicional","Aderezos clásicos y papas pay.",5500],
    ["ARG","Queso parmesano y salsa criolla.",6500],["Mexican","Guacamole, nachos y salsa picante opcional.",6500],
    ["Yankee","Queso cheddar fundido y bacon.",6500],["Italy","Salsa boloñesa y queso parmesano.",6500],["Classic","Jamón y queso.",6500]]},
  entradas:{titulo:["Entra","das"],color:"var(--azul)",nota:"Para compartir",items:[
    ["Sunset box","4 tequeños, bastones de muzza y pollo, aros, 6 nuggets, caritas y 2 dips.",25000],
    ["Picada caliente para 2","Muzza, pollo, nuggets, aros, papas y 2 dips.",28000],
    ["Picada caliente para 4","Muzza, pollo, nuggets, aros, papas y 3 dips.",33000],
    ["Papas Sunset chica","Cheddar, panceta y verdeo.",9500],["Papas Sunset grande","Cheddar, panceta y verdeo.",16000],
    ["Nachos completos","Cheddar, salsa boloñesa, crema ácida.",12000],["Tequeños","x6 con dip de salsa tártara.",9500],
    ["Aros de cebolla","x6 unidades.",6000],["Nuggets de pollo","x10 unidades.",6000]]},
  postres:{titulo:["Pos","tres"],color:"#8E6BE0",nota:"Y para tomar",items:[
    ["Franui","Blanco o con leche.",8500],["Alfajor Rasta","Blanco y negro.",1500],
    ["Cerveza artesanal","Scottish, Golden, Honey, Porter o IPA.",5000],["Gaseosa","Coca, Sprite, Fanta.",3000]]}
};
export const TABS=[["burgers","Burgers","var(--azul)"],["sandwiches","Sándwiches","var(--rojo)"],["hotdogs","Hot dogs","var(--verde)"],["entradas","Entradas","var(--azul)"],["postres","Postres y bebidas","#8E6BE0"]];


// Recetas del ojito: pila = se arma por capas · contenido = piezas en caja/plato
export const RECETA={
  // burgers
  "Shelby":{q:["cheddar"],t:["bacon","sLibra"]},
  "Lexie":{q:["cheddar","danbo"],t:["cebcar"]},
  "Damon":{q:["cheddar"],t:[]},
  "Devi":{q:["cheddar"],t:["sTasty","cebolla","tomate","lechuga"]},
  "Paxton":{q:["cheddar"],t:["bacon","sStacker"]},
  "Serena":{q:["cheddar"],t:["aros","bbq"]},
  "Max":{q:["danbo"],t:["champ","cebcar","mayo"]},
  "Ander":{q:["cheddar"],t:["jamon","huevo","tomate","lechuga"]},
  "Beth":{q:["cheddar"],t:["lechuga","sBigmac"]},
  "Aria":{q:["danbo"],t:["jamon","tomate","lechuga"]},
  "Klaus":{q:["cheddar"],t:["bacon","pepinos","alioli"]},
  "Daphne":{q:["azul"],t:["cebcar","alioli"]},
  "Joe":{q:["cheddar"],t:["bacon","huevo","bbq"]},
  "Spicy":{q:["cheddar"],t:["guac","nachos","bbq"]},
  "Provo":{q:["provo"],t:["huevo","criolla"]},
  "SNT cheese":{q:["cheddar"],t:["cebolla","pepinos","ketchup","mostaza"],semillas:true},
  "Calie veggie":{q:["cheddar"],t:["tomate","lechuga"],medallon:"lenteja"},
  "Alec":{q:["cheddar"],t:["lechuga","mayo"],medallon:"pollo"},
  "Cajita Sunset":{q:["cheddar"],t:[]},
  // sándwiches (doble medallón, pan largo)
  "Sándwich Zoa":{pan:"sub",q:["cheddar"],fundido:true,t:["cebcar"]},
  "Sándwich Turbo":{pan:"sub",q:["cheddar"],t:["cebolla","bacon","sTasty"]},
  "Sándwich Simon":{pan:"sub",q:["cheddar"],t:["cebolla","lechuga","sBigmac"]},
  // hot dogs
  "Border":{pan:"pancho",q:["fundido"],t:["takis","doritos"]},
  "Tradicional":{pan:"pancho",q:[],t:["ketchup","mostaza","mayo","papasPay"]},
  "ARG":{pan:"pancho",q:[],t:["criolla","parmesano"]},
  "Mexican":{pan:"pancho",q:[],t:["guac","nachos","picante"]},
  "Yankee":{pan:"pancho",q:["fundido"],t:["bacon"]},
  "Italy":{pan:"pancho",q:[],t:["bolonesa","parmesano"]},
  "Classic":{pan:"pancho",q:["queso"],t:["jamon"]},
  // postres
  "Alfajor Rasta":{pan:"alfajor",q:[],t:[]},
  // entradas y postres que se sirven por piezas
  "Sunset box":{tipo:"contenido",plato:"caja",p:[["tequeno",4],["muzza",4],["aro",4],["pollo",4],["nugget",6],["carita",4],["dip",2]]},
  "Picada caliente para 2":{tipo:"contenido",plato:"plato",p:[["muzza",5],["pollo",4],["nugget",4],["aro",8],["papas",1],["dip",2]]},
  "Picada caliente para 4":{tipo:"contenido",plato:"plato",p:[["muzza",10],["pollo",6],["nugget",6],["aro",10],["papas",1],["dip",3]]},
  "Papas Sunset chica":{tipo:"contenido",plato:"plato",pila:true,p:[["papas",1],["cheddarTop",1],["panceta",1],["verdeo",1]]},
  "Papas Sunset grande":{tipo:"contenido",plato:"plato",pila:true,p:[["papas",1],["cheddarTop",1],["panceta",1],["verdeo",1]]},
  "Nachos completos":{tipo:"contenido",plato:"plato",pila:true,p:[["nachosP",1],["cheddarTop",1],["bolonesaTop",1],["crema",1]]},
  "Tequeños":{tipo:"contenido",plato:"plato",p:[["tequeno",6],["dipT",1]]},
  "Aros de cebolla":{tipo:"contenido",plato:"plato",p:[["aro",6]]},
  "Nuggets de pollo":{tipo:"contenido",plato:"caja",p:[["nugget",10]]},
  "Franui":{tipo:"contenido",plato:"plato",p:[["frambuesa",9]]}
};
