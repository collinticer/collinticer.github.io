import * as utils from '@dcl/ecs-scene-utils'

const _scene = new Entity('_scene')
const bulletSize = 0.1
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)


const flintlockPistol = new Entity('flintlockPistol')
engine.addEntity(flintlockPistol)

const gltfShape2 = new GLTFShape("b76fc2df-bdbd-4816-a58b-2b9a7bc4d09c/Gun_01/Gun_01.glb")
gltfShape2.withCollisions = false
gltfShape2.isPointerBlocker = false
gltfShape2.visible = true
flintlockPistol.addComponentOrReplace(gltfShape2)

flintlockPistol.addComponent(
  new Transform({
    position: new Vector3( 0, 0.35, 0.6 ),
  })
)

flintlockPistol.setParent(Attachable.AVATAR)

const input = Input.instance

// button down event
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, (e) => {
  log("pointer Down", e)
  spawnBullet()
})

function spawnBullet() {
  // create the entity
  const sphere = new Entity()

  let StartPos = new Vector3( 0, .5, 1.15 )
  let EndPos = new Vector3(0, .5, 35)

  // add a transform to the entity
  sphere.addComponent( new Transform({
    position: StartPos,
    scale: new Vector3( bulletSize, bulletSize, bulletSize )
  }) )

  

  // Move entity
  sphere.addComponent(new utils.MoveTransformComponent(StartPos, EndPos, 2))

  // add a shape to the entity
  sphere.addComponent(new SphereShape())

  // add the entity to the engine
  engine.addEntity( sphere )

  sphere.setParent( Attachable.AVATAR )

  return sphere
}