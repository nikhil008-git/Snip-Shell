import { Router } from "express";
import  { userMiddleware }from "../middlewares/userMiddleware.js";
import { 
    userSignup, 
    userSignin, 
    addContent,
    findContent,
    deleteContent,
    shareBrain,
    getsharelink,
    updateContent
} from "../controllers/logic.js";

const serverRouter = Router();

serverRouter.post("/signup", userSignup);
serverRouter.post("/signin", userSignin);
serverRouter.put("/content", userMiddleware, updateContent);
    
serverRouter.post("/content", userMiddleware, addContent);
serverRouter.get("/content", userMiddleware, findContent);
serverRouter.delete("/content", userMiddleware, deleteContent);

serverRouter.post("/brain/share", userMiddleware, shareBrain);
serverRouter.get("/brain/share/:shareLink", getsharelink);
// serverRouter.post('/api/query', googleapi)
export default serverRouter;
