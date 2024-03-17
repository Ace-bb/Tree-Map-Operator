
from typing import Optional, Union
from pydantic import BaseModel

class Condition(BaseModel):
    id: int
    parent: int
    nodeName: str
    conditions: str
    isActionNode: Optional[bool] = False

class Action(BaseModel):
    id: int
    parent: int
    action: str
    actionType: str
    isActionNode: Optional[bool] = True

class NodeSize(BaseModel):
    width: str
    height: str
    rows:int

class Patient(BaseModel):
    name: str
    age: int
    gender: str
    detail: str
    past_treatment: str
    
    def to_dict(self):
        return {
            "name": self.name,
            "age": self.age,
            "gender": self.gender,
            "detail": self.detail,
            "past_treatment": self.past_treatment
        }

class Dialog(BaseModel):
    id: int
    type: str
    msg: str
    loading: bool
    
    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "msg": self.msg,
            "loading": self.loading
        }
    
class Node(BaseModel):
    id: int
    Name: str
    coordinate:list
    top: int
    left: int
    width: str
    height: str
    rows:int
    # def get_dict(self):
    #     return {
    #         "id": self.id,
    #         "Name": self.Name,
    #         "coordinate": self.coordinate,
    #         "top": self.top,
    #         "left": self.left,
    #         "size": {
    #             "width": self.size.width, 
    #             "height": self.size.height,
    #             "rows": self.size.rows
    #         }
    #     }

class Edge(BaseModel):
    id: str
    sourceNode: str
    targetNode: str
    source: str
    target: str
    label: Optional[str] = ""
    
class FlowChart(BaseModel):
    # nodes: list(Node) = []
    # edges: list(Edge) = []
    x:str