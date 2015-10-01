var teia = require("teia-search");
var program = require('commander');
var fs = require('fs');
module.exports = function() {
    program
        .version('1.0.4')
        .option('-b, --base <n> ', 'Pasta principal com os arquivos que serão filtrados')
        .option('-q, --regex <n> ', 'Extensões que serão filtradas (separadas por virgulas) ex.: java,xml,properties ')
        .option('-r, --restriction <n>', 'Restrições. Ex.: -r branch (apenas filtrará os caminhos que tiverem branch no nome)')
        .option('-e, --exclude <n>', 'Exclusões. Ex.: -ex target (irá ignorar os caminhos que tiverem target no nome)')
        .option('-f, --filter <n>', 'Arquivo com os dados que serão filtrados')
        .option('-o, --result <n>', 'Arquivo com os resultados da filtragem')
        .option('-i, --index <i>', 'Indice split do caminho que contem o nome do projeto')
        .option('-d, --debug', 'Modo debug')
        .option('--show', 'Abre o Arquivo ao final do processamento')
        .parse(process.argv);
    /**/
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
    /**/
    var options = {};
    var errs = "";
    /**/
    if (program.base !== undefined) {
        options.base = program.base;
    }
    if (program.restriction !== undefined) {
        options.restriction = program.restriction;
    }
    if (program.exclude !== undefined) {
        options.exclude = program.exclude;
    }
    if (program.filter !== undefined) {
        if (!fs.existsSync(program.filter)) {
            addErro("Insira um caminho valido para o filtro!");
        } else {
            options.filefilter = program.filter;
        }
    }

    if(program.regex!==undefined){
      options.regex = program.regex;
    }else{
       addErro("Você precisa inserir alguma extensão de arquivo para que o Teia possa filtrar. Ex: -q java,properties,xml");
    }
    /**/
    function addErro(erro) {
        if (errs.length === 0) {
            errs += "\n =========================================\n";
            errs += "\n \tOcorreram os seguintes erros\n\n";
        }
        errs += "\t * " + erro + "\n";
    }
    if (errs.length > 0) {
        errs += "\n\n =========================================\n\n";
        console.log(errs);
    }
    if (program.result !== undefined) {
        options.fileResult = program.result;
    }
    if (program.index !== undefined) {
        options.indexpath = program.index;
    }
    if (options.base !== undefined && options.filefilter !== undefined && options.fileResult !== undefined) {
        teia.init(options);
        teia.debug(program.debug);
        teia.run();
        if (program.show) {
            require('child_process').exec(options.fileResult);
        }
    } else {
        program.outputHelp();
    }
}
