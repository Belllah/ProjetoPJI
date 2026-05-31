/* ===================================================
   SEÇÃO EVOLUÇÃO DOS DRAGÕES
=================================================== */

// Seleciona a seção inteira
const evolutionSection =
document.querySelector(".evolution");

// Linha que atravessa a seção
const line =
document.querySelector(".progress-line");

// Cada estágio da evolução
const egg =
document.querySelector(".egg");

const baby =
document.querySelector(".baby");

const adult =
document.querySelector(".adult");


/*
    Observer monitora quando a seção
    entra na tela.
*/
const evolutionObserver =
new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        /*
            Quando pelo menos 40%
            da seção estiver visível
        */
        if(entry.isIntersecting){

            // Ovo aparece imediatamente
            egg.classList.add("show");

            // Linha começa a crescer
            line.classList.add("animate");

            /*
                Depois de 1.2s
                aparece o filhote
            */
            setTimeout(() => {

                baby.classList.add("show");

            }, 1200);

            /*
                Depois de 2.5s
                aparece o dragão adulto
            */
            setTimeout(() => {

                adult.classList.add("show");

            }, 2500);

            /*
                Para de observar.
                A animação roda apenas uma vez.
            */
            evolutionObserver.unobserve(
                evolutionSection
            );

        }

    });

},{
    threshold: 0.4
});

// Começa a observar a seção
evolutionObserver.observe(
    evolutionSection
);



/* ===================================================
   SEÇÃO DE CONTADORES
=================================================== */

// Seleciona todos os elementos
// com classe counter
const counters =
document.querySelectorAll(".counter");

// Seleciona a seção stats
const statsSection =
document.querySelector(".stats");

// Impede que a animação execute
// mais de uma vez
let countersStarted = false;


/*
    Função responsável por animar
    um contador individual
*/
function animateCounter(counter){

    /*
        Lê o valor do atributo
        data-target
    */

    const target =
    Number(counter.dataset.target);

    /*
        Duração da animação
        em milissegundos
    */

    const duration = 2000;

    /*
        Marca o momento
        em que a animação começou
    */

    const startTime =
    performance.now();


    function update(currentTime){

        /*
            Tempo já passado
        */

        const elapsed =
        currentTime - startTime;

        /*
            Valor entre 0 e 1
            representando o progresso
        */

        const progress =
        Math.min(elapsed / duration, 1);

        /*
            Calcula o número atual
        */

        const currentValue =
        Math.floor(
            progress * target
        );

        /*
            Atualiza o texto
        */

        counter.textContent =
        currentValue + "%";

        /*
            Continua animando
            até chegar em 100%
            do progresso
        */

        if(progress < 1){

            requestAnimationFrame(
                update
            );

        } else {

            /*
                Garante o valor final exato
            */

            counter.textContent =
            target + "%";

        }

    }

    /*
        Inicia a animação
    */

    requestAnimationFrame(
        update
    );

}


/*
    Observer da seção stats
*/
const statsObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        /*
            Quando a seção
            aparecer na tela
        */

        if(
            entry.isIntersecting &&
            !countersStarted
        ){

            countersStarted = true;

            /*
                Executa a animação
                para cada contador
            */

            counters.forEach(counter => {

                animateCounter(counter);

            });

            /*
                Para de observar
            */

            statsObserver.unobserve(
                statsSection
            );

        }

    });

},{
    threshold: 0.4
});

// Observa a seção
statsObserver.observe(
    statsSection
);