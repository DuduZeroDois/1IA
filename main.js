// imports
import * as THREE from 'three'
//import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FBXLoader.js'
import { createWorld } from './world.js'
import { Player, updatePlayer } from './player.js'
import { NPC, updateNPC } from './npc.js'
import { CALL } from './ia.js'

// Configurações iniciais
const canvas = document.getElementById('game')
const scene = new THREE.Scene()
const player = Player(scene)
const npc = NPC(scene)

//configuração da scena
scene.background = new THREE.Color(0x87ceeb) // Cor de fundo (céu azul)

// Configurações da câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let MRB = false
let Y = 0
let Pitch = 0
let LPX = 0
let LPY = 0
window.addEventListener('mousedown', e => {
    if (e.button === 2){
        MRB = true
        LPX = e.clientX
        LPY = e.clientY
    }
})
window.addEventListener('mouseup', e => {
    if (e.button === 2) MRB = false
})
window.addEventListener('contextmenu', e => {
    e.preventDefault()
})
window.addEventListener('mousemove', e => {
    if (!MRB) return
    if (MRB) {
        const deltaX = e.clientX - LPX
        const deltaY = e.clientY - LPY
        Y -= deltaX * 0.002
        Pitch -= deltaY * 0.002
        LPX = e.clientX
        LPY = e.clientY
    }
})
camera.position.set(0, 5, 8)
// camera.lookAt(player.position)
scene.add(camera)

//Configurações de Chat
const Chat = document.getElementById('chat')
const Input = document.getElementById('chatInput')
const send = document.getElementById('EnviarB')

send.onclick = EnviarMsg
async function EnviarMsg() {
    const msg = Input.value.trim().toLowerCase()
    if (!msg) return
    addMsg(`Você: `, msg)
    const resposta = await CALL(msg)
    addMsg(`Vermelinho: `, resposta)
    Input.value = ''
}
function addMsg(sender, text) {
    Chat.innerHTML += `<p><strong>${sender}</strong> ${text}</p>`
    Chat.scrollTop = Chat.scrollHeight
}

// Configurações do render
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// Criar o mundo
createWorld(scene)

// Loop de animação
function animate() {
    requestAnimationFrame(animate)
    updatePlayer(player)
    updateNPC(npc, player)
    // Atualizar a posição da câmera para seguir o jogador
    const radius = 8
    const OffsetY = Math.sin(Pitch) * radius + 5
    const OffsetX = Math.sin(Y) * Math.cos(Pitch) * radius
    const OffsetZ = Math.cos(Y) * Math.cos(Pitch) * radius
    camera.position.copy(player.position).add(new THREE.Vector3(OffsetX, OffsetY, OffsetZ))
    camera.lookAt(player.position)
    renderer.render(scene, camera)
}
animate()
