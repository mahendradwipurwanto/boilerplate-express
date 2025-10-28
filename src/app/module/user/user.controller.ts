import {Router, RequestHandler} from "express";
import {UserService} from "./user.service";
import {UpdateUserRequest} from "./user.dto";
import {CustomHttpExceptionError} from "../../../lib/helper/errorHandler";
import {ResponseSuccessBuilder} from "../../../lib/helper/response";
import logger from "../../../lib/helper/loggerHandler";
import {ensurePayloadNotEmpty, validateId} from "../../../lib/helper/common";
import ValidatorMiddleware from "../../middleware/validator.middleware";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Manage user data including retrieval, updates, and deletion
 */
export class UserController {
    public readonly router: Router = Router();

    constructor(private readonly userService: UserService) {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/:id", this.getDataById);
        this.router.put("/:id", ValidatorMiddleware(UpdateUserRequest), this.updateData);
        this.router.delete("/:id", this.deleteData);
    }

    /**
     * @swagger
     * /user/{id}:
     *   get:
     *     summary: Get user by ID
     *     description: Retrieve detailed information about a specific user by its unique ID.
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID
     *     responses:
     *       200:
     *         description: User fetched successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 responseCode:
     *                   type: integer
     *                   example: 200
     *                 message:
     *                   type: string
     *                   example: User fetched successfully
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                       example: "be46dadf-3336-487a-b638-07f3c01de91"
     *                     name:
     *                       type: string
     *                       example: "Ngodingin HQ"
     *                     email:
     *                       type: string
     *                       example: "contact@ngodingin.org"
     *                     phone:
     *                       type: string
     *                       example: "+62855784252542"
     *                     created_at:
     *                       type: string
     *                       example: "2025-10-25T07:32:00Z"
     *       404:
     *         description: User not found
     */
    private getDataById: RequestHandler = async (req, res, next) => {
        const {id} = req.params;
        try {
            validateId(id);

            const user = await this.userService.GetOrgByParams({id});
            if (!user) {
                throw new CustomHttpExceptionError(`User with ID ${id} not found`, 404);
            }

            ResponseSuccessBuilder(res, 200, "User fetched successfully", user);
        } catch (error: any) {
            logger.error(`[User] ${error.message}`, {
                route: req.originalUrl,
                orgId: id,
            });
            next(error);
        }
    };

    /**
     * @swagger
     * /user/{id}:
     *   put:
     *     summary: Update user data
     *     description: Update an user's details by ID. Request body should include the fields to be updated.
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Updated User"
     *               email:
     *                 type: string
     *                 example: "updated@ngodingin.org"
     *               phone:
     *                 type: string
     *                 example: "+6287778889999"
     *     responses:
     *       200:
     *         description: User updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 responseCode:
     *                   type: integer
     *                   example: 200
     *                 message:
     *                   type: string
     *                   example: User updated successfully
     *       400:
     *         description: Invalid request payload or update failed
     *       404:
     *         description: User not found
     */
    private updateData: RequestHandler = async (req, res, next) => {
        const {id} = req.params;
        const payload: UpdateUserRequest = req.body;

        try {
            validateId(id);
            ensurePayloadNotEmpty(payload);

            const user = await this.userService.GetOrgByParams({id});
            if (!user) {
                throw new CustomHttpExceptionError(`User with ID ${id} not found`, 404);
            }

            const updatedOrg = await this.userService.updateData(id, payload);
            if (!updatedOrg) {
                throw new CustomHttpExceptionError(`Failed to update user with ID ${id}`, 400);
            }

            ResponseSuccessBuilder(res, 200, "User updated successfully", updatedOrg);
        } catch (error: any) {
            logger.error(`[User] ${error.message}`, {
                route: req.originalUrl,
                orgId: id,
            });
            next(error);
        }
    };

    /**
     * @swagger
     * /user/{id}:
     *   delete:
     *     summary: Delete user (soft delete)
     *     description: Soft deletes an user record by ID. Data remains in the database but is marked as deleted.
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: User ID
     *     responses:
     *       200:
     *         description: User deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 responseCode:
     *                   type: integer
     *                   example: 200
     *                 message:
     *                   type: string
     *                   example: User deleted successfully
     *       404:
     *         description: User not found
     */
    private deleteData: RequestHandler = async (req, res, next) => {
        const {id} = req.params;

        try {
            validateId(id);

            const user = await this.userService.GetOrgByParams({id});
            if (!user) {
                throw new CustomHttpExceptionError(`User with ID ${id} not found`, 404);
            }

            await this.userService.deleteData(id);

            ResponseSuccessBuilder(res, 200, "User deleted successfully", null);
        } catch (error: any) {
            logger.error(`[User] ${error.message}`, {
                route: req.originalUrl,
                orgId: id,
            });
            next(error);
        }
    };
}