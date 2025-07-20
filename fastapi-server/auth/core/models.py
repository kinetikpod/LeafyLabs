# from dataclasses import dataclass
# from datetime import datetime
# from typing import Optional


# # =========================================================
# # Dataclass ― dipakai di layer service (bukan di DB).
# # =========================================================
# @dataclass
# class User:
#     id: int
#     name: str
#     email: str
#     password: str  # sudah di-hash!
#     is_active: bool = False
#     verified_at: Optional[datetime] = None
#     updated_at: Optional[datetime] = None
#     created_at: datetime = datetime.now()
