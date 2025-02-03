import dbConnect from '../../../utils/dbConnect';
import Task from '../../../models/Task';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    try {
        const tasks = await Task.find({});
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ message: 'Error fetching tasks', error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    const { title, description, dueDate } = await request.json();
    try {
        if (!title || !description || !dueDate) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const newTask = new Task({ title, description, dueDate });
        const savedTask = await newTask.save();
        return NextResponse.json(savedTask, { status: 201 });
    } catch (error) {
        console.error('Error adding task:', error);
        return NextResponse.json({ message: 'Error adding task', error: error.message }, { status: 400 });
    }
}

export async function PUT(request) {
    await dbConnect();
    const { id, title, description, dueDate, completed } = await request.json();
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, dueDate, completed }, { new: true });
        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json({ message: 'Error updating task', error: error.message }, { status: 400 });
    }
}

export async function DELETE(request) {
    await dbConnect();
    const { id } = await request.json();
    try {
        await Task.findByIdAndDelete(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json({ message: 'Error deleting task', error: error.message }, { status: 400 });
    }
}