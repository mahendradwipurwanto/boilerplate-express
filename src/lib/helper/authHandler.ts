import {TokenData} from "../types/data/auth";
import {TransformPermissionsAsync} from "./permissionHandler";
import {TokenJwtGenerator} from "../auth/token";
import {ConvertDateTime} from "./dateTime";
import {User} from "../types/data/user";
import {UserService} from "../../app/module/user/user.service";
import loggerHandler from "./loggerHandler";

/**
 * ✅ Generate Access & Refresh JWT tokens for an user.
 *
 * @param user - The user entity with role and user data
 * @param userService - The user service instance
 * @returns Object containing access_token, refresh_token, and metadata
 */
export const generateTokenJWT = async (
    user: User,
    userService: UserService
) => {
    try {
        if (!user || !user.role || !user.user_data) {
            throw new Error("Invalid user data: role or user_data missing");
        }

        // --- Load token expiration config safely
        const accessExp = parseInt(process.env.JWT_ACCESS_TOKEN_EXP || "3600", 10);
        const refreshExp = parseInt(process.env.JWT_REFRESH_TOKEN_EXP || "86400", 10);

        // --- Prepare token metadata
        const metadata: TokenData = {
            id: user.id,
            authentik_userId: user.authentik_userId,
            authentik_access_token: user.authentik_access_token || user.authentik_userId,
            email: user.user_data.email,
            name: user.user_data.name,
            role: user.role.name,
            type: user.role.access,
            permissions: (await TransformPermissionsAsync(user.role.permissions)) || null,
            date: await ConvertDateTime(new Date()),
            expired: await ConvertDateTime(new Date(Date.now() + accessExp * 1000)),
        };

        // --- Generate JWTs
        const [accessToken, refreshToken] = await Promise.all([
            TokenJwtGenerator(metadata, String(accessExp), false),
            TokenJwtGenerator(metadata, String(refreshExp), true),
        ]);

        // --- Store refresh token securely in DB
        await userService.UpdateDataPatch(metadata.id, {access_token: refreshToken});
        loggerHandler.debug(`[JWT] ✅ Tokens generated and stored for user: ${user.id}`);

        // --- Return token response
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            data: {
                id: user.id,
                ...metadata,
            },
            expired_in: accessExp,
        };
    } catch (error: any) {
        loggerHandler.error(`[JWT] ❌ Failed to generate token for user: ${error.message}`);
        throw new Error(`Failed to generate JWT tokens: ${error.message}`);
    }
};