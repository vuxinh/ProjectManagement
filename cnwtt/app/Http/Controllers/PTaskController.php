<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Personal;
use App\PTask;

class PTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($personal_id)
    {
        //
        $personal = Personal::find($personal_id);
        if(!$personal){
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy bảng cá nhân'
            ], 400);
        }
        $ptask = $personal->ptask;
        if($ptask->count() != 0){
            return response()->json([
                'success' => true,
                'data' => $ptask
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không có P_Task nào để hiển thị'
            ], 500);
        }
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $this->validate($request, [
            'p_task_name' => 'required',
            'personal_id' => 'required'
        ]);
        // $p_task = new PTask();
        // $p_task->p_task_name = $request['p_task_name'];
        // $p_task->personal_id = $request['personal_id'];
        // $p_task->save();
        $p_task = PTask::create($request->all());
        if($p_task){
            $personal = $p_task->personal;
            $count =  $personal->ptask()->count();
            $tick = 0;
            foreach($personal->ptask as $p_task_tick){
                if($p_task_tick->p_task_tick == 1){
                    $tick++;
                }
            }
            if($count == 0){
                $personal->personal_process = 0;
                $personal->save();
            }
            else if($tick == $count){
                $personal->personal_process = 100;
                $personal->save();
            }
            else{
                $personal->personal_process = (int)($tick/$count*100);
                $personal->save();
            }       
            return response()->json([
                'success' => true,
                'data' => $p_task
            ], 201);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Không thể tạo mới p_task'
            ], 500);
        }

        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $p_task = PTask::find($id);
        if($p_task){
            return response()->json([
                'success' => true,
                'data' => $p_task
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => "Không tìm thấy p_task"
            ], 400);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        // $this->validate($request, [
        //     'p_task_name' => 'required'
        // ]);
        $p_task = PTask::find($id);
        $updated = $p_task->update($request->all());
        if($updated){
            $personal = $p_task->personal;
            $count =  $personal->ptask()->count();
            $tick = 0;
            foreach($personal->ptask as $p_task_tick){
                if($p_task_tick->p_task_tick == 1){
                    $tick++;
                }
            }
            if($count == 0){
                $personal->personal_process = 0;
                $personal->save();
            }
            else if($tick == $count){
                $personal->personal_process = 100;
                $personal->save();
            }
            else{
                $personal->personal_process = (int)($tick/$count*100);
                $personal->save();
            }       
            return response()->json([
            'success' => true,
            'data' => $p_task   
            ], 200);
        }
        return response()->json([
            'success' => false,
            'message' => 'p_task không được cập nhật'
        ], 500);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $p_task = PTask::find($id);

        if(!$p_task) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy p_task'
            ], 400);
        }
        if($p_task->delete()){
            $personal = $p_task->personal;
            $count =  $personal->ptask()->count();
            $tick = 0;
            foreach($personal->ptask as $p_task_tick){
                if($p_task_tick->p_task_tick == 1){
                    $tick++;
                }
            }
            if($count == 0){
                $personal->personal_process = 0;
                $personal->save();
            }
            else if($tick == $count){
                $personal->personal_process = 100;
                $personal->save();
            }
            else{
                $personal->personal_process = (int)($tick/$count*100);
                $personal->save();
            }       
            return response()->json([
                'success' => true,
                'message' => 'Đã xóa thành công'
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Xóa thất bại'
            ], 500);
        }
    }
}
