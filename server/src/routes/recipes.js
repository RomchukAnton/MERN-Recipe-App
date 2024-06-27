import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "../../middlewares/VerifyTokenMiddleware.js";


const router = express.Router();


router.get("/", async (rec, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", verifyToken, async (rec, res) => {
    const recipe = new RecipeModel(rec.body);
    try {
        const response = await recipe.save();
        res.json({message: "posted"});
    } catch (err) {
        res.json(err);
    }
});

router.put("/", verifyToken, async (rec, res) => {
    try {
        const recipe = await RecipeModel.findById(rec.body.recipeID);
        const user = await UserModel.findById(rec.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedRecipes/ids/:userID", async (rec, res) => {
    try {
        const user = await UserModel.findById(rec.params.userID);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedRecipes/:userID", async (rec, res) => {
    try {
        const user = await UserModel.findById(rec.params.userID);
        const savedRecipes = await RecipeModel.find({ _id: { $in: user.savedRecipes } });
        res.json({ savedRecipes });
    } catch (err) {
        res.json(err);
    }
});







export { router as recipesRouter };