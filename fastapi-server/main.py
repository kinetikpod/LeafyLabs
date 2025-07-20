from fastapi import FastAPI
from contextlib import asynccontextmanager
from DB.session import db
import uvicorn
from auth.routers.auth import router as auth_router
from app.ml.router import router as ml_router
from app.stat.router import router as stat_router
from app.ml.dependencies import medical_service
from fastapi.middleware.cors import CORSMiddleware
from core.logger import logger


# ─────────────────────
# 1️⃣ FastAPI Lifespan
# ─────────────────────
@asynccontextmanager
async def lifespan(_: FastAPI):
    # --- STARTUP ---
    await db.connect()  # create asyncpg.Pool
    medical_service.load_model()  # load pickle + SHAP
    logger.info("✅ Database pool & ML model are ready")
    yield  # ------------ application is running -------------
    # --- SHUTDOWN ---
    await db.disconnect()
    logger.info("⏹️  Database pool has been closed")


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

app.include_router(auth_router)
app.include_router(stat_router)
app.include_router(ml_router)


def main():
    uvicorn.run(app="main:app", host="0.0.0.0", port=8000, reload=False)


if __name__ == "__main__":
    main()
