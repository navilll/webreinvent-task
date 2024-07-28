<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('Task', [
            'tasks' => Task::where('completed',0)->get(),
        ]);
    }

    public function show()
    {
        return Inertia::render('Task', [
            'tasks' => Task::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
       $validated =  $request->validate([
            'name' => 'required|max:255|unique:tasks,name',
        ]);

        $task = Task::create([
            'name' => $validated['name'],
        ]);

        return Inertia::render('Task', [
            'tasks' => Task::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return redirect()->back()->with('success', 'task deleted successfully.');
    }

    public function completed(Request $request , $id)
    {
        $task=Task::findOrFail($id);
        $task->completed = '1';
        $task->save();
        return Inertia::render('Task', [
            'tasks' => Task::where('completed',0)->get(),
        ]);
    }
}
