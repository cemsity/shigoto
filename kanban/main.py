from fastapi import FastAPI

from kanban.api.users.views import router as users_router

app = FastAPI()

app.add_api_route('/users', users_router)


@app.get('/')
async def root():
    return {'message': 'Hello World'}

    
    

