from typing import Union, List, Dict
import os, json
from fastapi import FastAPI, Request, Body, Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from fastapi.staticfiles import StaticFiles
import shutil

from node import Condition, Action, Node, Edge, FlowChart, Patient, Dialog

if os.name == "nt":
    TREEMAP_DATA_PATH = "E:\Projects\DecisionTree\Decision-Tree\data\Flowchars_in_Book"
    LOCAL_SAVE_PATH = "E:\Projects\DecisionTree\Decision-Tree\data\Recognized_Flowcharts"
else:
    PROJECT_BASE_DIR = "/home/libinbin/Server"
    TREEMAP_DATA_PATH = f"./static/TreeMap"
    LOCAL_SAVE_PATH = f"./data/FlowchartsTree/OriginFlowchartsData/v1"
    RESULT_SAVE_PATH = "./data/FlowchartsTree/OriginFlowchartsData/v1"
    FILTERED_FLOWCHART_SAVE_PATH = "./server/static/Flowchars_in_Book2"
    
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory= "./static"), name="static")

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None


@app.get("/")
def read_root():
    return {"Hello": "World"}

f_id = 0
def list_files(folder_path, static_path):
    files = os.listdir(f"{folder_path}")
    current_files = list()
    global f_id
    for file in files:
        file_path = f"{folder_path}/{file}"
        file_static_path = f"{static_path}/{file}"
        if os.path.isdir(file_path):
            # current_files.extend(list_files(file_path))
            current_files.append({
                "id": f_id,
                "label": file,
                "path": file_static_path,
                "children": list_files(file_path, file_static_path)
            })
            f_id+=1
        else:
            # current_files.append(file_path)
            current_files.append({
                "id": f_id,
                "label": file,
                "path": file_static_path
            })
            f_id+=1
    return current_files

@app.get("/tree_map/filelist")
def getFlowchartList(user_name: str):
    global f_id
    f_id=0
    file_list = list_files(TREEMAP_DATA_PATH, TREEMAP_DATA_PATH)
    return {"fileList": file_list, "maxId": f_id}

@app.get("/tree_map/filter")
def tree_map_filter(tree_map_data_save_path:str, enc="utf-8"):
    print(f"tree_map_name: {tree_map_data_save_path}")
    nodes = list()
    edges = list()
    
    if os.path.exists(tree_map_data_save_path):
        with open(tree_map_data_save_path) as f:
            tree_map_data = json.load(f)
        for node in tree_map_data['nodes']:
            nodes.append({
                "id": node['id'],
                "Name": node['Name'],
                "top": node['top'],
                "left": node['left'],
                "size": {
                    "width": node['width'] if "width" in node.keys() else f"300px", 
                    "height":  node['height'] if "height" in node.keys() else f"100px", 
                    "rows":  node['rows'] if "rows" in node.keys() else 3
                }
            })
        edges = tree_map_data['edges']
        return {"nodes": nodes, "edges": edges}
    
    return {"nodes": nodes, "edges": edges}
    
                
class Image(BaseModel):
    url: HttpUrl
    name: str
    
@app.post("/tree_map/save")
def tree_map_save(tree_map_path:str=Body("", title="流程图名字", embed=True), tree_map_nodes:list[Node]=Body([], title="全部节点", embed=True), tree_map_edges:list[Edge]=Body([], title="全部边", embed=True)):
    id2node = {}
    print(f"pwd:{os.getcwd()}")
    print(f"tree_map_name: {tree_map_path}")
    with open(tree_map_path, 'w', encoding="utf-8") as f:
        json.dump({"nodes": [node.__dict__ for node in tree_map_nodes], "edges": [edge.__dict__ for edge in tree_map_edges]}, f, ensure_ascii=False)

    return {"res": "success"}


@app.post("/tree_map/create/file")
def create_new_folder(file_path:str=Body("", title="新文件路径", embed=True), file_type:str=Body("", title="文件类型", embed=True)):
    if file_type=="map":
        file_path = f"{file_path}.json"
        with open(file_path, 'w', encoding="utf-8") as f:
            json.dump({"nodes": [], "edges": []}, f, ensure_ascii=False)
    else:
        if not os.path.exists(file_path): os.makedirs(file_path)
    return {"res": "success"}