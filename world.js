// imports
import * as THREE from 'three'
// import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FBXLoader.js'
export function createWorld(scene) {
    //Luz
        const luz = new THREE.DirectionalLight(0xffffff, 1)
        luz.position.set(5, 10, 5)
        scene.add(luz)
    //Chão
        const chao = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            new THREE.MeshStandardMaterial({ color: 0x4444 }))
        chao.rotation.x = -Math.PI / 2
        scene.add(chao)
}