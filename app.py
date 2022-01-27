from fastapi import FastAPI
import uvicorn
import json, os
from fastapi.responses import JSONResponse 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return "Hello World"


@app.get("/get_iin_bin", tags = ["recommendation"])
async def get_json(option: str, iin_bin: str):
    
    if option == 'IIN': 
        option_ru = 'ИИН' 
    else: 
        option_ru = 'БИН' 
     
    with open(f"JSON/{option_ru} {iin_bin}.json") as f: 
        data = json.load(f) 
    return JSONResponse(status_code=200, content = data) 


if __name__ == "__main__":

    uvicorn.run(app, host = "0.0.0.0", port = 8000)