import { testControllers } from "../../controllers";
import RouterSingleton from "../RouterSingleton";
const testRouter = RouterSingleton.getRouter();

const { getTestMessageController, saveTestMessageController, updateTestMessageController, deleteTestMessageController } = testControllers;
testRouter.post("/saveTestMessage", saveTestMessageController);
testRouter.get("/getTestMessage/:_id", getTestMessageController);
testRouter.put("/updateTestMessage", updateTestMessageController);
testRouter.delete("/deleteTestMessage/:_id", deleteTestMessageController);

export { testRouter };
