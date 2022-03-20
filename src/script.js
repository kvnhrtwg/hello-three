import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/Lato_Regular.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'KEVIN HARTWIG',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        textGeometry.computeBoundingBox()
        const material = new THREE.MeshMatcapMaterial()
        material.matcap = matcapTexture
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5,
        // )
        // textMaterial.wireframe = true
        textGeometry.center()
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        const sphereGeometry = new THREE.SphereGeometry( 0.5, 32, 16 );
        const boxGeometry = new THREE.BoxGeometry(0.5,0.5,0.5);
        for(let i = 0; i < 50; i++) {
            const sphere = new THREE.Mesh(sphereGeometry, material)
            sphere.position.x = (Math.random() - 0.5) * 10
            sphere.position.y = (Math.random() - 0.5) * 10
            sphere.position.z = (Math.random() - 0.5) * 10
            sphere.rotation.x = Math.random() * Math.PI
            sphere.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            sphere.scale.set(scale, scale, scale)
            scene.add(sphere)
        }
        for(let i = 0; i < 50; i++) {
            const sphere = new THREE.Mesh(boxGeometry, material)
            sphere.position.x = (Math.random() - 0.5) * 10
            sphere.position.y = (Math.random() - 0.5) * 10
            sphere.position.z = (Math.random() - 0.5) * 10
            sphere.rotation.x = Math.random() * Math.PI
            sphere.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            sphere.scale.set(scale, scale, scale)
            scene.add(sphere)
        }

    }

)

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 8
// gui.add(camera.position, 'x').min(-3).max(3)
// gui.add(camera.position, 'y').min(-3).max(3)
// gui.add(camera.position, 'z').min(-3).max(3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()