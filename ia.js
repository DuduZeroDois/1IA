const AK = 'COLOQUE SUA CHAVE AQUI'

export async function CALL(mensagem) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${AK}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [
                    { text: mensagem }
                ]
            }]
        })
    })
    if (!response.ok) {
        console.error('Erro na chamada à API:', response.statusText)
        return "Erro na API"
    }
    const data = await response.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Resposta não encontrada error 666"
}

export async function decideAction(distance) {
    const prompt = `
    Você é um NPC, BEM MUITO AGRESSIVO. GUERREIRO FEROZ.s
    O jogador está a ${distance}.
    Escolha UMA palavra: atacar, fugir, esperar.
    `
    const resposta = await CALL(prompt)
    return resposta.toLowerCase().trim()    
}
