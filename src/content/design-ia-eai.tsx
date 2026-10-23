
import React from 'react';

const ImagePlaceholder = ({ label = 'Espaço para Imagem' }: { label?: string }) => (

  <div className="w-full aspect-[16/9] bg-[#E2DCD4] rounded-[2rem] flex items-center justify-center my-12 border border-[#E2DCD4]">
    <span className="text-[#6F625B] font-medium tracking-widest uppercase text-sm">{label}</span>
  </div>
);













export const DesignIaEaiContent = () => (
    (
      <>
        <h2 className="text-2xl font-bold mb-4">Uma Nova Era de Relevância</h2>
        <p className="mb-6 leading-relaxed">
          Quando a inteligência artificial generativa decolou no mundo criativo, o primeiro sentimento de muitos profissionais foi de hesitação ou medo. Surgiram questionamentos: "A IA vai criar interfaces em segundos? Qual será o papel dos designers?"
        </p>
        <p className="mb-8 leading-relaxed">
          Minha experiência me mostrou exatamente o oposto. A inteligência artificial não veio para nos apagar, mas para remover o peso da execução puramente mecânica e liberar espaço mental para o que realmente importa: entender as pessoas, investigar dores profundas e desenhar estratégias robustas de produto.
        </p>

        <ImagePlaceholder label="Ilustração: Co-criação Homem-Máquina" />

        <h2 className="text-2xl font-bold mb-4">O Designer como Orquestrador de Contexto</h2>
        <p className="mb-6 leading-relaxed">
          O trabalho de design de produto sempre envolveu uma enorme quantidade de tarefas operacionais: alinhar pixels manuais, documentar meticulosamente as mesmas regras de interação repetidas vezes, e reescrever variações de textos de placeholder.
        </p>
        <p className="mb-8 leading-relaxed">
          Com a IA assumindo essa camada de suporte bruto, nosso papel sobe de patamar. Passamos a atuar como diretores criativos e estrategistas de negócio. Ao invés de passarmos dias desenhando caminhos alternativos no Figma, usamos plataformas como o Google AI Studio para materializar variações de fluxo lógico em minutos, discutindo essas hipóteses instantaneamente com stakeholders.
        </p>

        <h2 className="text-2xl font-bold mb-4">Prototipagem de Alta Resolução</h2>
        <p className="mb-6 leading-relaxed">
          Outra mudança monumental está na nossa capacidade de entrega física. Historicamente, os designers entregavam arquivos estáticos do Figma que precisavam ser interpretados por desenvolvedores, gerando fricção e perda de qualidade de interação.
        </p>
        <p className="mb-8 leading-relaxed">
          Ferramentas de código impulsionadas por IA, como o Cursor, capacitam designers a criar e testar protótipos em código real de forma incrivelmente ágil. Ao entregar o handoff não apenas em imagens, mas em códigos limpos e funcionais, encurtamos drasticamente a distância entre a ideia projetada e o software real em produção.
        </p>

        <h2 className="text-2xl font-bold mb-4">O Toque Humano é Insubstituível</h2>
        <p className="mb-6 leading-relaxed">
          Modelos de linguagem são excepcionais para cruzar referências e sintetizar padrões existentes na internet. Mas eles não possuem empatia humana real, não conseguem escutar de forma sensível as nuances não-verbais de uma entrevista qualitativa, e não conhecem as especificidades de cultura interna e governança estratégica que influenciam as decisões em grandes corporações.
        </p>
        <p className="mb-8 leading-relaxed">
          A IA oferece infinitos pontos de partida e acelera nossa velocidade de voo a níveis inimagináveis. No entanto, o direcionamento, a sensibilidade artística, o julgamento de negócios e a sensibilidade ética continuam sendo — e sempre serão — papéis puramente humanos.
        </p>
      </>
    )
);
