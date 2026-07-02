'use client';

import { type CreateMissionInput, Priority } from '@disciplineos/types';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Textarea,
} from '@disciplineos/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  DEFAULT_MISSION_DURATION,
  PRIORITY_META,
  PRIORITY_OPTIONS,
} from '../constants/mission.constants';
import { useCreateMission } from '../hooks/use-mission-mutations';
import { missionFormSchema, type MissionFormValues } from '../schemas/mission-form.schema';

export function CreateMissionDialog() {
  const [open, setOpen] = useState(false);
  const createMission = useCreateMission();

  const form = useForm<MissionFormValues>({
    resolver: zodResolver(missionFormSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: Priority.Medium,
      durationMinutes: DEFAULT_MISSION_DURATION,
      deadline: '',
    },
  });

  const onSubmit = (values: MissionFormValues) => {
    const payload: CreateMissionInput = {
      title: values.title,
      description: values.description || undefined,
      priority: values.priority,
      durationMinutes: values.durationMinutes,
      deadline: values.deadline ? new Date(values.deadline).toISOString() : undefined,
    };

    createMission.mutate(payload, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> New mission
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a mission</DialogTitle>
          <DialogDescription>
            Turn a commitment into an active mission with a duration and deadline.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Complete 3 LeetCode questions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="What does done look like?"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRIORITY_OPTIONS.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {PRIORITY_META[priority].label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="durationMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (min)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={5}
                        max={1440}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value ?? ''}
                        onChange={(event) =>
                          field.onChange(
                            event.target.value === '' ? undefined : event.target.valueAsNumber,
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline (optional)</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMission.isPending}>
                {createMission.isPending ? (
                  <>
                    <Spinner /> Creating
                  </>
                ) : (
                  'Create mission'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
