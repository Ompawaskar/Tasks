import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircle, Edit2, Calendar, FileText, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { addTask, editTask } from '../features/tasks/taskSlice'; // Adjust import path as needed

export function TaskModal({ 
  isOpen, 
  onOpenChange, 
  initialTask = null 
})
 {
    
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes or task changes
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setDueDate(initialTask.dueDate || '');
    } else {
      resetForm();
    }
  }, [initialTask, isOpen]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (title.trim().length > 100) newErrors.title = 'Title must be less than 100 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const taskData = { 
        title: title.trim(), 
        description: description.trim(), 
        dueDate, 
        completed: initialTask ? initialTask.completed : false 
      };

      if (initialTask) {
        // Update existing task
        console.log("Hey",initialTask);
        
        dispatch(editTask({ 
          id: initialTask.id, 
          updatedTask: taskData 
        }));
      } else {
        // Add new task
        dispatch(addTask({ 
          id: Date.now(), 
          ...taskData 
        }));
      }

      // Close modal
      onOpenChange(false);
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {initialTask ? (
              <>
                <Edit2 className="mr-2 h-6 w-6" />
                Edit Task
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-6 w-6" />
                Add New Task
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {initialTask 
              ? 'Modify the details of your existing task.' 
              : 'Create a new task with a title, description, and due date.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="flex items-center mb-2" >
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              Title
            </Label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-xs text-destructive mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description" className="flex items-center mb-2">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              Description
            </Label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional task description"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="dueDate" className="flex items-center mb-2">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              Due Date
            </Label>
            <Input 
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
            >
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button type="submit">
              {initialTask ? (
                <>
                  <Edit2 className="mr-2 h-4 w-4" /> Update Task
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Task
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}