import express from "express";

import type { Model } from "../models";

/**
 * @swagger
 * tags:
 *  name: Persons
 *  description: The person managing API
 */
export default function create(db: Model) {
  const router = express.Router();

  /**
   * @swagger
   * /person/all:
   *  get:
   *    summary: Return the list of all the person
   *    tags: [Persons]
   *    responses:
   *      200:
   *        description: The list of the persons
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Person'
   */
  router.get("/all", (req, res, next) => {
    db.person
      .findAll()
      .then((persons) => {
        res.json(persons);
      })
      .catch(next);
  });

  /**
   * @swagger
   * /person/{id}:
   *  get:
   *    summary: Get person by id
   *    tags: [Persons]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: The person id
   *    responses:
   *      200:
   *        description: The person
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Person'
   *      404:
   *        description: Person not found
   *
   */
  router.get("/:id", (req, res, next) => {
    const { params }: any = req;

    db.person
      .findOne({
        where: {
          id: parseInt(params.id),
        },
      })
      .then((person) => {
        if (!person) return res.status(404).json({ message: "not found" });

        res.json(person);
      })
      .catch(next);
  });

  /**
   * @swagger
   * /person/:
   *  post:
   *    summary: create new person
   *    tags: [Persons]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Person'
   *    responses:
   *      201:
   *        description: The person was successfully created
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Person'
   *      500:
   *        description: Internal Server Error
   */
  router.post("/", (req, res, next) => {
    db.person
      .create(req.body)
      .then((person) => {
        res.status(201).json(person);
      })
      .catch(next);
  });

  /**
   * @swagger
   * /person/{id}:
   *  put:
   *    summary: Update person by id
   *    tags: [Persons]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: number
   *        required: true
   *        description: The person id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Person'
   *    responses:
   *      200:
   *        description: The person was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Person'
   */
  router.put("/:id", (req, res, next) => {
    const { params }: any = req;

    db.person
      .findOne({
        where: {
          id: parseInt(params.id),
        },
      })
      .then((person) => {
        if (!person) {
          res.status(404).json({ message: "not found" });
          return;
        }

        return person.update(req.body);
      })
      .then((person) => {
        res.status(201).json(person);
      })
      .catch(next);
  });


  /**
   * @swagger
   * /person/{id}:
   *  delete:
   *    summary: Delete person by id
   *    tags: [Persons]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: number
   *        required: true
   *        description: Remove a person by id
   *    responses:
   *      202:
   *        description: The person was deleted
   */
  router.delete("/:id", (req, res, next) => {
    const { params }: any = req;

    db.person
      .destroy({
        where: {
          id: parseInt(params.id),
        },
      })
      .then((person) => {
        res.status(202).json(person);
      })
      .catch(next);
  });

  return router;
}
