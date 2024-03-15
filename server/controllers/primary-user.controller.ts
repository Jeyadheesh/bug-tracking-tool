import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";

export const getAllTester = async (req: Request, res: Response) => {
    try {
      const testers = await UserModel.find({});
      res.status(200).json(testers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};


export const getTester = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const tester = await UserModel.findOne({ email: email });
      if (!tester) {
        return res.status(404).json({ message: "Tester not found" });
      }
      res.status(200).json(tester);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};



  export const getTesterById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const testerId = await UserModel.findById(id);
      console.log(testerId);
      res.status(200).json(testerId);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getAllProductManager = async (req: Request, res: Response) => {
    try {
      const ProductManager = await UserModel.find({});
      res.status(200).json(ProductManager);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};


export const getProductManager = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const ProductManager = await UserModel.findOne({ email: email });
      if (!ProductManager) {
        return res.status(404).json({ message: "ProductManager not found" });
      }
      res.status(200).json(ProductManager);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};



  export const getProductManagerById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ProductManagerId = await UserModel.findById(id);
      console.log(ProductManagerId);
      res.status(200).json(ProductManagerId);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

