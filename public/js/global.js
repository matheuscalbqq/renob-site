// Tamanhos de SVG
export const width  = 700;
export const height = 500;

// Fonte dos dados
export const csvDataUrl = "data/db_final.csv";
export const csvRegionUrl = "data/db_region.csv";

// Mapas de gradientes e labels
export const gradientes = {
   "Fem": ["#FFF0F5", "#DC143C"],
   "Masc": ["#E0FFFF", "#4169E1"],
   "Todos": ["#e6fae6", "#33a460"]
 };

// Mapas de nomes de estados nutricionais
export const estadoLabel ={
  baixo_peso: "Baixo Peso",
  eutrofico: "Eutrófico",
  sobrepeso: "Sobrepeso",
  obesidade_G_1: "Obesidade Grau I",
  obesidade_G_2: "Obesidade Grau II",
  obesidade_G_3: "Obesidade Grau III",
  magreza_acentuada: "Magreza Acentuada",
  magreza: "Magreza",
  obesidade: "Obesidade",
  obesidade_grave: "Obesidade Grave"
};

// Objetos de configuração / lookup
export const conflicts = {
  "excesso_peso": ["sobrepeso","obesidade_G_1","obesidade_G_2","obesidade_G_3","obesidade_calc"],
  "obesidade_calc": ["obesidade_G_1","obesidade_G_2","obesidade_G_3","excesso_peso"]
};

export const nomeAmigavel = {
  "altura_muito_baixa_para_a_idade": "Altura muito baixa para idade",
  "altura_baixa_para_a_idade": "Altura baixa para idade",
  "altura_adequada_para_a_idade": "Altura adequada para idade",
  "magreza_acentuada": "Magreza Acentuada",
  "magreza": "Magreza",
  "obesidade": "Obesidade",
  "obesidade_grave": "Obesidade Grave",
  "baixo_peso": "Baixo Peso",
  "eutrofico": "Eutrófico",
  "sobrepeso": "Sobrepeso",
  "obesidade_G_1": "Obesidade I",
  "obesidade_G_2": "Obesidade II",
  "obesidade_G_3": "Obesidade III",
  "obesidade_calc": "Obesidade",
  "excesso_peso": "Excesso de Peso"
};

export const ufLabel = {
  "AC": "Acre", "AL": "Alagoas", "AM": "Amazonas", "AP": "Amapá", "BA": "Bahia",
  "CE": "Ceará", "DF": "Distrito Federal", "ES": "Espírito Santo", "GO": "Goiás",
  "MA": "Maranhão", "MT": "Mato Grosso", "MS": "Mato Grosso do Sul", "MG": "Minas Gerais",
  "PA": "Pará", "PB": "Paraíba", "PR": "Paraná", "PE": "Pernambuco", "PI": "Piauí",
  "RJ": "Rio de Janeiro", "RN": "Rio de Janeiro", "RS": "Rio Grande do Sul",
  "RO": "Rondônia", "RR": "Roraima", "SC": "Santa Catarina", "SP": "São Paulo",
  "SE": "Sergipe", "TO": "Tocantins", "Brasil": "Brasil"
};

export const sexoLabel = {
  "Fem": "Femininos",
  "Masc": "Masculinos",
  "Todos": " "
};

export const faseLabel = {
  "adulto": "Adultos",
  "adolescente": "Adolescentes"
};

// Arquivos GeoJSON para municípios
export const stateGeojsonFiles = {
  "AC": "data/geojson/br_cities/geojs-12-mun.json",
  "AM": "data/geojson/br_cities/geojs-13-mun.json",
  "AP": "data/geojson/br_cities/geojs-16-mun.json",
  "PA": "data/geojson/br_cities/geojs-15-mun.json",
  "RO": "data/geojson/br_cities/geojs-11-mun.json",
  "RR": "data/geojson/br_cities/geojs-14-mun.json",
  "TO": "data/geojson/br_cities/geojs-17-mun.json",
  "AL": "data/geojson/br_cities/geojs-27-mun.json",
  "BA": "data/geojson/br_cities/geojs-29-mun.json",
  "CE": "data/geojson/br_cities/geojs-23-mun.json",
  "MA": "data/geojson/br_cities/geojs-21-mun.json",
  "PB": "data/geojson/br_cities/geojs-25-mun.json",
  "PE": "data/geojson/br_cities/geojs-26-mun.json",
  "PI": "data/geojson/br_cities/geojs-22-mun.json",
  "RN": "data/geojson/br_cities/geojs-24-mun.json",
  "SE": "data/geojson/br_cities/geojs-28-mun.json",
  "ES": "data/geojson/br_cities/geojs-32-mun.json",
  "MG": "data/geojson/br_cities/geojs-31-mun.json",
  "RJ": "data/geojson/br_cities/geojs-33-mun.json",
  "SP": "data/geojson/br_cities/geojs-35-mun.json",
  "PR": "data/geojson/br_cities/geojs-41-mun.json",
  "RS": "data/geojson/br_cities/geojs-43-mun.json",
  "SC": "data/geojson/br_cities/geojs-42-mun.json",
  "DF": "data/geojson/br_cities/geojs-53-mun.json",
  "GO": "data/geojson/br_cities/geojs-52-mun.json",
  "MT": "data/geojson/br_cities/geojs-51-mun.json",
  "MS": "data/geojson/br_cities/geojs-50-mun.json"
};

// Arquivos GeoJSON para municípios
export const stateRGeojsonFiles = {
  "AC": "data/geojson/by_state/health_regions_12.geojson",
  "AM": "data/geojson/by_state/health_regions_13.geojson",
  "AP": "data/geojson/by_state/health_regions_16.geojson",
  "PA": "data/geojson/by_state/health_regions_15.geojson",
  "RO": "data/geojson/by_state/health_regions_11.geojson",
  "RR": "data/geojson/by_state/health_regions_14.geojson",
  "TO": "data/geojson/by_state/health_regions_17.geojson",
  "AL": "data/geojson/by_state/health_regions_27.geojson",
  "BA": "data/geojson/by_state/health_regions_29.geojson",
  "CE": "data/geojson/by_state/health_regions_23.geojson",
  "MA": "data/geojson/by_state/health_regions_21.geojson",
  "PB": "data/geojson/by_state/health_regions_25.geojson",
  "PE": "data/geojson/by_state/health_regions_26.geojson",
  "PI": "data/geojson/by_state/health_regions_22.geojson",
  "RN": "data/geojson/by_state/health_regions_24.geojson",
  "SE": "data/geojson/by_state/health_regions_28.geojson",
  "ES": "data/geojson/by_state/health_regions_32.geojson",
  "MG": "data/geojson/by_state/health_regions_31.geojson",
  "RJ": "data/geojson/by_state/health_regions_33.geojson",
  "SP": "data/geojson/by_state/health_regions_35.geojson",
  "PR": "data/geojson/by_state/health_regions_41.geojson",
  "RS": "data/geojson/by_state/health_regions_43.geojson",
  "SC": "data/geojson/by_state/health_regions_42.geojson",
  "DF": "data/geojson/by_state/health_regions_53.geojson",
  "GO": "data/geojson/by_state/health_regions_52.geojson",
  "MT": "data/geojson/by_state/health_regions_51.geojson",
  "MS": "data/geojson/by_state/health_regions_50.geojson"
};

// Transcrição para os filtros
export const nomesIndicadoresAdulto = {
    baixo_peso: "Baixo Peso",
    eutrofico: "Eutrófico",
    sobrepeso: "Sobrepeso",
    obesidade_G_1: "Obesidade Grau I",
    obesidade_G_2: "Obesidade Grau II",
    obesidade_G_3: "Obesidade Grau III"
};

export const nomesIndicadoresAdolescente = {
    magreza_acentuada: "Magreza Acentuada",
    magreza: "Magreza",
    obesidade: "Obesidade",
    obesidade_grave: "Obesidade Grave"
};