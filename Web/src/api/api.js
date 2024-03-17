import { get, post, del, put } from './https'


const GetFlowchartFilelist = data => get('/tree_map/filelist', data)

const GetFlowchartDatas = data => get('/tree_map/filter', data)
const SaveFlowchartDatas = data => post('tree_map/save', data)
const CreateNewFile = data => post('/tree_map/create/file', data)

export {
    GetFlowchartFilelist,
    GetFlowchartDatas,
    SaveFlowchartDatas,
    CreateNewFile
}