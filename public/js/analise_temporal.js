// Caminho do CSV
const csvUrlTemporal = "data/db_final.csv";

// Variáveis globais para armazenar os dados
let allDataTemporal = [];
let municipiosPorUF = {}; // Agora usaremos um Map para cada UF

// Seletores HTML
const selectUFTemporal = document.getElementById("selectUFTemporal");
const selectMunicipioTemporal = document.getElementById("selectMunicipioTemporal");
const containerDivisaoTemporal = document.getElementById("container-divisao-Temporal");
const selectSexoTemporal = document.getElementById("selectSexoTemporal");
const selectFaseTemporal = document.getElementById("selectFaseTemporal");
const selectIndicadorTemporal = document.getElementById("selectIndicador");
const selectDivisaoTemporal   = document.getElementById("filtro-divisao-Temporal");
const labelMunicipioTemporal  = document.querySelector('label[for="selectMunicipioTemporal"]');
let regionDataTemporal = [];

// carregue DB_REGION em paralelo
d3.csv("data/db_region.csv").then(raw => {
  // mapear as colunas do CSV para chaves que nosso código usa
  regionDataTemporal = raw.map(d => ({
    municipio_id_sdv: d.municipio_id_sdv,
    regional_id:       d.regional_id,
    uf:                d.estado_abrev,           // garante minúscula
    nome_regiao:       d.regional_nome || d.nome // confere ambos
  }));

  // Monta lookup: regional_id → [municipio_id_sdv]
  regionMunicipiosMap = {};
  regionDataTemporal.forEach(r => {
    if (!regionMunicipiosMap[r.regional_id]) {
      regionMunicipiosMap[r.regional_id] = [];
    }
    regionMunicipiosMap[r.regional_id].push(r.municipio_id_sdv);
  });

  updateDivisaoTemporal();
});

// função para atualizar os filtros a partir do filtro divisão
function updateDivisaoTemporal() {
  const uf   = selectUFTemporal.value;
  const modo = selectDivisaoTemporal.value;

  // zera sempre
  selectMunicipioTemporal.innerHTML = "<option value=''>Todos</option>";

  if (modo === "federativa") {
    // 1) título
    labelMunicipioTemporal.textContent = "Município";
    // 2) popula municípios existentes (usa sua função)
    atualizarMunicipiosTemporais(uf);

  } else {
    // 1) título
    labelMunicipioTemporal.textContent = "Região de Saúde";
    // 2) filtra regionDataTemporal por UF e elimina duplicados
    if (uf) {
      const regs = regionDataTemporal
        .filter(r => r.uf === uf)
        .reduce((acc, cur) => {
          if (!acc.some(x => x.regional_id === cur.regional_id)) acc.push(cur);
          return acc;
        }, [])
        .sort((a,b) => a.nome_regiao.localeCompare(b.nome_regiao));

      regs.forEach(r => {
        const opt = document.createElement("option");
        opt.value = r.regional_id;
        opt.text  = r.nome_regiao;
        selectMunicipioTemporal.appendChild(opt);
      });
    }
  }
}

// função para ocultar/mostrar filtros
function toggleContainerDivisaoTemporal() {
  // se houver UF selecionada (valor não vazio), mostramos o container
  if (selectUFTemporal.value) {
    containerDivisaoTemporal.style.display = "block";
  } else {
    containerDivisaoTemporal.style.display = "none";
  }
}

// Transcrição para os filtros
const nomesIndicadoresAdulto = {
    baixo_peso: "Baixo Peso",
    eutrofico: "Eutrófico",
    sobrepeso: "Sobrepeso",
    obesidade_G_1: "Obesidade Grau I",
    obesidade_G_2: "Obesidade Grau II",
    obesidade_G_3: "Obesidade Grau III"
};

const nomesIndicadoresAdolescente = {
    magreza_acentuada: "Magreza Acentuada",
    magreza: "Magreza",
    obesidade: "Obesidade",
    obesidade_grave: "Obesidade Grave"
};

const estadoLabel ={
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
}

// Carregar os dados e inicializar o gráfico
d3.csv(csvUrlTemporal).then(data => {
    allDataTemporal = data;

    // Criar um objeto global para mapear UF -> Municípios usando Map
    data.forEach(d => {
        if (!municipiosPorUF[d.UF]) {
            municipiosPorUF[d.UF] = new Map();
        }
        municipiosPorUF[d.UF].set(String(d.codigo_municipio), d.municipio);
    });

    // Preencher os selects
    popularSelectsTemporais(data);

    toggleContainerDivisaoTemporal();
    updateDivisaoTemporal();

    atualizarTituloTemporal();

    // Gerar gráfico inicial com valores padrão
    atualizarGraficoTemporal();
});

// 🔹 Função para popular os selects
function popularSelectsTemporais(data) {
    // Listas únicas de UF
    const ufs = [...new Set(data.map(d => d.UF))].sort();

    // Preencher UF
    selectUFTemporal.innerHTML = "<option value=''>Brasil</option>";
    ufs.forEach(uf => {
        const option = document.createElement("option");
        option.value = uf;
        option.text = ufLabel[uf] ? `${ufLabel[uf]} (${uf})` : uf;
        selectUFTemporal.appendChild(option);
    });

    // Atualizar municípios corretamente
    atualizarMunicipiosTemporais(selectUFTemporal.value);

    atualizarIndicadoresTemporais();
}

// Função para recuperar o nome amigável do município selecionado no temporal
function recuperarNomeMunicipioTemporal() {
  const municipioSelected = selectMunicipioTemporal.value;
  
  // se estivermos no modo “saude”, devolve o nome da região:
  if (selectDivisaoTemporal.value === "saude") {
    const reg = regionDataTemporal.find(r => r.regional_id === sel);
    return Promise.resolve(reg ? reg.nome_regiao : null);
    }
  
  // Procura na base temporal a linha com o código do município
    const registro = allDataTemporal.find(d => String(d.codigo_municipio) === municipioSelected);
  if (!registro || !registro.codigo_municipio) {
    return Promise.resolve(null);
  }
  const idMunicipio = String(registro.codigo_municipio);
  const ufMunicipio = registro.UF;
  const friendlyName = cidadesFriendly[ufMunicipio] ? cidadesFriendly[ufMunicipio][idMunicipio] : null;
  return Promise.resolve(friendlyName ? `${friendlyName}-${ufMunicipio}` : null);
}

// Função para atualizar o título dinâmico do gráfico temporal
function atualizarTituloTemporal() {
  const fase = selectFaseTemporal.value;
  const sexo = selectSexoTemporal.value;
  const estado = selectIndicadorTemporal.value;
  // Se nenhuma UF for selecionada, utiliza "Brasil"
  const uf = selectUFTemporal.value || "Brasil";
  // Se houver um select de ano, você pode adicioná-lo aqui; caso contrário, deixe em branco ou remova
  const ano = ""; // Altere se houver um filtro de ano

  recuperarNomeMunicipioTemporal().then(municipioAmigavel => {
    const novoTitulo = !municipioAmigavel || municipioAmigavel === " "
      ? `Análises Temporais de ${estadoLabel[estado]} em ${faseLabel[fase]} ${sexoLabel[sexo]} - ${ufLabel[uf]} ${ano}`.trim()
      : `Análises Temporais de ${estadoLabel[estado]} em ${faseLabel[fase]} ${sexoLabel[sexo]} - ${municipioAmigavel} ${ano}`.trim();
    document.getElementById("tituloTemporal").textContent = novoTitulo;
  });
}


// 🔹 Função para atualizar municípios
function atualizarMunicipiosTemporais(ufSelecionada) {  
  if (!ufSelecionada) {
    selectMunicipioTemporal.innerHTML = "<option value=''>Todos</option>";
    return;
  }

  const municipioSelecionado = selectMunicipioTemporal.value;
  selectMunicipioTemporal.innerHTML = "<option value=''>Todos</option>";

  if (ufSelecionada && municipiosPorUF[ufSelecionada]) {
      // Itera sobre o Map (chave = código, valor = nome original) e usa o nome amigável se disponível
      Array.from(municipiosPorUF[ufSelecionada].entries())
          .sort((a, b) => a[1].localeCompare(b[1]))
          .forEach(([codigo, nomeOriginal]) => {
              const option = document.createElement("option");
              option.value = codigo;
              option.text = (cidadesFriendly[ufSelecionada] && cidadesFriendly[ufSelecionada][codigo])
                            ? cidadesFriendly[ufSelecionada][codigo]
                            : nomeOriginal;
              selectMunicipioTemporal.appendChild(option);
          });
  } else {
      // Quando nenhuma UF é selecionada, agrupar todos os municípios (evitando duplicatas) com seus respectivos código e UF
      const municipiosMap = new Map();
      allDataTemporal.forEach(d => {
          municipiosMap.set(String(d.codigo_municipio), { nome: d.municipio, uf: d.UF });
      });
      Array.from(municipiosMap.entries())
          .sort((a, b) => {
              const [codigoA, { nome: nomeA, uf: ufA }] = a;
              const [codigoB, { nome: nomeB, uf: ufB }] = b;
              const friendlyA = (cidadesFriendly[ufA] && cidadesFriendly[ufA][codigoA]) ? cidadesFriendly[ufA][codigoA] : nomeA;
              const friendlyB = (cidadesFriendly[ufB] && cidadesFriendly[ufB][codigoB]) ? cidadesFriendly[ufB][codigoB] : nomeB;
              return friendlyA.localeCompare(friendlyB);
          })
          .forEach(([codigo, { nome, uf }]) => {
              const option = document.createElement("option");
              option.value = codigo;
              option.text = (cidadesFriendly[uf] && cidadesFriendly[uf][codigo]) ? cidadesFriendly[uf][codigo] : nome;
              selectMunicipioTemporal.appendChild(option);
          });
  }

  if ([...selectMunicipioTemporal.options].some(opt => opt.value === municipioSelecionado)) {
      selectMunicipioTemporal.value = municipioSelecionado;
  }
}

// 🔹 Atualizar municípios ao trocar UF
selectUFTemporal.addEventListener("change", () => {
    toggleContainerDivisaoTemporal();
    updateDivisaoTemporal();
    selectMunicipioTemporal.value = "";
    atualizarGraficoTemporal();
    atualizarTituloTemporal();
});

// quando o usuário troca Divisão:
selectDivisaoTemporal.addEventListener("change", () => {
  updateDivisaoTemporal();       // mesmo ajuste
  selectMunicipioTemporal.value = "";
  atualizarGraficoTemporal();
  atualizarTituloTemporal();
});

// 🔹 Atualizar gráfico ao mudar o MUNICÍPIO
selectMunicipioTemporal.addEventListener("change", () => {
    atualizarGraficoTemporal(); // 🔥 Agora o gráfico atualiza ao mudar município
    atualizarTituloTemporal();
});

// 🔹 Atualizar gráfico ao mudar o INDICADOR
selectIndicadorTemporal.addEventListener("change", () => {
    atualizarGraficoTemporal(); // 🔥 Agora o gráfico atualiza ao mudar indicador
    atualizarTituloTemporal();
});

// 🔹 Função para atualizar Indicadores
function atualizarIndicadoresTemporais() {
    const faseVidaSelecionada = selectFaseTemporal.value;
    if (!faseVidaSelecionada) return;

    const indicadores = faseVidaSelecionada === "adulto" 
        ? nomesIndicadoresAdulto 
        : nomesIndicadoresAdolescente;

    selectIndicadorTemporal.innerHTML = Object.entries(indicadores)
        .map(([valor, nomeExibicao]) => `<option value="${valor}">${nomeExibicao}</option>`)
        .join("");
}

// 🔹 Atualizar gráfico quando a fase de vida for alterada
selectFaseTemporal.addEventListener("change", () => {
    atualizarIndicadoresTemporais();
    atualizarGraficoTemporal();
    atualizarTituloTemporal();
});

// 🔹 Atualizar gráfico quando o gênero for alterado
selectSexoTemporal.addEventListener("change", () => {
  atualizarGraficoTemporal();
  atualizarTituloTemporal();
});

// 🔹 Função para atualizar o gráfico (agora com valores normalizados)
function atualizarGraficoTemporal() {
    const ufSelecionado = selectUFTemporal.value;
    const municipioSelecionado = selectMunicipioTemporal.value;
    const faseVidaSelecionada = selectFaseTemporal.value;
    const indicadorSelecionado = selectIndicadorTemporal.value;
    const sexoSelecionado = selectSexoTemporal.value;

    // Importante: ao filtrar, se um município foi selecionado, comparar usando o código (d.codigo_municipio)
    let modo = selectDivisaoTemporal.value;

    let dadosFiltrados = allDataTemporal.filter(d => {
      // 1) UF e demais filtros originais
      if (ufSelecionado && d.UF !== ufSelecionado) return false;
      if (d.fase_vida !== faseVidaSelecionada)       return false;
      if (sexoSelecionado !== "Todos" && d.SEXO !== sexoSelecionado) return false;

      // 2) Filtragem por município OU por região
      if (municipioSelecionado) {
        if (modo === "federativa") {
          if (String(d.codigo_municipio) !== municipioSelecionado) return false;
        } else {
          const membros = regionMunicipiosMap[municipioSelecionado] || [];
          if (!membros.includes(String(d.codigo_municipio)))     return false;
        }
      }

      return true;
    });

    // 🔹 Agrupar os entrevistados por ano e calcular o total de entrevistados por ano
    const totalEntrevistadosPorAno = d3.rollup(
        dadosFiltrados,
        v => d3.sum(v, d => +d.total),
        d => d.ANO
    );

    // Se não houver entrevistados, evita divisão por zero
    if (totalEntrevistadosPorAno.size === 0) {
        desenharGraficoTemporal({ Masc: [], Fem: [], Todos: [] }, [], 100);
        return;
    }

    // Agrupar dados por ano e sexo
    let anos = [...new Set(dadosFiltrados.map(d => d.ANO))].sort();
    let dadosGrafico = {};
    let maxPorcentagem = 0;

    if (sexoSelecionado === "Todos"){
      dadosGrafico = {Masc: [], Fem: [], Todos: [] };

      anos.forEach(ano => {
        let masc = dadosFiltrados.filter(d => d.ANO === ano && d.SEXO === "Masc");
        let fem = dadosFiltrados.filter(d => d.ANO === ano && d.SEXO === "Fem");

        let totalEntrevistadosAno = totalEntrevistadosPorAno.get(ano) || 0;

        if (totalEntrevistadosAno > 0) {
            let valorMasc = masc.reduce((sum, d) => sum + Number(d[indicadorSelecionado] || 0), 0);
            let valorFem = fem.reduce((sum, d) => sum + Number(d[indicadorSelecionado] || 0), 0);

            // 🔹 Normalizar os valores como porcentagem do total de entrevistados NO ANO
            let percMasc = (valorMasc / totalEntrevistadosAno) * 100;
            let percFem = (valorFem / totalEntrevistadosAno) * 100;
            let percTodos = ((valorMasc + valorFem) / totalEntrevistadosAno) * 100;

            maxPorcentagem = Math.max(maxPorcentagem, percMasc, percFem, percTodos);

            dadosGrafico.Masc.push({ ano, valor: percMasc });
            dadosGrafico.Fem.push({ ano, valor: percFem });
            dadosGrafico.Todos.push({ ano, valor: percTodos });
        }
      });

    } else {
      // Se for "Masc" ou "Fem", gerar apenas a série selecionada
      dadosGrafico[sexoSelecionado] = [];

      anos.forEach(ano => {
          let dadosPorSexo = dadosFiltrados.filter(d => d.ANO === ano && d.SEXO === sexoSelecionado);
          let totalEntrevistadosAno = totalEntrevistadosPorAno.get(ano) || 0;
          if (totalEntrevistadosAno > 0) {
              let valor = dadosPorSexo.reduce((sum, d) => sum + Number(d[indicadorSelecionado] || 0), 0);
              let perc = (valor / totalEntrevistadosAno) * 100;
              maxPorcentagem = Math.max(maxPorcentagem, perc);
              dadosGrafico[sexoSelecionado].push({ ano, valor: perc });
          }
      });

    }
    // 🔹 Adicionar 10% de margem ao topo do gráfico
    maxPorcentagem = Math.ceil(maxPorcentagem * 1.1);

    desenharGraficoTemporal(dadosGrafico, anos, maxPorcentagem);
    atualizarQuadroEntrevistados(dadosFiltrados);
}

// 🔹 Função para atualizar os dados do Quadro de Entrevistados
function atualizarQuadroEntrevistados(dadosFiltrados) {
    // Agrupar por sexo
    const dadosPorSexo = d3.group(dadosFiltrados, d => d.SEXO);

    let totalFemEntrevistados = 0;
    let totalMascEntrevistados = 0;

    if (dadosPorSexo.has("Fem")) {
        const arrFem = dadosPorSexo.get("Fem");
        totalFemEntrevistados = d3.sum(arrFem, d => +d.total);
    }
    if (dadosPorSexo.has("Masc")) {
        const arrMasc = dadosPorSexo.get("Masc");
        totalMascEntrevistados = d3.sum(arrMasc, d => +d.total);
    }

    const totalTodos = totalFemEntrevistados + totalMascEntrevistados;

    // Atualizar HTML
    document.getElementById("valorHomensTemporal").textContent   = totalMascEntrevistados.toLocaleString("pt-BR");
    document.getElementById("valorMulheresTemporal").textContent = totalFemEntrevistados.toLocaleString("pt-BR");
    document.getElementById("valorTodosTemporal").textContent    = totalTodos.toLocaleString("pt-BR");

    return totalTodos; // Retorna o total para ser usado na normalização do gráfico
}

// 🔹 Função para desenhar o gráfico com eixo Y dinâmico
function desenharGraficoTemporal(dados, anos, maxY) {
    // Limpa o contêiner
    d3.select("#graficoAnaliseTemporal").selectAll("*").remove();
  
    const margin = { top: 30, right: 30, bottom: 50, left: 50 },
          internalWidth  = 700,
          internalHeight = 355;
  
    // Cria o SVG responsivo via viewBox
    const svg = d3.select("#graficoAnaliseTemporal")
      .append("svg")
      .attr("viewBox", `0 0 ${internalWidth + margin.left + margin.right} ${internalHeight + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("w-full", true)
      .classed("h-auto", true);
       
    // Grupo principal para aplicar as margens
    const chartArea = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Escalas
    const x = d3.scalePoint()
      .domain(anos)
      .range([0, internalWidth])
      .padding(0.2);
  
    const y = d3.scaleLinear()
      .domain([0, maxY])
      .range([internalHeight, 0]);
  
    // Cria três grupos na ordem desejada (primeiro ficam por trás)
    const linesGroup   = chartArea.append("g").attr("class", "lines-group");
    const circlesGroup = chartArea.append("g").attr("class", "circles-group");
    const labelsGroup  = chartArea.append("g").attr("class", "labels-group");
  
    // Eixos (os adicionamos diretamente no chartArea)
    chartArea.append("g")
      .attr("transform", `translate(0, ${internalHeight})`)
      .call(d3.axisBottom(x));
    chartArea.append("g")
      .call(d3.axisLeft(y).ticks(6).tickFormat(d => `${d}%`));
    // Após desenhar o eixo y, adicione o label:
    chartArea.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -internalHeight / 2)
      .attr("y", -margin.left)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "17px")
      .text("Prevalência");
  
    // Linhas de referência para cada tick, exceto o último, no linesGroup
    const ticks = y.ticks(6);
    ticks.slice(0, ticks.length - 1).forEach(tickValue => {
      linesGroup.append("line")
        .attr("x1", 0)
        .attr("y1", y(tickValue))
        .attr("x2", internalWidth)
        .attr("y2", y(tickValue))
        .attr("stroke", "lightgray")
        .attr("stroke-width", 1);
    });
  
    // Gerador de linha para as séries
    const line = d3.line()
      .x(d => x(d.ano))
      .y(d => y(d.valor));
  
    // Cores para cada série
    const cores = { Masc: "#597eec", Fem: "#f76482", Todos: "#57bb7f" };
  
    // Para cada série, desenha linha, círculos e labels
    Object.keys(dados).forEach(sexo => {
      // Linha do gráfico (no linesGroup)
      linesGroup.append("path")
        .datum(dados[sexo])
        .attr("fill", "none")
        .attr("stroke", cores[sexo])
        .attr("stroke-width", 2)
        .attr("d", line);
  
      // Círculos (no circlesGroup, sempre visíveis)
      circlesGroup.selectAll(`circle.${sexo}`)
        .data(dados[sexo])
        .enter()
        .append("circle")
        .attr("class", sexo)
        .attr("cx", d => x(d.ano))
        .attr("cy", d => y(d.valor))
        .attr("r", 4)
        .attr("fill", cores[sexo])
        .on("mouseover", function(event, d) {
          // Aumenta o círculo
          d3.select(this)
            .transition()
            .duration(100)
            .attr("r", 6);
          // Mostra o label correspondente
          labelsGroup.selectAll(`g.label-group-${sexo}`)
            .filter(td => td.ano === d.ano)
            .style("visibility", "visible");
        })
        .on("mouseout", function(event, d) {
          // Restaura o tamanho do círculo
          d3.select(this)
            .transition()
            .duration(100)
            .attr("r", 4);
          // Oculta o label correspondente
          labelsGroup.selectAll(`g.label-group-${sexo}`)
            .filter(td => td.ano === d.ano)
            .style("visibility", "hidden");
        });
  
      // Rótulos (grupo com retângulo + texto) no labelsGroup, inicialmente ocultos
      const labelGroups = labelsGroup.selectAll(`g.label-group-${sexo}`)
        .data(dados[sexo])
        .enter()
        .append("g")
        .attr("class", `label-group-${sexo}`)
        .style("visibility", "hidden");
  
      labelGroups.append("rect")
        .attr("x", d => x(d.ano) - 20)
        .attr("y", d => y(d.valor) - 30)
        .attr("width", 40)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("stroke", "gray");
  
      labelGroups.append("text")
        .attr("x", d => x(d.ano))
        .attr("y", d => y(d.valor) - 15)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text(d => d.valor.toFixed(1) + "%");
    });
}
