"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProduceController = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
// ----------------------------------------
//  Produce API: Controller for accessing fresh produce
//
// * GET / Returns all available produce
// * POST / Creates a new produce
// * GET /:produceId/ Returns a single produce, found by id
// ---
//  Monday, December 28 2020
// ----------------------------------------
let ProduceController = class ProduceController {
    constructor() {
        this.router = express_1.Router();
        this.path = '/produce';
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(`${this.path}`, this.findAllProduce.bind(this));
        this.router.get(`${this.path}/:produceId`, this.findProduceById.bind(this));
        this.router.post(`${this.path}`, this.createNewProduce.bind(this));
    }
    findAllProduce(req, res, next) {
        try {
            console.log(req);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    }
    async findProduceById(req, res, next) {
        try {
            res.status(200).send({
                data: 'Hizzah',
            });
        }
        catch (error) {
            next(error);
        }
    }
    async createNewProduce(req, res, next) {
        try {
            res.status(201);
            res.send();
        }
        catch (error) {
            next(error);
        }
    }
};
ProduceController = __decorate([
    tsyringe_1.singleton()
], ProduceController);
exports.ProduceController = ProduceController;
//# sourceMappingURL=produce.controller.js.map