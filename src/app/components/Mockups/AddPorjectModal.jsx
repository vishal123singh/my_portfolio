"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // adjust import path based on your project
import { Button } from "@/components/ui/button";

const STATUSES = ["planning", "active", "on-hold", "completed"];

export default function CreateProjectDialog({
  open,
  onClose,
  onCreate,
}) {
  const [form, setForm] = useState({
    name: "",
    status: "planning",
    progress: "",
    startDate: "",
    endDate: "",
    budget: "",
    tasks: "",
    team: [],
  });

  // Form change handler with input validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "progress") {
      if (value === "") {
        setForm((prev) => ({ ...prev, [name]: "" }));
      } else {
        const numericValue = value.replace(/[^0-9]/g, "");
        const clamped = Math.min(100, Math.max(0, Number(numericValue)));
        setForm((prev) => ({ ...prev, [name]: String(clamped) }));
      }
    } else if (name === "budget" || name === "tasks") {
      if (value === "") {
        setForm((prev) => ({ ...prev, [name]: "" }));
      } else {
        const numericValue = value.replace(/[^0-9]/g, "");
        setForm((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter project name");
      return;
    }
    if (!form.startDate || !form.endDate) {
      alert("Please select start and end dates");
      return;
    }

    const newProject = {
      id: `project-${Date.now()}`,
      ...form,
      // normalize numeric fields
      progress: form.progress === "" ? 0 : Number(form.progress),
      budget: form.budget === "" ? 0 : Number(form.budget),
      tasks: form.tasks === "" ? 0 : Number(form.tasks),
    };

    onCreate(newProject);
    setForm({
      name: "",
      status: "planning",
      progress: "",
      startDate: "",
      endDate: "",
      budget: "",
      tasks: "",
      team: [],
    });
    onClose();
  };

  // Scroll locking handled by shadcn Dialog

  return (
    <Dialog 
      open={open} 
      onOpenChange={(openState) => {
        if (!openState) {
          // When dialog is closed (by overlay, ESC, or DialogClose buttons)
          onClose(); // notify parent
          setForm({
            name: "",
            status: "planning",
            progress: "",
            startDate: "",
            endDate: "",
            budget: "",
            tasks: "",
            team: [],
          });
        }
      }}
    >
      <DialogContent className="sm:max-w-lg w-full bg-[#0B1739] text-white rounded-lg p-6">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-white">
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#122457] border border-white/20 outline-none"
            required
          />

          <div className="flex gap-3">
            <label className="flex flex-col flex-1">
              Start Date
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="mt-1 p-2 rounded bg-[#122457] border border-white/20 outline-none"
                required
              />
            </label>
            <label className="flex flex-col flex-1">
              End Date
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="mt-1 p-2 rounded bg-[#122457] border border-white/20 outline-none"
                required
              />
            </label>
          </div>

          <label className="flex flex-col">
            Status
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-[#122457] border border-white/20 outline-none"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            Progress (%) (0-100)
            <input
              type="text"
              name="progress"
              value={form.progress}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-[#122457] border border-white/20 outline-none"
              placeholder="0-100"
              maxLength={3}
            />
          </label>

          <label className="flex flex-col">
            Budget ($)
            <input
              type="text"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-[#122457] border border-white/20 outline-none"
              placeholder="Enter budget"
            />
          </label>

          <label className="flex flex-col">
            Tasks
            <input
              type="text"
              name="tasks"
              value={form.tasks}
              onChange={handleChange}
              className="mt-1 p-2 rounded bg-[#122457] border border-white/20 outline-none"
              placeholder="Enter number of tasks"
            />
          </label>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <DialogClose asChild onclick={() =>{
               setForm({
                  name: "",
                  status: "planning",
                  progress: "",
                  startDate: "",
                  endDate: "",
                  budget: "",
                  tasks: "",
                  team: [],
                });
                onClose()
              }
            }>
              <Button variant="outline" className='text-black'>Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="default" className={'bg-indigo-600 hover:bg-indigo-700 text-white'}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
