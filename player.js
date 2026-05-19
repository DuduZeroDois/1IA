// imports
import * as THREE from 'three'
// import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FBXLoader.js'

let key = {}
window.addEventListener('keydown', e => key[e.key] = true )
window.addEventListener('keyup', e => key[e.key] = false )

export function Player (scene) {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    )
    scene.add(mesh)
    return mesh
}

export function updatePlayer(player) {
    const speed = 0.1
    if (key['w']) player.position.z -= speed
    if (key['s']) player.position.z += speed
    if (key['a']) player.position.x -= speed
    if (key['d']) player.position.x += speed
}
