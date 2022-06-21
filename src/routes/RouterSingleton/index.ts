import { Router } from "express";
class RouterSingleton {
    private static routerInstance: Router;
    static getRouter(): Router {
        if (!RouterSingleton.routerInstance) {
            RouterSingleton.routerInstance = Router();
            return RouterSingleton.routerInstance;
        }
        return RouterSingleton.routerInstance;
    }
}
export default RouterSingleton;
