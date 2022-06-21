import { testControllers } from "../../controllers";
import { checkForParameters, checkSaveRequestBody, checkUpdateRequestBody } from "../../middlewares/testMessageMiddlewares";
import RouterSingleton from "../RouterSingleton";
const testRouter = RouterSingleton.getRouter();

const { getTestMessageController, saveTestMessageController, updateTestMessageController, deleteTestMessageController } = testControllers;
testRouter.post("/saveTestMessage", checkSaveRequestBody, saveTestMessageController);
testRouter.get("/getTestMessage/:_id", checkForParameters, getTestMessageController);
testRouter.put("/updateTestMessage", checkUpdateRequestBody, updateTestMessageController);
testRouter.delete("/deleteTestMessage/:_id", checkForParameters, deleteTestMessageController);

export { testRouter };
