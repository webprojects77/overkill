# OVERKILL — Manual

## Getting started

- Open the site or install it as an app: on Android use the Chrome menu and "Install app"; on iPhone use Share and "Add to Home Screen". After the first visit it works without internet.
- The tabs are **Calculator**, **Matrices**, **Graph**, **Tools** and **Notebook**. The `?` button at the top opens this manual.
- At the top of the calculator there are three buttons: **ℝ/ℂ/ℚ** (number set), **DEG/RAD** (degrees or radians) and the **precision** (8, 12 or 15 digits).

## Calculator

- Type in the field or use the on-screen keypad. The result shows up while you type. Enter or the `=` key confirms and saves it in the history.
- Tap the result to copy it. Tap a history line to reuse its expression.
- Starting with `*`, `/` or `^` uses the previous result: `*2` becomes `ans*2`.
- The decimal separator is the dot (`1.5`). In functions with several arguments, separate them with a comma or a semicolon: `max(1,5,3)`.

### Operators

- `+ - * / ^` and parentheses. `^` is right-associative, and `-2^2` gives `-4`.
- Implicit multiplication: `2pi`, `3(4)`, `2sin(30)`.
- `!` is factorial (integers from 0 to 170) and `%` divides by 100: `10%` is `0.1`.

### Constants and functions

- Constants: `pi`, `e`, `phi`, `tau` and `ans` (last result).
- Trigonometry: `sin cos tan asin acos atan`. Hyperbolic: `sinh cosh tanh`.
- Roots and logarithms: `sqrt` (or `√`), `cbrt`, `ln`, `log` (base 10), `log2`, `exp`.
- Rounding and others: `abs floor ceil round trunc fact mod pow min max`.
- In `DEG` angles are in degrees: `sin(30)` gives `0.5`. In `RAD` they are in radians.

### Errors

- When something is wrong you get the kind of error (syntax, domain, numeric) and the position in the expression. OVERKILL never returns a made-up number when a calculation fails: `1/0`, `sqrt(-1)` and `ln(0)` are errors.

## Variables and formulas

- Define variables with `x=5` and use them later: `x*2`.
- Define formulas with parameters: `f(x)=x^2-2` or `h(a,b)=a*b`, and call them with `f(3)`.
- The **Variables and formulas** panel (below the history) lists everything and has an `×` button to remove items. Everything is saved on your device.
- Names start with a letter and are not case-sensitive. You cannot reuse names of functions or constants (`sin`, `pi`, `ans`...). Formulas cannot call themselves.

## Solving equations

- `solve(f, guess)` uses Newton's method from the guess: define `f(x)=x^2-2`, then `solve(f,1)`.
- `solve(f, a, b)` uses bisection on the interval and requires `f(a)` and `f(b)` to have opposite signs.
- The result comes with method, iterations, residual and tolerance on the line below. If it does not converge it says so instead of inventing an answer.
- The formula must have exactly one parameter.

## Complex numbers and fractions (ℝ, ℂ, ℚ)

- Tap the button at the top to switch. **ℝ** is the normal mode.
- **ℂ**: use `i`. Examples: `(1+2i)*(3-i)`, `sqrt(-4)`, `exp(i*pi)`. Functions: `sqrt exp ln abs arg conj re im sin cos tan`. It also shows the modulus and the angle.
- **ℚ**: exact arithmetic with fractions. `0.1+0.2` gives `3/10`. It shows the decimal value and the mixed number. Functions: `gcd lcm floor ceil round num den abs sqrt` (roots only when exact) and factorial. Integer exponents up to 1000.
- In ℂ and ℚ there are no variables or named formulas, and `solve` and the graph use ℝ only.

## Matrices

- Write matrix **A** (and **B** when needed) with rows separated by `;` or a line break, and columns by a space or a comma: `2 1; 1 3`.
- Cells accept expressions without spaces, such as `2pi` or `1+1`.
- Operations: solve `Ax = b` (B is the column vector, for example `3; 5`), determinant, inverse, transpose, rank and `A × B`.
- The inverse shows the condition number and warns when the matrix is ill-conditioned. Systems show the residual. Limit of 12×12, and systems must be square.

## Graph

- Pick the type: `y = f(x)`, polar `r = f(t)` or parametric `x(t); y(t)`.
- Write up to 4 curves, one per line. Cartesian uses `x`. Polar and parametric use `t`, over the range in the fields below (they accept expressions like `4pi`). In parametric mode separate the two parts with a semicolon: `cos(t);sin(t)`.
- You can use formulas you already defined, such as `f(x)`. Angles in the graph are always in radians.
- Drag to move, use scroll or the `+` and `−` buttons to zoom. Tap or slide to see the coordinates of a point.
- **Roots** lists the roots of the first curve inside the visible window. **PNG** saves the image.

## Tools

### Unit converter

- Pick the category, type the value and the source and target units. It also lists every unit of the category. Temperature below absolute zero is an error.

### Bases and bits

- Type A (and B) in the chosen base, from 2 to 36. It shows A in bases 2, 8, 10, 16, 32 and 36.
- Pick AND, OR, XOR, NOT, `<<` or `>>` and the width (8, 16, 32 or 64 bits). The result is shown in unsigned and signed decimal, hexadecimal and binary.

### IEEE 754 floating point

- Type a number or expression: it shows sign, exponent and mantissa for double and float, the value actually stored and the rounding error. Useful to understand why `0.1` is not exact.

### Colors

- Accepts `#rrggbb`, `#rgb`, `rgb(r, g, b)` and `hsl(h, s%, l%)` and converts between HEX, RGB and HSL.

### Statistics

- **Descriptive**: type numbers separated by spaces, commas or lines. It shows mean, median, mode, quartiles, variance and standard deviation (population and sample), standard error and outliers.
- **Linear regression**: one line per point, as `x y`. It shows the line, r, R² and, if you give an x, the prediction (it warns when it is an extrapolation).

### Derivatives (symbolic)

- Type the expression, the variable and the order (1st to 3rd). Example: `x^2*sin(x)`.
- The result is simplified. If you give a point, it computes the value and checks it against a numeric derivative.
- Supports `sin cos tan asin acos atan sinh cosh tanh exp ln log log2 sqrt cbrt abs` and powers. Angles are in radians. Other letters are treated as constants.

## Notebook

- Each notebook is a sheet of **cells**: **calculation** cells (one or more lines, as in the calculator) and **note** cells (free text). Use `+ Cálculo` and `+ Nota`, and the `↑ ↓ ×` buttons on each cell.
- Cells run from top to bottom and recalculate by themselves as you type. A variable or formula defined in one cell is available to the cells below: `taxa=0.05` and then `1000*(1+taxa)^10`.
- Each notebook has its own variables, separate from the calculator, and keeps its own number set (ℝ, ℂ or ℚ) and angle mode (DEG or RAD), so reopening it always gives the same results. Lines starting with `#` are comments.
- If a line fails, it shows the reason and the position, and the other lines keep running.
- You can have several notebooks (**Novo**, **Renomear**, **Excluir**), saved in the browser. **Exportar .json** creates a file for backup or to send to someone, **Importar** opens such a file, and **Exportar .md** creates a report with the calculations and results.

## Tips and limits

- Calculations run on your device and nothing you type is sent to a server. History and variables are saved in the browser. Only the title font comes from Google Fonts.
- Numbers in ℝ are floating point (about 15 digits of precision). For calculations without rounding error use ℚ.
- If a new version of the app does not show up, close it and open it again with internet.

# OVERKILL — Manual (Português)

## Primeiros passos

- Abra o site ou instale como app: no Android use o menu do Chrome e "Instalar app"; no iPhone use Compartilhar e "Adicionar à Tela de Início". Depois da primeira visita ele funciona sem internet.
- As abas são **Calculadora**, **Matrizes**, **Gráfico**, **Ferramentas** e **Notebook**. O botão `?` no topo abre este manual.
- No topo da calculadora ficam três botões: **ℝ/ℂ/ℚ** (conjunto numérico), **DEG/RAD** (graus ou radianos) e a **precisão** (8, 12 ou 15 dígitos).

## Calculadora

- Digite no campo ou use o teclado da tela. O resultado aparece enquanto você digita. Enter ou a tecla `=` confirma e guarda no histórico.
- Toque no resultado para copiar. Toque numa linha do histórico para reutilizar a expressão.
- Começar com `*`, `/` ou `^` usa o resultado anterior: `*2` vira `ans*2`.
- O separador decimal é o ponto (`1.5`). Em funções com mais de um argumento, separe com vírgula ou ponto e vírgula: `max(1,5,3)`.

### Operadores

- `+ - * / ^` e parênteses. `^` associa da direita para a esquerda, e `-2^2` dá `-4`.
- Multiplicação implícita: `2pi`, `3(4)`, `2sin(30)`.
- `!` é fatorial (inteiros de 0 a 170) e `%` divide por 100: `10%` vale `0.1`.

### Constantes e funções

- Constantes: `pi`, `e`, `phi`, `tau` e `ans` (último resultado).
- Trigonometria: `sin cos tan asin acos atan`. Hiperbólicas: `sinh cosh tanh`.
- Raízes e logaritmos: `sqrt` (ou `√`), `cbrt`, `ln`, `log` (base 10), `log2`, `exp`.
- Arredondamento e outras: `abs floor ceil round trunc fact mod pow min max`.
- Em `DEG` os ângulos são em graus: `sin(30)` dá `0.5`. Em `RAD`, em radianos.

### Erros

- Quando algo está errado aparece o tipo do erro (sintaxe, domínio, numérico) e a posição na expressão. O OVERKILL nunca devolve um número inventado quando a conta falha: `1/0`, `sqrt(-1)` e `ln(0)` dão erro.

## Variáveis e fórmulas

- Defina variáveis com `x=5` e use depois: `x*2`.
- Defina fórmulas com parâmetros: `f(x)=x^2-2` ou `h(a,b)=a*b`, e chame com `f(3)`.
- O painel **Variáveis e fórmulas** (abaixo do histórico) lista tudo e tem o botão `×` para remover. Tudo fica salvo no aparelho.
- Nomes começam com letra e não diferenciam maiúsculas. Não dá para reusar nomes de funções ou constantes (`sin`, `pi`, `ans`...). Fórmulas não podem chamar a si mesmas.

## Resolver equações

- `solve(f, chute)` usa o método de Newton a partir do chute: defina `f(x)=x^2-2` e depois `solve(f,1)`.
- `solve(f, a, b)` usa bisseção no intervalo e exige que `f(a)` e `f(b)` tenham sinais opostos.
- O resultado vem com método, iterações, resíduo e tolerância na linha de baixo. Se não convergir, ele avisa em vez de inventar uma resposta.
- A fórmula precisa ter um único parâmetro.

## Números complexos e frações (ℝ, ℂ, ℚ)

- Toque no botão do topo para alternar. **ℝ** é o modo normal.
- **ℂ**: use `i`. Exemplos: `(1+2i)*(3-i)`, `sqrt(-4)`, `exp(i*pi)`. Funções: `sqrt exp ln abs arg conj re im sin cos tan`. Mostra também o módulo e o ângulo.
- **ℚ**: contas exatas com frações. `0.1+0.2` dá `3/10`. Mostra o valor decimal e a forma mista. Funções: `gcd lcm floor ceil round num den abs sqrt` (raiz só quando exata) e fatorial. Expoentes inteiros até 1000.
- Nos modos ℂ e ℚ não há variáveis nem fórmulas nomeadas, e `solve` e o gráfico usam apenas ℝ.

## Matrizes

- Escreva a matriz **A** (e **B**, quando precisar) separando as linhas por `;` ou quebra de linha, e as colunas por espaço ou vírgula: `2 1; 1 3`.
- As células aceitam expressões sem espaços, como `2pi` ou `1+1`.
- Operações: resolver `Ax = b` (B é o vetor coluna, por exemplo `3; 5`), determinante, inversa, transposta, posto e `A × B`.
- A inversa mostra o número de condicionamento e avisa quando a matriz é mal condicionada. Sistemas mostram o resíduo. Limite de 12×12, e sistemas precisam ser quadrados.

## Gráfico

- Escolha o tipo: `y = f(x)`, polar `r = f(t)` ou paramétrico `x(t); y(t)`.
- Escreva até 4 curvas, uma por linha. Cartesiano usa `x`. Polar e paramétrico usam `t`, no intervalo dos campos abaixo (aceitam expressões como `4pi`). No paramétrico separe as duas partes com ponto e vírgula: `cos(t);sin(t)`.
- Você pode usar fórmulas já definidas, como `f(x)`. Os ângulos no gráfico são sempre em radianos.
- Arraste para mover, use scroll ou os botões `+` e `−` para o zoom. Toque ou passe o dedo para ver as coordenadas de um ponto.
- **Raízes** lista as raízes da primeira curva dentro da janela visível. **PNG** salva a imagem.

## Ferramentas

### Conversor de unidades

- Escolha a categoria, digite o valor e as unidades de origem e destino. Também mostra todas as unidades da categoria. Temperatura abaixo do zero absoluto dá erro.

### Bases e bits

- Digite A (e B) na base escolhida, de 2 a 36. Mostra A nas bases 2, 8, 10, 16, 32 e 36.
- Escolha AND, OR, XOR, NOT, `<<` ou `>>` e a largura (8, 16, 32 ou 64 bits). O resultado aparece em decimal sem e com sinal, hexadecimal e binário.

### Ponto flutuante IEEE 754

- Digite um número ou expressão: mostra sinal, expoente e mantissa em double e float, o valor realmente armazenado e o erro de arredondamento. Bom para entender por que `0.1` não é exato.

### Cores

- Aceita `#rrggbb`, `#rgb`, `rgb(r, g, b)` e `hsl(h, s%, l%)` e converte entre HEX, RGB e HSL.

### Estatística

- **Descritiva**: digite os números separados por espaço, vírgula ou linha. Mostra média, mediana, moda, quartis, variância e desvio padrão (populacional e amostral), erro padrão e outliers.
- **Regressão linear**: uma linha por ponto, no formato `x y`. Mostra a reta, r, R² e, se você informar um x, a previsão (avisa quando é extrapolação).

### Derivadas (simbólico)

- Digite a expressão, a variável e a ordem (1ª a 3ª). Exemplo: `x^2*sin(x)`.
- O resultado vem simplificado. Se você informar um ponto, ele calcula o valor e confere com uma derivada numérica.
- Suporta `sin cos tan asin acos atan sinh cosh tanh exp ln log log2 sqrt cbrt abs` e potências. Os ângulos são em radianos. Outras letras são tratadas como constantes.

## Notebook

- Cada notebook é uma folha de **células**: de **cálculo** (uma ou mais linhas, como na calculadora) e de **nota** (texto livre). Use `+ Cálculo` e `+ Nota`, e os botões `↑ ↓ ×` de cada célula.
- As células rodam de cima para baixo e recalculam sozinhas enquanto você digita. Uma variável ou fórmula definida numa célula vale para as de baixo: `taxa=0.05` e depois `1000*(1+taxa)^10`.
- Cada notebook tem as próprias variáveis, separadas da calculadora, e guarda o seu conjunto numérico (ℝ, ℂ ou ℚ) e o modo de ângulos (DEG ou RAD), então ao reabrir o resultado é sempre o mesmo. Linhas que começam com `#` são comentários.
- Se uma linha der erro, ela mostra o motivo e a posição, e as outras continuam rodando.
- Você pode ter vários notebooks (**Novo**, **Renomear**, **Excluir**), salvos no navegador. **Exportar .json** gera um arquivo para backup ou para enviar a alguém, **Importar** abre esse arquivo, e **Exportar .md** gera um relatório com as contas e os resultados.

## Dicas e limites

- Os cálculos rodam no seu aparelho e nada do que você digita é enviado a servidor. Histórico e variáveis ficam salvos no navegador. Só a fonte do título vem do Google Fonts.
- Os números em ℝ são de ponto flutuante (cerca de 15 dígitos de precisão). Para contas sem erro de arredondamento use ℚ.
- Se uma versão nova do app não aparecer, feche e abra de novo com internet.
