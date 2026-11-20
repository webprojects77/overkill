# OVERKILL

**A plataforma matemática que se recusa a ser só uma calculadora.**

> Feito por **777** ("seven sete") · Discord: `777.imt`

[Read in English](README.md)

## O que é o OVERKILL?

O OVERKILL é uma plataforma modular de computação matemática. A calculadora tradicional é apenas a porta de entrada: o objetivo de longo prazo é um único ambiente que reúne cálculo numérico, álgebra simbólica, gráficos, estatística, conversão de unidades, simulações, ferramentas para programadores, notebooks computacionais e extensões de terceiros, todos compartilhando o mesmo motor de expressões, sistema de unidades, variáveis e histórico.

A promessa do produto não é resolver qualquer problema imaginável. É oferecer um conjunto amplo, consistente e extensível de ferramentas, com resultados explicáveis, unidades coerentes, precisão configurável e limites documentados com honestidade.

## Princípios

- **Precisão antes de espetáculo.** Uma animação bonita nunca compensa um resultado errado.
- **Explicabilidade.** Mostrar fórmula, unidade, método, precisão e limitações relevantes.
- **Composição.** Todos os módulos compartilham o mesmo motor, unidades, variáveis e histórico.
- **Privacidade por padrão.** Cálculos e arquivos ficam locais, salvo compartilhamento explícito.
- **Extensibilidade com segurança.** Plugins nunca recebem acesso irrestrito ao sistema.
- **Acessibilidade.** Teclado, leitores de tela, contraste, foco visível e redução de movimento.
- **Entrega progressiva.** Cada versão precisa ser útil sozinha.

## Modelo de segurança do motor

Expressões nunca são executadas como JavaScript. A entrada passa por um tokenizador e um parser descendente recursivo com lista fixa de operações e funções permitidas. Erros de sintaxe e de domínio (divisão por zero, raiz de número negativo, logaritmo fora do domínio, overflow) são reportados com o tipo do erro e a posição na expressão, e o motor nunca devolve silenciosamente um valor com cara de válido quando o cálculo falha.

## Estado atual: Fase 1 (calculadora básica)

Implementado hoje:

- Parser seguro com precedência de operadores e potência associativa à direita
- Operadores `+ - * / ^ ! %`, parênteses, multiplicação implícita (`2pi`, `3(4)`)
- Constantes `pi`, `e`, `phi`, `tau` e `ans` (resultado anterior)
- Funções: `sin cos tan asin acos atan sinh cosh tanh sqrt cbrt ln log log2 exp abs floor ceil round trunc fact mod pow min max`
- Modos DEG / RAD e precisão configurável (8, 12 ou 15 dígitos significativos)
- Teclado físico, teclado na tela, histórico persistente e copiar resultado
- Tema escuro grafite com acentos violeta e ciano, e tema claro seguindo o sistema
- Funciona totalmente offline no navegador, sem conta e sem servidor

Ainda não implementado (veja [docs/ROADMAP.md](docs/ROADMAP.md)): álgebra simbólica, matrizes, Graph Studio, notebook, laboratórios especializados, SDK de plugins, Oracle (assistente de IA), PWA.

## Como rodar

Não precisa de build. Abra o `index.html` no navegador, ou sirva a pasta:

```
python3 -m http.server 8000
```

## Estrutura do projeto

```
index.html        ponto de entrada
src/engine.js     parser, avaliador, formatação e lógica da interface
src/style.css     estilos e tokens de tema
docs/ROADMAP.md   fases, status e decisões
```

## Limitações conhecidas

- Apenas aritmética de ponto flutuante binário; racionais exatos, inteiros de precisão arbitrária e decimais estão planejados
- Ainda sem cálculo simbólico
- A entrada numérica usa `.` como separador decimal e `,` ou `;` como separador de argumentos
- O histórico fica no armazenamento local do navegador

## Sobre a IA ("Oracle")

O assistente planejado é uma camada de interpretação e orquestração, não uma fonte incontestável de números. Ele vai converter enunciados em expressões, perguntar por unidades ou premissas ausentes e chamar o motor determinístico para calcular. Os resultados serão rotulados como verificado, aproximação, hipótese ou gerado por IA. Será opcional, claramente marcado como dependente de conexão, e todos os módulos locais continuarão funcionando com ela desativada.

## Créditos

Idealizado e feito por **777** (lê-se "seven sete"), Discord `777.imt`.

O projeto está privado durante o desenvolvimento e será aberto ao público quando estiver finalizado.
