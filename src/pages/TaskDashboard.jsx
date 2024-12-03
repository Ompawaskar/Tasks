import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
  PlusCircle,
  Edit2,
  Trash2,
  ListTodo,
  CheckCircle2,
  Clock,
  AlertTriangle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, toggleCompletion, deleteTask } from '@/features/tasks/taskSlice'
import { selectFilteredTasks } from '@/features/tasks/taskSlice'
import { TaskModal } from './TaskModal'
import { DeleteTaskAlert } from '@/components/Tasks/DeleteDialog'
import TaskOverviewChart from '@/components/Tasks/TaskOverviewChart'

export default function TaskDashboard() {

  const tasks = useSelector(selectFilteredTasks);
  const dispatch = useDispatch();

  // Search
  const [searchTerm, setSearchTerm] = useState('');
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Task Completion
  const handleCompleteTask = (id) => {
    dispatch(toggleCompletion(id))
  }

  // Add Task
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Edit Task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // DeleteTask
  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  }

  // Task Cards
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const currentDate = new Date();
  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < currentDate && !task.completed
  ).length;

  // Dashboard cards
  const dashboardCards = [
    {
      title: 'Total Tasks',
      value: totalTasks.toString(),
      icon: <ListTodo className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: 'Completed Tasks',
      value: completedTasks.toString(),
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks.toString(),
      icon: <Clock className="h-4 w-4 text-blue-500" />
    },
    {
      title: 'Overdue Tasks',
      value: overdueTasks.toString(),
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  ];

  const [currentFilter, setCurrentFilter] = useState('all');

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>

        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>

            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <img src="https://avatars.githubusercontent.com/u/138382841?v=4" className='rounded-full overflow-hidden' alt="" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {/* Dashboard Cards */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {dashboardCards.map((card, index) => (
            <Card key={index} className='shadow-md'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="gap-4 flex flex-col md:flex-row">
          {/* Task Management Section */}
          <div className="p-6 w-full space-y-6 md:w-[60%] ">

            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0 ">
              <div className="relative w-full flex justify-center items-center max-w-md mr-2 mb-2 md:mb-0">
                <Search className="absolute left-3 top-2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
              <div className="flex space-x-2 mb-2 md:mb-0 mr-2">
                {['all', 'completed', 'pending', 'overdue'].map(filter => (
                  <Button
                    key={filter}
                    variant={currentFilter === filter ? 'default' : 'outline'}
                    onClick={() => {
                      setCurrentFilter(filter.toLowerCase())
                      dispatch(setFilter(filter.toLowerCase()));

                    }}
                    className={currentFilter === filter ? 'bg-purple-500' : 'hover:bg-purple-200'}
                    size="sm"
                  >
                    {filter.toLocaleUpperCase()}
                  </Button>
                ))}
              </div>
              <Button
                onClick={() => handleAddTask()}
                size="sm"
                className = 'bg-white text-black  border-2 rounded-lg hover:border-purple-300 hover:bg-white'
              >
                <PlusCircle className="mr-2 h-4 w-4 hover:bg-purple-300" /> Add Task
              </Button>

            </div>

            {/* Task Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map(task => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleCompleteTask(task.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={task.completed ? 'secondary' : 'outline'}
                        className={task.completed ? 'bg-green-100' : ''}
                      >
                        {task.title}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>
                      <Badge
                        variant={new Date(task.dueDate) < new Date() ? 'destructive' : 'outline'}
                      >
                        {task.dueDate}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleEditTask(task)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <DeleteTaskAlert
                        onConfirmDelete={() => handleDelete(task.id)}
                        taskTitle={task.title}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Task Chart */}
          <div className="w-full md:w-[40%]" >
            <TaskOverviewChart />
          </div>

        </div>
      </main>
      <TaskModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialTask={editingTask}
      />
    </div>
  )
}