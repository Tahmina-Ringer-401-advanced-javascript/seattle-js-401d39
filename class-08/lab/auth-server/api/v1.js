'use strict';

/**
 * API Router Module (V1)
 * Integrates with various models through a common Interface (.get(), .post(), .put(), .delete())
 * @module src/api/v1
 */

const express = require('express');

const modelFinder = require(`../middleware/model-finder.js`);

const router = express.Router();

// Evaluate the model, dynamically
router.param('model', modelFinder.load);

// Models List
router.get('/models', async (request, response) => {
  const models = await modelFinder.list()
  response.status(200).json(models);
});

// JSON Schema for a model
router.get('/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});


// CRUD Routes
router.get('/:model', handleGetAll);
router.post('/:model', handlePost);
router.get('/:model/:id', handleGetOne);
router.put('/:model/:id', handlePut);
router.delete('/:model/:id', handleDelete);

// Route Handlers
function handleGetAll(request, response, next) {
  request.model.get(request.query)
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch(next);
}

function handleGetOne(request, response, next) {
  request.model.get({ _id: request.params.id })
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

function handlePost(request, response, next) {
  request.model.create(request.body)
    .then(result => {
      console.log('result', result);
      response.status(200).json(result)
    })
    .catch(error => {
      console.log('error was', error);
      next('Error')
    });
}

function handlePut(request, response, next) {
  request.model.update(request.params.id, request.body)
    .then(result => response.status(200).json(result))
    .catch(next);
}

async function handleDelete(request, response, next) {
  try {
    const result = await request.model.destroy(request.params.id);
    response.status(200).json(result);
  } catch (error) {
    console.error('__SERVER_ERROR__', error)
    next(error.message);
  }
}

module.exports = router;
