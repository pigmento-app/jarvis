import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import * as service from "../services/users.service";

const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
  try {
    const users = await service.getUsers();
    res.status(200).send(users);
  } catch (error: any) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    await service.createUser(userData);

    res.status(201).send({ success: "Your account successfully created" });
  } catch (error: any) {
    console.error(error);
    switch (error.message) {
      case "ER_DUP_ENTRY":
        error.message = "This email is already linked to an account";
        break;
      default:
        error.message = "An error occurred";
        break;
    }
    res.status(400).send({ error: error.message });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await service.getUserByEmail(userData.email);

    if (user === null) {
      throw new Error("Bad credentials");
    }

    const verifyPassword = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!verifyPassword) {
      throw new Error("Bad credentials");
    }

    const payload = { userId: user.id, email: user.email };
    const JWT_SECRET = process.env.JWT_SECRET || "THIS_IS_A_JWT_SECRET_KEY";
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 846000 });

    res.status(200).send({
      success: "User loggin",
      token,
    });
  } catch (error: any) {
    console.error(error);
    res.status(404).send({ error: error.message });
  }
});

export default router;
