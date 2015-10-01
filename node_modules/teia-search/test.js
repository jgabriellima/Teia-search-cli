var teia = require("./teia-search.js");
teia.init({
    base: "C:\\workspace_sefa_interno",
    regex: "java,properties,xml",
    // restriction: "branch",
    // exclude: "target",
    filefilter: "filters/novo_filtro.txt",
    fileResult: "results/resultados.txt",
    indexpath: 2
});
teia.debug(true);
teia.run();
