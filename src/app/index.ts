import express, {Application} from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import {AppDataSource} from "../config/database/datasource";
import {ErrorHandler} from "../lib/helper/errorHandler";
import loggerHandler from "../lib/helper/loggerHandler";

import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "../config/swagger";

import {VerifyJwtToken} from "./middleware/auth.middleware";
import {VerifyRequestSignature} from "./middleware/signature.middleware";

import {FilesController} from "./module/files/files.controller";
import {PropertyController} from "./module/property/property.controller";
import {PropertyService} from "./module/property/property.service";
import {EntityProperty} from "./module/property/property.model";
import {CountriesController} from "./module/countries/countries.controller";
import {CountriesService} from "./module/countries/countries.service";
import {EntityCountries} from "./module/countries/countries.model";

const prefix = process.env.API_PREFIX || "/api/v1";
const env = process.env.NODE_ENV || "development";

loggerHandler.info(`🚀 Running in ${env} mode`);

export class App {
    /**
     * ✅ Setup global middlewares
     */
    public SetupMiddleware(app: Application): void {
        // --- Security headers (Helmet)
        app.use(helmet({
            crossOriginResourcePolicy: {policy: "cross-origin"},
        }));

        // --- CORS
        const corsOrigins = process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"];
        app.use(
            cors({
                origin: corsOrigins,
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
                credentials: true,
                optionsSuccessStatus: 200,
            })
        );

        // --- Body parsers
        app.use(express.json({limit: "10mb"}));
        app.use(express.urlencoded({extended: true, limit: "10mb"}));

        // --- Request compression for performance
        app.use(compression());

        // --- HTTP request logging (Morgan + Winston)
        if (env !== "production") {
            app.use(morgan("dev"));
        } else {
            app.use(
                morgan("combined", {
                    stream: {
                        write: (message) => loggerHandler.http(message.trim()),
                    },
                })
            );
        }

        // --- Auth and Signature verification
        app.use(VerifyJwtToken(prefix));
        app.use(VerifyRequestSignature(prefix));
    }

    /**
     * ✅ Setup application routes
     */
    public SetupRoutes(app: Application): void {
        const propertyService = new PropertyService(
            AppDataSource.getRepository(EntityProperty)
        );
        const countriesService = new CountriesService(
            AppDataSource.getRepository(EntityCountries)
        );

        // --- Controllers
        const propertyController = new PropertyController(propertyService);
        const countriesController = new CountriesController(countriesService);

        // --- File Controller
        const fileController = new FilesController();

        // Swagger UI endpoint
        app.use(`${prefix}/docs/`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        // --- Route registration
        app.use(`${prefix}/property`, propertyController.router);
        app.use(`${prefix}/countries`, countriesController.router);

        // --- File management routes
        app.use(`/files`, fileController.router);

        // --- Health check route
        app.get(`${prefix}/health`, (_req, res) => {
            res.status(200).json({status: "OK", environment: env, timestamp: new Date().toISOString()});
        });
    }

    /**
     * ✅ Setup centralized error handling middleware
     */
    public SetupErrorHandling(app: Application): void {
        app.use(ErrorHandler);
    }
}