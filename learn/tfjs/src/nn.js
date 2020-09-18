import 'babel-polyfill'
import * as tf from '@tensorflow/tfjs'
import {CANVAS_WIDTH} from './game/constants'
import {Runner} from './game'

let runner = null

export function setup() {
  runner = new Runner('.interstitial-wrapper', {
    DINO_COUNT: 1,
    onReset: handleReset,
    onCrash: handleCrash,
    onRunning: handleRunning,
  })

  window.runner = runner
  runner.init()
}

let firstTime = true
function handleReset(dinos) {
  const dino = dinos[0]
  if (firstTime) {
    firstTime = false
    dino.model = tf.sequential()
    dino.model.add(tf.layers.dense({
      inputShape: [3],
      activation: 'sigmoid',
      units: 6,
    }))
    dino.model.add(tf.layers.dense({
      inputShape: [6],
      activation: 'sigmoid',
      units: 2,
    }))
    dino.model.compile({
      loss: 'meanSquaredError',
      optimizer: tf.train.adam(0.1)
    })
    dino.training = {
      inputs: [],
      labels: [],
    }
  } else {
    dino.model.fit(tf.tensor2d(dino.training.inputs), tf.tensor2d(dino.training.labels))
  }
}

function handleRunning(dino, state) {
  return new Promise(resolve => {
    if (!dino.jumping) {
      let action = 0
      const prediction = dino.model.predict(tf.tensor2d([convertStateToVector(state)]))
      const predictionPromise = prediction.data()
      predictionPromise.then(result => {
        if (result[1] > result[0]) {
          action = 1
          dino.lastJumpingState = state
        } else {
          dino.lastRunningState = state
        }
        resolve(action)
      })
    } else {
      resolve(0)
    }
  })
}

function handleCrash(dino) {
  let input = null
  let label = null
  if (dino.jumping) {
    input = convertStateToVector(dino.lastJumpingState)
    label = [1, 0]
  } else {
    input = convertStateToVector(dino.lastRunningState)
    label = [0, 1]
  }
  dino.training.inputs.push(input)
  dino.training.labels.push(label)
}

function convertStateToVector(state) {
  if (state) {
    return [
      state.obstacleX / CANVAS_WIDTH,
      state.obstacleWidth / CANVAS_WIDTH,
      state.speed / 100
    ];
  }
  return [0, 0, 0];
}