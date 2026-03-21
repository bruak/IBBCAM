import os

import uvicorn

DEFAULT_HOST = "0.0.0.0"
DEFAULT_PORT = 8000


def _read_port() -> int:
    raw_port = os.getenv("PORT", str(DEFAULT_PORT))
    try:
        return int(raw_port)
    except ValueError:
        return DEFAULT_PORT


def main() -> None:
    uvicorn.run(
        "backend.main:app",
        host=os.getenv("HOST", DEFAULT_HOST),
        port=_read_port(),
        proxy_headers=True,
        forwarded_allow_ips="*",
    )


if __name__ == "__main__":
    main()
