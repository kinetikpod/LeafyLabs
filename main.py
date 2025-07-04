from fastapi import FastAPI
from contextlib import asynccontextmanager
from DB.session import db
from core.settings import get_settings

# import uvicorn
# from auth.routers.auth import router as auth_router
# from app.ml.router import router as ml_router
# from app.stat.router import router as stat_router
# from app.ml.dependencies import medical_service
from fastapi.middleware.cors import CORSMiddleware
from core.logger import logger


# ─────────────────────────────────────────────────────────
# 1️⃣ FastAPI Lifespan
# ─────────────────────────────────────────────────────────


@asynccontextmanager
async def lifespan(_: FastAPI):
    # === STARTUP ===
    db_url = get_settings().DATABASE_URL

    if db_url:
        try:
            await db.connect()
            logger.info("✅ Database connection established.")
        except Exception as e:
            logger.error(f"🔥 Failed to connect to the database: {e}")
    else:
        logger.warning("⚠️ No DATABASE_URL found. Skipping database connection.")

    # Uncomment when ML model loading is needed
    # medical_service.load_model()
    # logger.info("🤖 ML model loaded successfully.")

    logger.info("🚀 Application startup completed.")

    yield  # === APPLICATION IS RUNNING ===

    # === SHUTDOWN ===
    if db_url:
        await db.disconnect()
        logger.info("⏹️ Database connection closed gracefully.")


app = FastAPI(
    lifespan=lifespan,
    title="Statistical Analysis & Machine Learning API",
    description=(
        "An API for performing classical statistical tests, "
        "machine learning predictions, and model interpretation using SHAP. "
        "Supports medical applications such as heart attack prediction, as well as general data analysis."
    ),
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

# app.include_router(auth_router)
# app.include_router(stat_router)
# app.include_router(ml_router)

# if __name__ == "__main__":
#     uvicorn.run(app="main:app", host="0.0.0.0", port=8080, reload=False)

#
