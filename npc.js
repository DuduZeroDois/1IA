// imports
import * as THREE from 'three'
// import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FBXLoader.js'
import { decideAction } from './ia.js'
import { CALL } from './ia.js'

let Atos = 0
let CurrentAtos = "To esperando, vai logo"
let Pensando = false

export function NPC (scene) {
    const mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 1),
        new THREE.MeshStandardMaterial({ color: 0xff0000 })
    )
    mesh2.position.set(3, 1, 0)
    scene.add(mesh2)
    return mesh2
}

export async function updateNPC(npc, player) {
    const distance = npc.position.distanceTo(player.position)
    if (!Pensando && Date.now() - Atos > 10000) {
        Pensando = true
        try {
            const resposta = await decideAction(distance)
            CurrentAtos = resposta.toLowerCase().trim()
            if (CurrentAtos === "error") throw new Error("Erro na decisão do NPC")
        } catch (error) {
            console.error("Erro ao decidir ação do NPC:", error)
            CurrentAtos = FKAI(distance)
        }
        Atos = Date.now()
        console.log(CurrentAtos)
        Pensando = false
    }
    if (CurrentAtos.includes("atacar")) {
        npc.position.lerp(player.position, 0.03)
    }
    if (CurrentAtos.includes("fugir")) {
        const direction = new THREE.Vector3().subVectors(npc.position, player.position).normalize()
        npc.position.addScaledVector(direction, 0.2)
    }
}