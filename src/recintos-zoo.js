class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }] },
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'] },
            LEOPARDO: { tamanho: 2, biomas: ['savana'] },
            CROCODILO: { tamanho: 3, biomas: ['rio'] },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, biomas: ['savana'] },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'] },
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) return { erro: "Animal inválido", recintosViaveis: false };

        if (quantidade <= 0) return { erro: "Quantidade inválida", recintosViaveis: false };


        const { tamanho, biomas } = this.animais[animal];
        const espacoNecessario = tamanho * quantidade;
        let recintosViaveis = [];

        for (let recinto of this.recintos) {
            const animaisExistentes = recinto.animais || [];
            const espacoOcupado = animaisExistentes.reduce((total, a) => total + a.tamanho * a.quantidade, 0);
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

            // Verifica se o bioma é compatível com o animal, considerando biomas compostos.
            const biomaCompativel = biomas.includes(recinto.bioma) || recinto.bioma.split(' e ').every(bioma => biomas.includes(bioma));
            if (!biomaCompativel) continue;

            // Restrições específicas para algumas espécies.
            if ((animal === 'LEAO' || animal === 'LEOPARDO') && animaisExistentes.some(a => a.especie !== animal))
                continue; // carnivoros só habitam com a propria espécie

            if (animal === 'HIPOPOTAMO' && !recinto.bioma.includes('savana') && !recinto.bioma.includes('rio')) continue;

            // Adiciona o recinto se o espaço for suficiente.
            if (espacoLivre >= espacoNecessario) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: espacoLivre - espacoNecessario,
                    tamanhoTotal: recinto.tamanhoTotal,
                });
            }
        }

        // Ordena os recintos viáveis pelo número
        recintosViaveis.sort((a, b) => a.numero - b.numero);

        // Formata a saida
        const recintosFormatados = recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.tamanhoTotal})`);

        return recintosViaveis.length > 0 ? { recintosViaveis: recintosFormatados } : { erro: "Não há recinto viável", recintosViaveis: false };
    }
}

new RecintosZoo().analisaRecintos('LEAO', 2)

export { RecintosZoo as RecintosZoo };
